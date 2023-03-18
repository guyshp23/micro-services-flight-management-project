from app.exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import Customer

class CustomersService(BaseServiceInterface):



    def get_customer_by_id(self, customer_id: int) -> Customer:
        """
        Gets the customer with the given ID.

        Args:
            customer_id (int): The ID of the customer to get.

        Raises:
            ModelNotFoundException: If the customer with the given ID doesn't exist.

        Returns:
            customer: The customer with the given ID.
        """

        # Get the customer.
        customer = customer.objects.filter(id=customer_id).first()

        if customer is None:
            raise ModelNotFoundException(f'Customer with ID {customer_id} doesn\'t exist.')

        return customer


    def delete_customer(self, customer_id: int) -> bool:
        """
        Deletes the customer with the given ID.

        Args:
            customer_id (int): The ID of the customer to delete.
        
        Raises:
            ModelNotFoundException: If the customer with the given ID doesn't exist.

        Returns:
            bool: True if the customer was successfully deleted, Raises a ValueError otherwise.
        """

        # Check if the customer exists
        customer = customer.objects.filter(id=customer_id).first()

        if customer is None:
            raise ModelNotFoundException(f'Customer with ID {customer_id} doesn\'t exist.')

        # Delete the customer.
        customer.delete()

        return True


    def does_customer_exist(customer_id: int) -> None:
        """
        Checks if the customer with the given ID exists.
        (use in internal functions to check if the given customer_id arg is valid)

        Args:
            customer_id (int): The ID of the customer to check.
        
        Raises:
            ModelNotFoundException: If the customer with the given ID doesn't exist.
        """

        # Check if the customer exists
        customer = customer.objects.filter(id=customer_id).first()

        if customer is None:
            raise ModelNotFoundException(f'Customer not found with ID: {customer_id}')
