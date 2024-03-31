from django.db import models
from django.contrib.auth.models import AbstractUser
from featurs.models import Role

class CustomUser(AbstractUser):
    
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null = True, blank = True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

