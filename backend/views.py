from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.core import serializers
from django.http import JsonResponse
import json

from .models import User
# Create your views here.
@require_http_methods(["GET"])
def add_user(request):
    response = {}
    try:
        username = request.GET.get('user_name')

        if request.GET.get('user_password') != "":
            user = User(user_name=username, user_password=request.GET.get('user_password'))
        else:
            user = User(user_name=username)
        user.save()
        response['msg'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def delete_user(request):
    response = {}
    try:
        username = request.GET.get('user_name')
        User.objects.filter(user_name=username).delete()
        response['msg'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)

@require_http_methods(["GET"])
def show_users(request):
    response = {}
    try:
        user = User.objects.filter()
        response['list'] = json.loads(serializers.serialize('json',user))
        response['msg'] = 'success'
        response['error_num'] = 0
    except Exception as e:
        response['msg'] = str(e)
        response['error_num'] = 1

    return JsonResponse(response)
