# from pyexpat import model
# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import Product

# from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
# from rest_framework.authtoken.models import Token

# # class UserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = User
# #         fields = ('id','username')

# class UserSerializer(serializers.ModelSerializer):
#     name = serializers.SerializerMethodField(read_only=True)
#     _id = serializers.SerializerMethodField(read_only=True)
#     isAdmin = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', '_id', 'username','name', 'email', 'isAdmin']

#     def get__id(self, obj):
#         return obj.id

#     def get_name(self, obj):
#         name = obj.first_name
#         if name == "":
#             name = obj.email
#         return name

#     def get_isAdmin(self, obj):
#         return obj.is_staff

# class UserSerializerWithToken(UserSerializer):
#     token = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = User
#         fields = ('__all__')
#         # fields = ['id', '_id', 'username','name', 'email', 'isAdmin', 'token']
    
#     def get_token(self, obj):
#         token = AccessToken.for_user(obj)
#         return str(token)

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ('__all__')
