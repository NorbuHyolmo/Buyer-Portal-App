from urllib import request

from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth import authenticate
from .models import CustomUser
# Create your views here.


class RegisterView(APIView):
    serializer_class = RegisterSerializer
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user: 
                refresh = RefreshToken.for_user(user)
                return Response({
                    "message": "User created successfully",
                    "accessToken": str(refresh.access_token),
                }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    serializer_class = LoginSerializer
    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            user = authenticate(username=email, password=password)
            username = user.email.split('@',1)
            if user: 
                refresh = RefreshToken.for_user(user)
                return Response({
                    "accessToken": str(refresh.access_token),
                    "refreshToken": str(refresh),
                    "username": username[0],
                    "role": user.role
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "Invalid credentials",
                    "status": status.HTTP_401_UNAUTHORIZED
                })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

