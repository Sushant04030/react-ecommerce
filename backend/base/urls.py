# from django.urls import path
# from . import views
# from .views import MyTokenObtainPairView
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )


# urlpatterns=[
#     path('', views.getRoutes, name="routes"),
#     path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('user/register/', views.registerUser, name='registerUser'),

#     path('user/profile/', views.getUserProfile, name="UserProfile"),
#     path('users/', views.getUsers, name="Users"),

#     path('products/', views.getProducts, name="products"),
#     path('product/<str:pk>/', views.getProduct, name="product"),
#     path('product01/<str:pk>/', views.getProduct01, name="product01"),

# ]