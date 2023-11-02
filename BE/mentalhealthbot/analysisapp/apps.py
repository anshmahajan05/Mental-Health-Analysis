from django.apps import AppConfig
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger


def start_scheduler():
    from .views import day_end_sp

    scheduler = BackgroundScheduler()
    scheduler.add_job(day_end_sp, "cron", hour=20, minute=45)

    if not scheduler.running:
        scheduler.start()


class AnalysisappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "analysisapp"

    # def ready(self) -> None:
    #     start_scheduler()
