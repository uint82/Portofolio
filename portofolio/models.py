
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technology = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/', blank=True)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Skill(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=100, help_text="FontAwesome class or path to icon")
    custom_icon = models.ImageField(upload_to='skills/', blank=True, null=True)
        
    def __str__(self):
        return self.name

class About(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200, default="Fullstack Developer") 
    profile_image = models.ImageField(upload_to='profile/')
    bio = models.TextField()
    resume = models.FileField(upload_to='resume/', blank=True)
    
    def __str__(self):
        return self.name

class WorkExperience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False)
    company_logo = models.ImageField(upload_to='companies/', blank=True)
    
    def __str__(self):
        return f"{self.position} at {self.company}"

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    summary = models.TextField()
    featured_image = models.ImageField(upload_to='blog/', blank=True)
    published_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class TimelineEvent(models.Model):
    year = models.CharField(max_length=50)
    description = models.TextField()
    is_present = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['year']
    
    def __str__(self):
        return f"{self.year}: {self.description[:50]}"

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name}: {self.subject}"
