from django.test import TestCase
from unittest.mock import patch
from app.models import Flight, Airport, Ticket
from app.services.flights_service import FlightService
from app.exceptions.model_not_found import ModelNotFoundException
import json

class FlightServiceTestCase(TestCase):

    def setUp(self):
        self.service = FlightService()

    def test_get_by_params(self):
        # Create an airport
        airport = Airport.objects.create(display_name='Test Airport', latitude=0, longitude=0)

        # Create a flight with the airport
        flight = Flight.objects.create(origin_airport=airport, destination_airport=airport)

        # Test if the service method returns the created flight
        response = self.service.get_by_params(airport.display_name, airport.display_name, '2023-05-01')
        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]['id'], flight.id)

    def test_get_by_id(self):
        # Create a flight
        flight = Flight.objects.create()

        # Test if the service method returns the created flight
        response = self.service.get_by_id(flight.id)
        self.assertEqual(response.id, flight.id)

    def test_get_all_airports_display_name_by_query(self):
        # Create an airport
        airport = Airport.objects.create(display_name='Test Airport')

        # Test if the service method returns the created airport
        response = self.service.get_all_airports_display_name_by_query(airport.display_name)
        self.assertEqual(len(response), 1)
        self.assertEqual(response[0].id, airport.id)

    def test_get_all_customer_flights(self):
        # Create a customer
        customer_id = 1

        # Create a flight
        flight = Flight.objects.create()

        # Create a ticket for the customer and flight
        ticket = Ticket.objects.create(customer_id=customer_id, flight=flight)

        # Test if the service method returns the created flight
        response = self.service.get_all_customer_flights(customer_id)
        self.assertEqual(len(response), 1)
        self.assertEqual(response[0].id, flight.id)