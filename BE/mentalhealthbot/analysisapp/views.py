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
import google.generativeai as genai
from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parent
import dotenv
import joblib

dotenv.load_dotenv(os.path.join(BASE_DIR, ".env"))

API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=API_KEY)

from django.conf import settings
db_setting = settings.DATABASES['default']


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
    from django.conf import settings
    db_setting = settings.DATABASES['default']

    print("!!!!!!!!!!!!!!!!SP execution Started!!!!!!!!!!!!!!!!")
    start_time = time.time()
    print("Start time: ", start_time)
    DATABASE = db_setting['NAME']
    USERNAME = db_setting['USER']
    PASSWORD = db_setting['PASSWORD']
    HOST = db_setting['HOST']
    PORT = db_setting['PORT']

    engine = create_engine(
        f"postgresql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}",
        isolation_level="AUTOCOMMIT",
    )

    sql_query = f"""CALL public.checkandupdatesubscription();"""
    try:
        wh_sumamry = pd.read_sql_query(sql_query, engine)
        print("executed successfully")
        print(wh_sumamry)
    except Exception as e:
        print("Error executing query:", e)
        sp_exec = SP_execution()
        sp_exec.sp_name = "checkandupdatesubscription"
        sp_exec.sp_desc = e
        sp_exec.executed_by = "system"
        sp_exec.save()
        # subject = "checkandupdatesubscription - Failed"
        # message = e
        # from_email = settings.EMAIL_HOST_USER
        # to_email = ["anshmahajan05102002@gmail.com", "nehamit009@gmail.com"]
        # mail_send(subject, message, from_email, to_email)
    print("End time: ", time.time())
    print("Execution Time: ", time.time() - start_time)
    current_date = datetime.now().date()
    past = PastSubscriptionTable.objects.filter(EndDate=current_date).values_list(
        "UserId"
    )
    users = Mst_UsrTbl.objects.filter(id__in=past).values_list("email")
    email_list = [user[0] for user in users]
    print(email_list)
    subject = "Subscription Ended"
    message = "Dear User, Hope this message found you well. Your subscription has been ended. To continue the service of well-being and aware of mental health, renew your subscription to continue the service. We will be happy to serve you again. \nMental Mate\nEmbrace your inner strength with Mental Mate, your trusted companion on the journey to better mental health!"
    from_email = settings.EMAIL_HOST_USER
    mail_send(subject, message, from_email, email_list)
    return True

def get_gemini_response(question, chat):
    response = chat.send_message(question)
    return response

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class Chatbot(APIView):
    def post(self, request):
        context = {}
        model = genai.GenerativeModel("gemini-pro")
        chat = model.start_chat(history=[])
        message = request.data.get('message')
        chatid = request.data.get('ChatId')

        chat_obj = ChatHistory.objects.get(id=chatid)

        messageRecieved = ChatMessages()
        messageRecieved.ChatId = chat_obj
        messageRecieved.MessageContent = message
        messageRecieved.SentDateTime = datetime.now()
        messageRecieved.Sender = "User"
        messageRecieved.Status = "success"
        messageRecieved.save()

        try:
            message += '\n\n Answer this like you are a mental health chatbot.'
            result = get_gemini_response(message, chat)
            reply = result.text
            reply = reply.replace("\n", "<br>")
            reply = reply.replace("**", "")
        except:
            reply = "Sorry, I couldn't understand your message correctly. <br> Could you tell me more about whats happenning?"

        messageSend = ChatMessages()
        messageSend.ChatId = chat_obj
        messageSend.MessageContent = reply
        messageSend.SentDateTime = datetime.now()
        messageSend.Sender = "Bot"
        messageSend.Status = "success"
        messageSend.save()

        reply_dict = {
            'id': messageSend.id,
            'ChatId': chat_obj.id,
            'MessageContent': reply,
            'SentDateTime': datetime.now(),
            'Sender': 'Bot',
            'Status': 'success'
        }
        context['reply'] = reply_dict

        return JsonResponse(context, status=status.HTTP_200_OK)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class NewChat(APIView):
    def post(self, request):
        context = {}
        data = request.data
        user = request.user
        isTestGiven = True if request.data.get('isTestGiven')=='true' else False

        newchat = ChatHistory()
        newchat.UserId = user
        newchat.isTestGiven = isTestGiven
        newchat.TestId = request.data.get('TestId')
        newchat.DateAndTime = datetime.now()
        newchat.save()

        reply_dict = {
            'id': newchat.id,
            'UserId_id': user.id,
            'isTestGiven': isTestGiven,
            'TestId': request.data.get('TestId'),
            'DateAndTime': datetime.now()
        }

        context['chatid'] = reply_dict
        context['message'] = "New chat started"
        return JsonResponse(context, status=status.HTTP_200_OK)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class chathistory(APIView):
    def get(self, request):
        context = {}
        UserId = request.user.id

        chats_df = pd.DataFrame(
            ChatHistory.objects.filter(
                UserId_id=UserId
            ).values()
        )

        chats = chats_df.to_dict(orient='records')
        context['chats'] = chats
        return JsonResponse(context, status=status.HTTP_200_OK)
    
    def post(self, request):
        UserId = request.user.id
        context = {}

        chatid = request.data.get('ChatId')
        messages_df = pd.DataFrame(
            ChatMessages.objects.filter(
                ChatId_id=chatid
            ).values()
        )

        messages = messages_df.to_dict(orient='records')
        context['messages'] = messages

        return JsonResponse(context, status=status.HTTP_200_OK)
    
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class TestApi(APIView):
    def post(self, request):
        context = {}

        data = request.data

        data['age'] = int(data.get('age'))
        test = TestDetails()
        test.test_date = datetime.now().date()
        test.UserId = request.user
        test.num_employees = data.get('num_employees')
        test.tech_company_or_role = data.get('tech_company_or_role')
        test.cep_benefits = data.get('cep_benefits')
        test.cep_know_options = data.get('cep_know_options')
        test.cep_discuss = data.get('cep_discuss')
        test.cep_learn = data.get('cep_learn')
        test.cep_anon = data.get('cep_anon')
        test.cep_mh_leave = data.get('cep_mh_leave')
        test.cep_mh_ncsq = data.get('cep_mh_ncsq')
        test.cep_ph_ncsq = data.get('cep_ph_ncsq')
        test.cep_comf_cw = data.get('cep_comf_cw')
        test.cep_comf_sup = data.get('cep_comf_sup')
        test.cep_serious = data.get('cep_serious')
        test.cep_others_ncsq = data.get('cep_others_ncsq')
        test.pep_have = data.get('pep_have')
        test.pep_benefits = data.get('pep_benefits')
        test.pep_know_options = data.get('pep_know_options')
        test.pep_discuss = data.get('pep_discuss')
        test.pep_learn = data.get('pep_learn')
        test.pep_anon = data.get('pep_anon')
        test.pep_mh_ncsq = data.get('pep_mh_ncsq')
        test.pep_ph_ncsq = data.get('pep_ph_ncsq')
        test.pep_comf_cw = data.get('pep_comf_cw')
        test.pep_comf_sup = data.get('pep_comf_sup')
        test.pep_serious = data.get('pep_serious')
        test.pep_others_ncsq = data.get('pep_others_ncsq')
        test.fep_ph_willing = data.get('fep_ph_willing')
        test.fep_mh_willing = data.get('fep_mh_willing')
        test.hurt_career = data.get('hurt_career')
        test.cw_view_neg = data.get('cw_view_neg')
        test.comf_ff = data.get('comf_ff')
        test.neg_response = data.get('neg_response')
        test.mh_fam_hist = data.get('mh_fam_hist')
        test.mh_hist = data.get('mh_hist')
        test.mh_cur = data.get('mh_cur')
        test.mh_cur_name_yes = data.get('mh_cur_name_yes')
        test.mh_cur_name_maybe = data.get('mh_cur_name_maybe')
        test.mh_diag_pro = data.get('mh_diag_pro')
        test.mh_diag_pro_name = data.get('mh_diag_pro_name')
        test.sought_treat = data.get('sought_treat')
        test.work_affect_effect = data.get('work_affect_effect') 
        test.work_affect_ineffect =  data.get('work_affect_ineffect')
        test.age =  data.get('age')
        test.gender =  data.get('gender')
        test.work_country = data.get('work_country')
        test.work_remote =  data.get('work_remote')

        df = pd.DataFrame([data])

        openness_path = os.path.join(BASE_DIR, "models", "openness_rf.pkl")
        diag_pro_path = os.path.join(BASE_DIR, "models", "diag_pro_rf.pkl")
        treatment_path = os.path.join(BASE_DIR, "models", "treatment_rf.pkl")

        clf = joblib.load(openness_path) 
        clf2 = joblib.load(diag_pro_path)
        clf3 = joblib.load(treatment_path)

        diagnos_pro = df['mh_diag_pro'].iloc[0]
        df.drop(columns=['fep_ph_willing', 'fep_mh_willing', 'mh_cur_name_yes', 'mh_cur_name_maybe', 'mh_diag_pro', 'mh_diag_pro_name', 'sought_treat'], inplace=True)

        data = df.values.tolist()

        openness_pred = clf.predict(data)

        df1 = df.copy()
        df1.drop(columns=['pep_learn', 'tech_company_or_role', 'cep_others_ncsq', 'pep_have'], inplace=True)
        data1 = df1.values.tolist()
        diag_pred = clf2.predict(data1)

        treatment_pred = clf3.predict(data)

        test.pred_openness = openness_pred[0]
        test.pred_diag_pro = diag_pred[0]
        test.pred_treatment = treatment_pred[0]
        test.save()

        context['submission_status'] = "Submitted"
        context['pred_openness'] = int(openness_pred[0])
        context['pred_diag_pro'] = int(diag_pred[0])
        context['pred_treatment'] = int(treatment_pred[0])
        context['test_date'] = datetime.now().date()

        return JsonResponse(context, status=status.HTTP_200_OK)

    def get(self, request):
        test = pd.DataFrame(
            TestDetails.objects.filter(
                UserId=request.user
            ).values()
        )
        
        if len(test)>0:
            test.drop(columns=['UserId_id'], inplace=True)

        context = {}
        context['results'] = test.to_dict(orient='records')

        return JsonResponse(context, status=status.HTTP_200_OK)