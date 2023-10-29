from django.urls import path, include
from .views import *

urlpatterns = [
    path("accounts/", include("django.contrib.auth.urls")),
    path("login/", login.as_view(), name="login"),
    path("logout/", logout.as_view(), name="logout"),
    path("signup/", signup.as_view(), name="signup"),
    path("Booking/", Booking.as_view(), name="Booking"),
]
