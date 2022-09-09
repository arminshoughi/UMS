from .base import *

ALLOWED_HOSTS = ['ums.ir']
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": 'ums_db',
        "USER": 'ums_user',
        "PASSWORD": 'ums_password@',
        "HOST": 'localhost',
        "PORT": "5432",
    }
}

DEBUG = False
