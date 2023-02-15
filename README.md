# Flight Management Project v1.0


## General architecture flow:
1. The view gets the API request
2. The view calls the service
3. The service calls the facade (handle errors in services in both Django & microservices)
4. The facade calls the Repository (DAL)
5. The Repository (DAL) calls the DB / The Flight micro-service that calls the DB

*  Simplified Example (API Access Facade): https://www.youtube.com/watch?v=1eAwAHwswRM
*  Simplified Example (In JavaScript)    : https://www.youtube.com/watch?v=uuFYf0kRQBc
*  In-depth   Example (In Python)        : https://www.youtube.com/watch?v=jjoLejA4iAE

*  Render forms only in django, communicate with microservices via API when required (in repository)
*  Implement Authentication & all perm checks in Django
*  Microservices need to check first w/ django the authentication token if perm is allowed
    - So create an endpoint of GET in Django to check the token from the micro-service 
      (Implement a secret key to the microservice so not anyone can access it, because they will be able to "brute force" their way to find the correct tokens to access the endpoint)
*  Only flight microservice - other implementations as facades in seperated apps
* The view/service is responsible for logging and returning responses from the Facade.
* The service will only call a specifc method in the Facade. All of the business logic is hidden inside the Facade 
  (calling different repo classes, methods, etc.)


## Create a repository (as DAL) for each model:
* Flight
    - get_flights_by_parameters(_origin_counry_id int, _detination_country_id int, _date date)
    - get_flights_by_airline_id(_airline_id bigint)
    - get_arrival_flights(_country_id int)
    - get_departure_flights(_country_id int)

    (detailed under DAL, pg. 6)
    - get_flights_by_origin_country_id(country_id)      [getFlightsByOriginCountryId]
    - get_flights_by_destination_country_id(country_id) [getFlightsByDestinationCountryId]
    - get_flights_by_departure_date(date)               [getFlightsByDepartureDate]
    - get_flights_by_landing_date(date)                 [getFlightsByLandingDate]
    - get_flights_by_customer(customer)                 [getFlightsByCustomer]
* AirlineCompany
    - get_airline_by_username(_username text)
    - get_airlines_by_country(country_id)               [getAirlinesByCountry]
* Customer
    - get_tickets_by_customer(_customer_id bigint)
* Administrator
* User
    - get_user_by_username(_username text)
* Country
* Ticket
    - get_my_ticket()


### Required in each repo - Create an abstract interface class with the following methods 
(BaseRepositoryInterface - will include only abc methods that are required in each repository):
- Get_by_id
- Get_all
- Add
- Update
- Add_all
- Remove


# Facades to create:
* AnonymousFacade
* CustomerFacade
* AirlineFacade
* AdministratorFacade
