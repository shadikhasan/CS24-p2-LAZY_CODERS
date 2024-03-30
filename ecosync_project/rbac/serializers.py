# serializers.py
from rest_framework import serializers
from .models import Role, Permission

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)  # Assuming Role has a ManyToManyField to Permission

    class Meta:
        model = Role
        fields = '__all__'
