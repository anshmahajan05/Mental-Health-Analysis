from django.urls import path, include
from .views import *

urlpatterns = [
    path("accounts/", include("django.contrib.auth.urls")),
    path("login/", login.as_view(), name="login"),
    path("logout/", logout.as_view(), name="logout"),
    path("signup/", signup.as_view(), name="signup"),
    path("Booking/", Booking.as_view(), name="Booking"),
    path("subscriptiontable/", subscriptiontable.as_view(), name="subscriptiontable"),
    path("ConfirmBooking/", ConfirmBooking.as_view(), name="ConfirmBooking"),
    path("chatbot/", Chatbot.as_view(), name="Chatbot"),
    path("newchat/", NewChat.as_view(), name="NewChat"),
    path("chathistory/", chathistory.as_view(), name="chathistory"),
]
