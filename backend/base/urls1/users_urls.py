from django.urls import path
from base.views1 import users_views
from base.views1.users_views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns=[
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', users_views.registerUser, name='registerUser'),
    path('profile/', users_views.getUserProfile, name="userProfile"),
    path('profile/update/', users_views.updateUserProfile, name="updateUserProfile"),

    path('', users_views.getUsers, name="Users"),
    path('update/<str:pk>/', users_views.updateUser, name='user-update'),
    path('delete/<str:pk>/', users_views.deleteUser, name='user-delete'),
    path('<str:pk>/', users_views.getUserById, name='user'),

]