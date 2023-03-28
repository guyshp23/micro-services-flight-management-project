from multiprocessing import cpu_count

bind = "127.0.0.1:8800"

# Worker Options
workers = cpu_count() + 1
worker_class = 'uvicorn.workers.UvicornWorker'

# Logging Options
loglevel = 'debug'
accesslog = '/var/www/micro-services-flight-management-project/FastAPI-flights-API-Microservice/access_log'
errorlog =  '/var/www/micro-services-flight-management-project/FastAPI-flights-API-Microservice/error_log'
