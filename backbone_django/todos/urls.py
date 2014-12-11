from django.conf.urls import patterns, url
from views import TodoView,TodosView

urlpatterns = patterns('',
	url(r'^/$','index',name='index'),
	url(r'^todo/$',TodoView.as_view()),
    url(r'^todo/(\d+)$',TodoView.as_view()),
    url(r'^todos$', TodosView.as_view())
)