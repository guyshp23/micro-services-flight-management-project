from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.models import Permission


def get_user_permissions(user):
    if user.is_superuser:
        return Permission.objects.all()
    return user.user_permissions.all() | Permission.objects.filter(group__user=user)


def user_permissions(permission):
    """
    Decorator that checks if a user has a permission to visit a certain page.
    If the user doesnt have the required permission, return status status code 403
    """
    def decorator(view_function):
        def wrapper(request, *args, **kwargs):
            if not isinstance(request.user, AnonymousUser):
                # Check if a user has the required permission
                if request.user and get_user_permissions(request.user).filter(codename=permission).exists():
                    return view_function(request, *args, **kwargs)

                else:
                    # User does not have the required permission
                    # TODO: Replace with exceptions facotry handling
                    return Response({'error': "You don't have permission to access this endpoint"}, status=status.HTTP_403_FORBIDDEN)
            else:
                # TODO: Replace with exceptions facotry handling
                return Response({'error': "You are not logged in. Therfore, you don't have permission to access this endpoint"}, status=status.HTTP_403_FORBIDDEN)
        return wrapper
    return decorator