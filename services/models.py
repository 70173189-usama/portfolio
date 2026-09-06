from django.db import models


class Service(models.Model):
    number = models.CharField(max_length=10)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title