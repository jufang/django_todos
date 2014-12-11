# -*- coding:utf8 -*-
from django.http import HttpResponseRedirect,HttpResponse
from django.views.generic import View
from models import Todo
import simplejson

def index(request):
	return HttpResponse('you are in index')

class TodoView(View):
	def post(self,request):
		req=simplejson.loads(request.raw_post_data)
		title=req['title']
		order=req['order']
		if not title:
			return HttpResponse(simplejson.dumps({'success':False}))
		Todo(title=title,order=order).save()
		return HttpResponse(simplejson.dumps({'success':True}), mimetype = 'application/json')

	# request.raw_post_data表示的是从客户端发送过来的原始数据,通过simplejson的loads方法将其转换为字典数据类型req.
	# 而simplejson的dumps方法, 将字典数据dict序列化为字符串形式
	def put(self,request,id):
		req=simplejson.loads(request.raw_post_data)
		title=req['title']
		completed=req['completed']
		order=req['order']
		itertodo=Todo.objects.get(id=id)
		itertodo.title=title
		itertodo.completed=completed
		itertodo.order=order
		itertodo.save()
		return HttpResponse(simplejson.dumps({'success':True}), mimetype = 'application/json')

	def delete(self,request,id):
		Todo.objects.get(id=id).delete()
		return HttpResponse(simplejson.dumps({'success':True}), mimetype = 'application/json')

class TodosView(View):
	def get(self,request):
		itertodo=Todo.objects.all().values('id','title','order','completed')
		return HttpResponse(simplejson.dumps(list(itertodo)))


