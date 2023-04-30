from app.exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import Customer
import logging


logging.basicConfig(level=logging.INFO, filename='main.log', format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%Y/%m/%d %I:%M:%S %p')
logger = logging.getLogger(__name__)

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
        customer = Customer.objects.filter(id=customer_id).first()

        if customer is None:
            logging.info('Customer not found!')
            raise ModelNotFoundException(f'Customer with ID {customer_id} doesn\'t exist.')

        logging.info('Customer returned!', customer)
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
        customer = Customer.objects.filter(id=customer_id).first()

        if customer is None:
            raise ModelNotFoundException(f'Customer with ID {customer_id} doesn\'t exist.')
        
        logging.info('Customer Deleted', customer)
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
        customer = Customer.objects.filter(id=customer_id).first()

        if customer is None:
            raise ModelNotFoundException(f'Customer not found with ID: {customer_id}')


    def check_if_user_is_a_customer(user_id: int) -> Customer:
        """
        Checks if the user with the given ID is a customer.

        Args:
            user_id (int): The ID of the user to check.
        
        Raises:
            ModelNotFoundException: If the user with the given ID isn't a customer.
        """

        # Check if the user is a customer
        customer = Customer.objects.filter(user_id=user_id).first()

        if customer is None:
            raise ModelNotFoundException(f'User with ID {user_id} isn\'t a customer.')
        
        return customer
