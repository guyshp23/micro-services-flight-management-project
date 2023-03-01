from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator

# TODO: Add random activity generator facade to generate fake user activity:
#       - User X just bought a flight ticket to Y in the popup on the bottom-right corner
#       - User X just bought 


class Airport(models.Model):
    country_name = models.CharField(max_length=50)
    city_name    = models.CharField(max_length=50)
    city_code    = models.CharField(max_length=50)
    airport_name = models.CharField(max_length=50)
    airport_code = models.CharField(max_length=3,
                                    validators=[
                                        RegexValidator(
                                            '^[A-Z]*$',
                                            'Only uppercase letters allowed.'
                                        )
                                    ],
                                    unique=True)
    display_name = models.CharField(max_length=100)


class Flight(models.Model):
    origin_airport                    = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='origin')
    destination_airport               = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='destination')
    departure_time                    = models.DateTimeField()
    landing_time                      = models.DateTimeField()
    remaining_tickets                 = models.IntegerField()
    ticket_economy_price              = models.FloatField()
    ticket_economy_manual_override    = models.BooleanField(default=0)
    remaining_tickets_manual_override = models.BooleanField(default=0)


class Customer(models.Model):
    name        = models.CharField(max_length=50)
    surname     = models.CharField(max_length=50)
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    email       = models.EmailField()
    address     = models.CharField(max_length=255)
    phone       = models.CharField(max_length=20)
    credit_card = models.CharField(max_length=20)


class Ticket(models.Model):
    flight      = models.ForeignKey(Flight,   on_delete=models.CASCADE)
    customer    = models.ForeignKey(Customer, on_delete=models.CASCADE)
