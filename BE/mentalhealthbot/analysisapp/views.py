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
            }
        else:
            data = {
                "message": "invalid credentials",
            }
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
        return Response({"message": "New User Created"}, status=status.HTTP_200_OK)
