from django.conf.urls import url,include
from backend import views

urlpatterns = [
    url(r'add_user$', views.add_user, ),
    url(r'show_users$', views.show_users, ),
    url(r'delete_user$', views.delete_user,),
]