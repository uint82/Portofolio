from django.shortcuts import render, get_object_or_404
from .models import Project, Skill, About, BlogPost, WorkExperience, TimelineEvent

def home(request):
    about = About.objects.first()
    skills = Skill.objects.all()
    timeline_events = TimelineEvent.objects.all().order_by('year')
    projects = Project.objects.all().order_by('-created_at')
    
    context = {
        'about': about,
        'skills': skills,
        'timeline_events': timeline_events,
        'projects': projects
    }
    return render(request, 'portofolio/home.html', context)

def work(request):
    work_experience = WorkExperience.objects.all().order_by('-start_date')
    
    context = {
        'work_experience': work_experience,
    }
    
    return render(request, 'portofolio/work.html', context)

def project(request):
    projects = Project.objects.all().order_by('-created_at')
    
    context = {
        'projects': projects,
    }
    
    return render(request, 'portofolio/project.html', context)

def blogs(request):
    blog_posts = BlogPost.objects.all().order_by('-published_date')
    
    context = {
        'blog_posts': blog_posts,
    }
    
    return render(request, 'portofolio/blogs.html', context)

def blog_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    
    context = {
        'post': post,
    }
    
    return render(request, 'portofolio/blog_detail.html', context)
