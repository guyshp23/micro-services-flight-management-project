from django.urls    import path
from .views         import *
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    # ... other API routes

      #
      # Authentication
      #
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


      #
      # Airports
      #
      path('airports/locations/',
           GetAllAirportLocations.as_view(),
           name='flights_locations'
           ),


      #
      # Flights
      #
      path('flights/',
           GetFlightsByParams.as_view(),
           name='flights_get_by_params'
           ),

      path('flights/<int:flight_id>/',
           GetFlightDetailsByID.as_view(),
           name='flights_get_by_id'
           ),

      #
      # Customers
      #
      path('customers/<int:user_id>/flights/',
             GetCustomerFlights.as_view(),
            name='customers_flights'
            ),

      #
      # Users
      #

      path('users/<int:user_id>/',
            UserActions.as_view(),
            name='user_actions'
           ),


      #
      # Tickets
      #
      path('tickets/<int:ticket_id>/',
            GetSpecificTicketByID.as_view(),
            name='tickets_book'
            ),
      path('tickets/book/<int:flight_id>/',
            BookTicket.as_view(),
            name='tickets_book'
            ),
      
      path('tickets/cancel/<int:ticket_id>/',
            CancelTicket.as_view(),
            name='tickets_cancel'
            ),
      
      path('tickets/delete/<int:ticket_id>/',
            DeleteTicket.as_view(),
            name='tickets_delete'
            ),
]
