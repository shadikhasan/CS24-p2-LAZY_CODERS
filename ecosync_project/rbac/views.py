from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Role, Permission
from .serializers import RoleSerializer, PermissionSerializer

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

    @action(detail=True, methods=['post'])
    def assign_permissions(self, request, pk=None):
        role = self.get_object()
        # Logic to assign permissions to the role
        # This could involve updating the Role model or creating new association objects
        return Response({"message": "Permissions assigned successfully"}, status=status.HTTP_200_OK)
