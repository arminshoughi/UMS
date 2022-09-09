from .base import *

ALLOWED_HOSTS = ['daneshjoei.ir']
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": 'daneshjoei',
        "USER": 'admin',
        "PASSWORD": 'admin1234',
        "HOST": 'localhost',
        "PORT": "5432",
    }
}

DEBUG = False
