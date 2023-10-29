from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager as DefaultUserManager, Group, Permission
# Create your models here.

class Mst_UsrTbl(AbstractUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True)
    email = models.EmailField(null=True)
    ContactNo = models.BigIntegerField(null=True, default="9999999999")
    address = models.TextField(null=True)
    type = models.CharField(null=True, max_length=50, default="Customer")
    IsSubscribed = models.BooleanField(default=False)
    # Specify custom related_name value

class SubscriptionTable(models.Model):
    UserId = models.ForeignKey(Mst_UsrTbl, on_delete=models.CASCADE, null=True)
    SubscriptionId = models.AutoField(primary_key=True)
    SubscriptionType = models.CharField(max_length=255, null=True)
    StartDate = models.DateField(null=True)
    EndDate = models.DateField(null=True)

class BookingTbl(models.Model):
    BookingId = models.AutoField(primary_key=True)
    UserId = models.ForeignKey(Mst_UsrTbl, on_delete=models.CASCADE, related_name='bookings_as_user')
    ThreapistId = models.ForeignKey(Mst_UsrTbl, on_delete=models.CASCADE, related_name='bookings_as_therapist')
    BookingDate = models.DateField(null=True)
    BookingTime = models.TimeField(null=True)
    approved_by_Threapist = models.BooleanField(default=False)
