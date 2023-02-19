from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import LogoutView, RegisterView

urlpatterns = [
    # ... other API routes


    # Authentication-related routes
    path('auth/logout/', LogoutView.as_view(),
          name ='logout'),

    path('auth/register/',
          RegisterView.as_view(),
          name ='register'),

    path('auth/login/',
          jwt_views.TokenObtainPairView.as_view(),
          name ='login'),

    path('auth/refresh/',
          jwt_views.TokenRefreshView.as_view(),
          name ='token_refresh')
]
