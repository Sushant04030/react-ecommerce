from django.urls import path
from base.views1 import orders_views


urlpatterns=[
    
    path('', orders_views.getOrders, name="getOrders"),
    path('add/', orders_views.addOrderItems, name="addOrderItems"),
    path('myorders/', orders_views.getMyOrders, name="ordersByUser"),
    path('<str:pk>/', orders_views.getOrderById, name="getOrderById"),
    path('<str:pk>/pay/', orders_views.updateOrderToPaid, name="updateOrderToPaid"),

]