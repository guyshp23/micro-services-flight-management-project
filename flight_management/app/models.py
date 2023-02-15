from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=3)


class AirlineCompany(models.Model):
    name    = models.CharField(max_length=50)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    user    = models.ForeignKey(User, on_delete=models.CASCADE)
    code    = models.CharField(max_length=3)


class Flight(models.Model):
    airline_company     = models.ForeignKey(AirlineCompany, on_delete=models.CASCADE)
    origin_country      = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='origin')
    destination_country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='destination')
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