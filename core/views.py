from django.shortcuts import render
from rest_framework import generics

from .models import Profile
from .serializers import ProfileSerializer


def home(request):
    return render(request, 'home.html')


class ProfileDetailView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer