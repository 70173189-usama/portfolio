from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=200)

    hero_description = models.TextField(
        blank=True,
        default=""
    )

    about_title = models.CharField(max_length=200)
    about_description = models.TextField()

    focus = models.CharField(max_length=200)
    backend = models.CharField(max_length=200)
    genai = models.CharField(max_length=200)

    email = models.EmailField(
        blank=True,
        default=""
    )

    github_url = models.URLField(
        blank=True,
        default=""
    )

    linkedin_url = models.URLField(
        blank=True,
        default=""
    )

    profile_image = models.ImageField(
        upload_to='profile/',
        blank=True,
        null=True
    )

    resume = models.FileField(
        upload_to='resume/',
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name