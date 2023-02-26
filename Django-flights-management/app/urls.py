from django.contrib import admin
from django.urls    import path, include
from .views         import *
from rest_framework_simplejwt import views as jwt_views

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
            name ='token_refresh'),

      path('flights/',
           GetFlightsByParams.as_view(),
           name='flights_get_by_params'
           ),

      path('flights/<int:flight_id>/',
           GetFlightDetailsByID.as_view(),
           name='flights_get_by_id'
           ),
]
