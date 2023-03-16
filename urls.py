from django.urls import path
from .views import *

from django.contrib.auth.decorators import login_required

urlpatterns = [
    path('', index),
    path('login',index, name="user_login_front"),
    path('teams',login_required(index)),
    path('chat',login_required(index)),
    path('alerts',login_required(index)),
    path('profile',login_required(index)),
    path('bar',login_required(index)),
    path('pie',login_required(index)),
]