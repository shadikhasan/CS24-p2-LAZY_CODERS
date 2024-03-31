from django.urls import path
from .views import RolePermissionsAPIView
from . import views
from django.views.generic import RedirectView



urlpatterns = [
    path('rbac/roles/', RedirectView.as_view(url='/admin/featurs/role/'), name='redirect_to_role'),
    path('rbac/permissions/', RedirectView.as_view(url='/admin/auth/group/'), name='redirect_to_permission'),
    path('rbac/roles/<int:roleId>/permissions/', RolePermissionsAPIView.as_view(), name='assign_permissions_to_role'),

]
