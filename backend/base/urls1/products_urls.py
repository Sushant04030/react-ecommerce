from django.urls import path
from base.views1 import products_views as views


urlpatterns=[ 

    path('', views.getProducts, name="products"),
    path('top/', views.getTopProducts, name='top-products'),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),

    path('<str:pk>/', views.getProductById, name="getProductById"),

    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),

    # path('product01/<str:pk>/', products_views.getProduct01, name="product01"),

]