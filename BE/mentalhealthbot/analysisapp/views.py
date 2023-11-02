from datetime import datetime, timedelta
import pandas as pd
from django.http import JsonResponse
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from django.views import View
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import *
from rest_framework.permissions import AllowAny
from rest_framework.decorators import (
    APIView,
    permission_classes,
    authentication_classes,
    api_view,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.decorators import method_decorator
from datetime import date
from django.db.models import Sum
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.mail import send_mail
from django.conf import settings
from sqlalchemy import create_engine


@method_decorator(csrf_exempt, name="dispatch")
class login(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            data = {
                "message": "Login Successful!!!",
                "username": user.username,
                "first_name": user.name,
                "BU_Type": user.type,
                "subscription_status": user.IsSubscribed,
                "access_token": access_token,
                "id": user.id,
                "refresh": str(refresh),
                "login_status": 1,
            }
            subject = "Login Notification"
            message = f"Hello {user.name}, You have been signed in successfully."
            from_email = settings.EMAIL_HOST_USER
            to_email = [user.email]
            mail_send(subject, message, from_email, to_email)
        else:
            data = {"message": "invalid credentials", "login_status": 0}
        return Response(data, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name="dispatch")
class logout(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"message": "Logout Successful!"}, status=status.HTTP_200_OK
            )
        except Exception:
            return Response(
                {"message": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST
            )


@method_decorator(csrf_exempt, name="dispatch")
class signup(APIView):
    def post(self, request):
        name = request.data.get("name")
        email = request.data.get("email")
        contactno = request.data.get("contactno")
        address = request.data.get("address")
        type = request.data.get("type")
        username = request.data.get("username")
        password = request.data.get("password")
        if Mst_UsrTbl.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists."}, status=status.HTTP_409_CONFLICT
            )
        if Mst_UsrTbl.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists."}, status=status.HTTP_409_CONFLICT
            )

        user = Mst_UsrTbl.objects.create_user(
            username=username,
            password=password,
            name=name,
            ContactNo=contactno,
            email=email,
            type=type,
            address=address,
        )
        subject = "Sign Up Notification"
        message = f"Hello {user.name}, You have been signed up successfully."
        from_email = settings.EMAIL_HOST_USER
        to_email = [user.email]
        mail_send(subject, message, from_email, to_email)
        return Response({"message": "New User Created"}, status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class Booking(APIView):
    def get(self, request):
        context = {}
        if request.user.type == "Customer":
            # booking_obj = pd.DataFrame(
            #     BookingTbl.objects.filter(UserId=request.user.id).values(
            #         "BookingId",
            #         "ThreapistId",
            #         "BookingDate",
            #         "BookingTime",
            #         "approved_by_Threapist",
            #     )
            # )
            # threapist = booking_obj["ThreapistId"].to_list()
            threapist_obj = pd.DataFrame(
                Mst_UsrTbl.objects.filter(type="Therapist").values(
                    "id", "name", "email", "ContactNo", "address"
                )
            )
            # merged_df = pd.merge(
            #     booking_obj,
            #     threapist_obj,
            #     left_on="ThreapistId",
            #     right_on="id",
            #     how="inner",
            # )
            context["Customer"] = threapist_obj.to_dict(orient="records")
        elif request.user.type == "Therapist":
            booking_obj = pd.DataFrame(
                BookingTbl.objects.filter(
                    ThreapistId=request.user.id, approved_by_Threapist=False
                ).values(
                    "BookingId",
                    "UserId",
                    "BookingDate",
                    "BookingTime",
                    "approved_by_Threapist",
                )
            )
            User = booking_obj["UserId"].to_list()
            User_obj = pd.DataFrame(
                Mst_UsrTbl.objects.filter(id__in=User).values(
                    "id", "name", "email", "ContactNo", "address"
                )
            )
            print("booking>>>>>>>>>>>>>>>>>>>>>>>\n", User_obj)
            merged_df = pd.merge(
                booking_obj, User_obj, left_on="UserId", right_on="id", how="inner"
            )
            context["Therapist"] = merged_df.to_dict(orient="records")
        else:
            context["Error"] = "User type doesnot exist"
        return JsonResponse(context, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        context = {}
        if request.user.type == "Customer":
            ThreapistId = data.get("Threapistid")
            BookingDate = data.get("BookingDate")
            BookingTime = data.get("BookingTime")
            UserId = request.user.id
            user_instance = Mst_UsrTbl.objects.get(id=UserId)
            therapist_instance = Mst_UsrTbl.objects.get(id=ThreapistId)

            Booking_created = BookingTbl.objects.create(
                ThreapistId=therapist_instance, UserId=user_instance
            )
            Booking_created.BookingTime = BookingTime
            Booking_created.BookingDate = BookingDate

            Booking_created.save()

            context["message"] = "Booking created pending confirmation from Threapist"

        elif request.user.type == "Therapist":
            BookingId = data.get("BookingId")
            approve = data.get("approve")

            Booking_created = BookingTbl.objects.get(BookingId=BookingId)
            Booking_created.approved_by_Threapist = approve
            Booking_created.save()

            context["message"] = "Status changed"
        else:
            context["Error"] = "User type doesnot exist"
        return JsonResponse(context, status=status.HTTP_200_OK)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class subscriptiontable(APIView):
    def post(self, request):
        UserId = request.user.id
        SubscriptionType = request.data.get("SubscriptionType")
        StartDate = datetime.now().date()
        EndDate = StartDate + timedelta(days=30)
        user_instance = Mst_UsrTbl.objects.get(id=UserId)
        subscription = SubscriptionTable.objects.create(
            UserId=user_instance,
        )
        subscription.StartDate = StartDate
        subscription.EndDate = EndDate
        subscription.SubscriptionType = SubscriptionType
        subscription.save()

        return Response({"message": "Subscription Added"}, status=status.HTTP_200_OK)

    def get(self, request):
        context = {}
        UserId = request.user.id
        User_obj = pd.DataFrame(
            SubscriptionTable.objects.filter(UserId=UserId).values(
                "SubscriptionId", "SubscriptionType", "StartDate", "EndDate"
            )
        )
        context["Subscription"] = User_obj.to_dict(orient="records")
        return JsonResponse(context, status=status.HTTP_200_OK)


def mail_send(subject, message, from_email, to_email):
    print(to_email)
    send_mail(subject, message, from_email, to_email)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class ConfirmBooking(APIView):
    def get(self, request):
        context = {}
        if request.user.type == "Customer":
            booking_obj = pd.DataFrame(
                BookingTbl.objects.filter(UserId=request.user.id).values(
                    "BookingId",
                    "ThreapistId",
                    "BookingDate",
                    "BookingTime",
                    "approved_by_Threapist",
                )
            )
            threapist = booking_obj["ThreapistId"].to_list()
            threapist_obj = pd.DataFrame(
                Mst_UsrTbl.objects.filter(id__in=threapist).values(
                    "id", "name", "email", "ContactNo", "address"
                )
            )
            merged_df = pd.merge(
                booking_obj,
                threapist_obj,
                left_on="ThreapistId",
                right_on="id",
                how="inner",
            )
            context["Customer"] = merged_df.to_dict(orient="records")
        elif request.user.type == "Therapist":
            booking_obj = pd.DataFrame(
                BookingTbl.objects.filter(
                    ThreapistId=request.user.id, approved_by_Threapist=True
                ).values(
                    "BookingId",
                    "UserId",
                    "BookingDate",
                    "BookingTime",
                    "approved_by_Threapist",
                )
            )
            User = booking_obj["UserId"].to_list()
            User_obj = pd.DataFrame(
                Mst_UsrTbl.objects.filter(id__in=User).values(
                    "id", "name", "email", "ContactNo", "address"
                )
            )
            print("booking>>>>>>>>>>>>>>>>>>>>>>>\n", User_obj)
            merged_df = pd.merge(
                booking_obj, User_obj, left_on="UserId", right_on="id", how="inner"
            )
            context["Therapist"] = merged_df.to_dict(orient="records")
        else:
            context["Error"] = "User type doesnot exist"
            return JsonResponse(context, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(context, status=status.HTTP_200_OK)


def day_end_sp():
    import time
    print("!!!!!!!!!!!!!!!!SP execution Started!!!!!!!!!!!!!!!!")
    start_time = time.time()
    print("Start time: ", start_time)
    DATABASE = "MentalHealthAnalysis"
    USERNAME = "postgres"
    PASSWORD = "root@123"
    HOST = "localhost"
    PORT = "5432"

    engine = create_engine(
        f"postgresql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"
    )

    sql_query = f"""CALL public.checkandupdatesubscription()"""
    try:
        wh_sumamry = pd.read_sql_query(sql_query, engine)
        print("executed successfully")
        print(wh_sumamry)
        subject = "checkandupdatesubscription - Done"
        message = "Day end SP Execution Success"
        from_email = settings.EMAIL_HOST_USER
        to_email = ["anshmahajan05102002@gmail.com", "nehamit009@gmail.com"]
        mail_send(subject, message, from_email, to_email)
    except Exception as e:
        print("Error executing wh_sumamry query:", e)
        sp_exec = SP_execution()
        sp_exec.sp_name = "checkandupdatesubscription"
        sp_exec.sp_desc = e
        sp_exec.executed_by = "system"
        sp_exec.save()
        subject = "checkandupdatesubscription - Failed"
        message = e
        from_email = settings.EMAIL_HOST_USER
        to_email = ["anshmahajan05102002@gmail.com", "nehamit009@gmail.com"]
        mail_send(subject, message, from_email, to_email)
    print("End time: ", time.time())
    print("Execution Time: ", time.time()-start_time)
    return True
