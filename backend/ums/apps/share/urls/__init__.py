from .users import urlpatterns as user_urlpatterns
from .base import urlpatterns as base_urlpatterns

urlpatterns = user_urlpatterns + \
              base_urlpatterns
