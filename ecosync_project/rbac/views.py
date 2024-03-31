from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from featurs.models import Role, Permission
from .serializers import PermissionSerializer

class RolePermissionsAPIView(APIView):
    def post(self, request, roleId):
        try:
            role = Role.objects.get(RoleID=roleId)
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Assuming permissions data is passed in the request body
        permission_data = request.data.get('permissions')
        
        if not permission_data:
            return Response({'error': 'No permissions provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Assuming permission data contains a list of permission IDs
        for permission_id in permission_data:
            try:
                permission = Permission.objects.get(PermissionID=permission_id)
                role.permissions.add(permission)
            except Permission.DoesNotExist:
                # Handle the case where a permission does not exist
                pass
        
        return Response({'message': 'Permissions assigned successfully'}, status=status.HTTP_200_OK)
