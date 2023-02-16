from django.db import models
from django.contrib.auth.models import User

# TODO: Add random activity generator facade to generate fake user activity:
#       - User X just bought a flight ticket to Y in the popup on the bottom-right corner
#       - User X just bought 

# Create your models here.
class Airport(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=3)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)



class AirlineCompany(models.Model):
    name    = models.CharField(max_length=50)
    # country = models.ForeignKey(Country, on_delete=models.CASCADE)
    user    = models.ForeignKey(User, on_delete=models.CASCADE)
    code    = models.CharField(max_length=3)


class Flight(models.Model):
    airline_company     = models.ForeignKey(AirlineCompany, on_delete=models.CASCADE)
    origin_airport      = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='origin')
    destination_airport = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='destination')
    departure_time      = models.DateTimeField()
    landing_time        = models.DateTimeField()
    remaining_tickets   = models.IntegerField()


class Customer(models.Model):
    name        = models.CharField(max_length=50)
    surname     = models.CharField(max_length=50)
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    email       = models.EmailField()
    address     = models.CharField(max_length=255)
    phone       = models.CharField(max_length=20)
    credit_card = models.CharField(max_length=20)


class Ticket(models.Model):
    flight      = models.ForeignKey(Flight, on_delete=models.CASCADE)
    customer    = models.ForeignKey(Customer, on_delete=models.CASCADE)
    type        = models.CharField(max_length=20)
    price       = models.FloatField()