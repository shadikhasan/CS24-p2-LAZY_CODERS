from django.db import models
from django.contrib.auth.models import AbstractUser
from featurs.models import Role

class CustomUser(AbstractUser):
    
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True)
    role = models.ForeignKey(Role, on_delete=models.SET_DEFAULT, default=4)  # Default role ID set to id 4 (id 4 = Unassigned)

    def __str__(self):
        return self.username

