from django.urls import path
from .views import home, ProfileDetailView


urlpatterns = [
    path('', home, name='home'),
    path('profile/', ProfileDetailView.as_view(), name='profile'),
]