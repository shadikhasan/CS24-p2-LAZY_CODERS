# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView
from .forms import CustomAuthenticationForm, CustomPasswordResetForm, CustomSetPasswordForm
from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth import logout
from django.urls import reverse
import pprint

def login_view(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('admin:login')  # Redirect to home or any other page
            #return HttpResponse('Logged in successfully')
    else:
        form = CustomAuthenticationForm()
    return render(request, 'auth/login.html', {'form': form})

def logout_view(request):
    logout(request)
    # return redirect('public_welcome_page')
    return redirect(reverse('admin:logout'))
    #return HttpResponse('Logout successfully')

class CustomPasswordResetView(PasswordResetView):
    form_class = CustomPasswordResetForm
    # Add any additional customization if needed

class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    form_class = CustomSetPasswordForm
    # Add any additional customization if needed

def change_password_view(request):
    if request.method == 'POST':
        form = CustomSetPasswordForm(user=request.user, data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')  # Redirect to home or any other page
    else:
        form = CustomSetPasswordForm(user=request.user)
    return render(request, 'auth/change_password.html', {'form': form})
