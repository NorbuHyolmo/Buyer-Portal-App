from django.urls import path 
from .views import PropertyDashboardView, FavouriteView, FavouriteListView

urlpatterns = [
    path('dashboard/', PropertyDashboardView.as_view(), name='property-dashboard'),
    path('<int:property_id>/favourite/', FavouriteView.as_view()),
    path('favourites/', FavouriteListView.as_view(), name="favourite-list")
]