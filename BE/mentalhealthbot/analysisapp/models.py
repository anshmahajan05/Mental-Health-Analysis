from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager as DefaultUserManager, Group, Permission
# Create your models here.

class Mst_UsrTbl(AbstractUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True)
    email = models.EmailField(null=True)
    ContactNo = models.BigIntegerField(null=True, default="9999999999")
    type = models.CharField(null=True, max_length=50, default="Customer")
    IsSubscribed = models.BooleanField(default=False)
    # Specify custom related_name values
    groups = models.ManyToManyField(Group, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions')

class SubscriptionTable(models.Model):
    UserId = models.ForeignKey(Mst_UsrTbl, on_delete=models.CASCADE, null=True)
    SubscriptionId = models.AutoField(primary_key=True)
    SubscriptionType = models.CharField(max_length=255, null=True)
    StartDate = models.DateField(null=True)
    EndDate = models.DateField(null=True)