from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.filter(featured=True).order_by('-created_at')
    serializer_class = ProjectSerializer