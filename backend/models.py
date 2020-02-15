from __future__ import unicode_literals
from django.db import models


# Create your models here.
class User(models.Model):
    user_name = models.CharField(max_length=64)
    user_password = models.CharField(max_length=10,default="admin123")

    def __unicode__(self):
        return self.user_name
