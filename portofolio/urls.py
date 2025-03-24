from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('work/', views.work, name='work'),
    path('project/', views.project, name='project'),
    path('blogs/', views.blogs, name='blogs'),
    path('blogs/<slug:slug>/', views.blog_detail, name='blog_detail'),
]
