from django.apps import AppConfig
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger


def start_scheduler():
    from .views import day_end_sp

    scheduler = BackgroundScheduler()
    scheduler.add_job(day_end_sp, "cron", hour=9, minute=15)

    # cron_trigger = CronTrigger(hour='6-22', minute='*/30')
    # scheduler.add_job(Fetch_Tatatele_Calling_Records, cron_trigger)
    if not scheduler.running:
        scheduler.start()


class AnalysisappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "analysisapp"

    def ready(self) -> None:
        start_scheduler()
