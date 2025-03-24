from django.contrib import admin
from .models import Project, Skill, About, WorkExperience, BlogPost, TimelineEvent  

@admin.register(TimelineEvent)
class TimelineEventAdmin(admin.ModelAdmin):
    list_display = ('year', 'description', 'is_present')
    list_filter = ('is_present',)
    search_fields = ('year', 'description')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'technology', 'created_at')
    search_fields = ('title', 'technology')

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ('position', 'company', 'start_date', 'end_date', 'current')
    list_filter = ('current',)
    search_fields = ('position', 'company')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_date', 'updated_date')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'content')
