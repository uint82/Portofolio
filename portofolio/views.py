from django.shortcuts import render, get_object_or_404, redirect
from .models import Project, Skill, About, BlogPost, WorkExperience, TimelineEvent
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .forms import ContactForm

def home(request):
    about = About.objects.first()
    skills = Skill.objects.all()
    timeline_events = TimelineEvent.objects.all().order_by('year')
    projects = Project.objects.all().order_by('-created_at')
    work_experience = WorkExperience.objects.all().order_by('-start_date')
    
    context = {
        'about': about,
        'skills': skills,
        'timeline_events': timeline_events,
        'projects': projects,
        'work_experience': work_experience
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

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Save form data
            contact_message = form.save()
            
            # Send email
            subject = f"Portfolio Contact: {contact_message.subject}"
            message = f"""
            Name: {contact_message.name}
            Email: {contact_message.email}
            
            Message:
            {contact_message.message}
            """
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [settings.EMAIL_HOST_USER]  # Send to yourself
            
            try:
                send_mail(subject, message, from_email, recipient_list)
                messages.success(request, 'Your message has been sent successfully!')
            except Exception as e:
                messages.error(request, 'There was an error sending your message. Please try again later.')
                # Optional: log the error
                print(f"Email error: {e}")
            
            return redirect('contact')
        else:
            messages.error(request, 'There was an error with your submission. Please check the form.')
    else:
        form = ContactForm()
    
    context = {
        'form': form,
    }
    
    return render(request, 'portofolio/contact.html', context)
