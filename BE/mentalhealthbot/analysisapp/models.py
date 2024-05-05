from django.db import models
from django.contrib.auth.models import (
    AbstractUser,
    UserManager as DefaultUserManager,
    Group,
    Permission,
)

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
    UserId = models.ForeignKey(
        Mst_UsrTbl, on_delete=models.CASCADE, related_name="bookings_as_user"
    )
    ThreapistId = models.ForeignKey(
        Mst_UsrTbl, on_delete=models.CASCADE, related_name="bookings_as_therapist"
    )
    BookingDate = models.DateField(null=True)
    BookingTime = models.TimeField(null=True)
    approved_by_Threapist = models.BooleanField(default=False)


class SP_execution(models.Model):
    id = models.AutoField(primary_key=True)
    sp_name = models.CharField(max_length=100, null=True)
    sp_desc = models.TextField(null=True)
    executed_by = models.CharField(max_length=100, null=True)

class PastSubscriptionTable(models.Model):
    id = models.AutoField(primary_key=True)
    UserId = models.ForeignKey(Mst_UsrTbl, on_delete=models.CASCADE, null=True)
    SubscriptionId = models.IntegerField(unique=True)
    SubscriptionType = models.CharField(max_length=255, null=True)
    StartDate = models.DateField(null=True)
    EndDate = models.DateField(null=True)

class TestDetails(models.Model):
    id = models.AutoField(primary_key=True)
    test_date = models.DateField(null=True)
    UserId = models.ForeignKey(Mst_UsrTbl, on_delete=models.CASCADE, null=True)
    num_employees = models.CharField(max_length=255, null=True)
    tech_company_or_role = models.CharField(max_length=255, null=True)
    cep_benefits = models.CharField(max_length=255, null=True)
    cep_know_options = models.CharField(max_length=255, null=True)
    cep_discuss = models.CharField(max_length=255, null=True)
    cep_learn = models.CharField(max_length=255, null=True)
    cep_anon = models.CharField(max_length=255, null=True)
    cep_mh_leave = models.CharField(max_length=255, null=True)
    cep_mh_ncsq = models.CharField(max_length=255, null=True)
    cep_ph_ncsq = models.CharField(max_length=255, null=True)
    cep_comf_cw = models.CharField(max_length=255, null=True)
    cep_comf_sup = models.CharField(max_length=255, null=True)
    cep_serious = models.CharField(max_length=255, null=True)
    cep_others_ncsq = models.CharField(max_length=255, null=True)
    pep_have = models.CharField(max_length=255, null=True)
    pep_benefits = models.CharField(max_length=255, null=True)
    pep_know_options = models.CharField(max_length=255, null=True)
    pep_discuss = models.CharField(max_length=255, null=True)
    pep_learn = models.CharField(max_length=255, null=True)
    pep_anon = models.CharField(max_length=255, null=True)
    pep_mh_ncsq = models.CharField(max_length=255, null=True)
    pep_ph_ncsq = models.CharField(max_length=255, null=True)
    pep_comf_cw = models.CharField(max_length=255, null=True)
    pep_comf_sup = models.CharField(max_length=255, null=True)
    pep_serious = models.CharField(max_length=255, null=True)
    pep_others_ncsq = models.CharField(max_length=255, null=True)
    fep_ph_willing = models.CharField(max_length=255, null=True)
    fep_mh_willing = models.CharField(max_length=255, null=True)
    hurt_career = models.CharField(max_length=255, null=True)
    cw_view_neg = models.CharField(max_length=255, null=True)
    comf_ff = models.CharField(max_length=255, null=True)
    neg_response = models.CharField(max_length=255,null=True)
    mh_fam_hist = models.CharField(max_length=255,null=True)
    mh_hist = models.CharField(max_length=255,null=True)
    mh_cur = models.CharField(max_length=255,null=True)
    mh_cur_name_yes = models.CharField(max_length=255,null=True)
    mh_cur_name_maybe = models.CharField(max_length=255,null=True)
    mh_diag_pro = models.CharField(max_length=255,null=True)
    mh_diag_pro_name = models.CharField(max_length=255,null=True)
    sought_treat = models.CharField(max_length=255,null=True)
    work_affect_effect = models.CharField(max_length=255,null=True) 
    work_affect_ineffect =  models.CharField(max_length=255,null=True)
    age =  models.CharField(max_length=255,null=True)
    gender =  models.CharField(max_length=255,null=True)
    work_country = models.CharField(max_length=255,null=True)
    work_remote =  models.CharField(max_length=255,null=True) 
    pred_openness = models.CharField(max_length=255,null=True)
    pred_diag_pro = models.CharField(max_length=255,null=True)
    pred_treatment = models.CharField(max_length=255,null=True)

class ChatHistory(models.Model):
    id = models.AutoField(primary_key=True)
    UserId = models.ForeignKey(Mst_UsrTbl, on_delete=models.CASCADE, null=True)
    isTestGiven = models.BooleanField(default=False)
    TestId = models.ForeignKey(TestDetails, on_delete=models.CASCADE, null=True)
    DateAndTime = models.DateTimeField(null=True)


class ChatMessages(models.Model):
    id = models.AutoField(primary_key=True)
    ChatId = models.ForeignKey(ChatHistory, on_delete=models.CASCADE, null=True)
    MessageContent = models.TextField()
    SentDateTime = models.DateTimeField()
    Sender = models.TextField()
    Status = models.TextField()
