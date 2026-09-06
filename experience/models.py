from django.db import models


class Experience(models.Model):
    date = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title