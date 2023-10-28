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
from rest_framework.decorators import APIView, permission_classes, authentication_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.decorators import method_decorator
from datetime import date
from django.db.models import Sum
from rest_framework_simplejwt.authentication import JWTAuthentication

@method_decorator(csrf_exempt, name='dispatch')
class login(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            if user.is_superuser: 
                data = {
                    'message': "Login Successful!!!",
                    'username': user.username,
                    'first_name': user.name,
                    'Type': user.type,
                    'access_token': access_token,
                    'id': user.id,
                    'refresh': str(refresh)
                }
            else:
                data = {
                    'message': "Login Successful!!!",
                    'login_status': 1,
                    'username': user.username,
                    'first_name': user.name,
                    'BU_Type': user.type,
                    'access_token': access_token,  
                    'id': user.id,
                    'refresh': str(refresh)
                }
        else:
            data = {
                'message': 'invalid credentials',
            }
        return Response(data)