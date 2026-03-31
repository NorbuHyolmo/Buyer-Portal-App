from django.shortcuts import render
from .models import Property, Favourite
from .serializers import PropertySerializer 
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.

class PropertyDashboardView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        properties = Property.objects.all()
        serializer = PropertySerializer(
            properties, 
            many=True,
            context = {'request': request})
        
        return Response({
            "message": "Property list",
            "data": serializer.data,
            "status": status.HTTP_200_OK
        })
    

class FavouriteView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, property_id):
        property = Property.objects.get(id=property_id)

        if not property:
            return Response({
                "message": "Property not found",
                "status": status.HTTP_404_NOT_FOUND
            })
        
        favourite = Favourite.objects.filter(user=request.user, property=property).first()

        print(favourite)

        if favourite:
            favourite.delete()
            return Response({
                "message": "Property removed from favourites",
                "status": status.HTTP_200_OK
            })
        Favourite.objects.create(user=request.user, property=property)
        return Response({
            "message": "Property added to favourites",
            "status": status.HTTP_201_CREATED,
            "is_favourited": True
        })


class FavouriteListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favourites = Favourite.objects.filter(user=request.user)
        properties = [favourite.property for favourite in favourites]
        serializer = PropertySerializer(properties, many=True, context={'request': request})
        return Response({
            "message": "Favourite Properties",
            "data": serializer.data,
        }, status=status.HTTP_200_OK)
