from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from ..views import base

urlpatterns = [
    path('auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    path('current-user/', base.current_user, name='current_user'),
]
