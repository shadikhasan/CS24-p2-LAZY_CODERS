# authentication/urls.py
from django.views.generic import RedirectView
from django.urls import path, include
from django.contrib.auth import views as auth_views  # Import Django's built-in authentication views
from . import views

urlpatterns = [
    path('auth/reset-password/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/reset-password/initiate/', views.CustomPasswordResetView.as_view(), name='initiate_password_reset'),
    path('auth/reset-password/confirm/<uidb64>/<token>/', views.CustomPasswordResetConfirmView.as_view(), name='confirm_password_reset'),
    #path('auth/change-password/', views.change_password_view, name='change_password'), 
    path('auth/change-password/', RedirectView.as_view(pattern_name='admin:password_change'), name='change_password'),
    
]
