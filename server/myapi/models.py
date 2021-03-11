from django.db import models

class List(models.Model):
    list = models.CharField(max_length=25)
    completed = models.BooleanField(default=False)
    def __str__(self):
        return self.list