# -*- coding:utf8 -*-
from django.db import models

# Create your models here.
class Todo(models.Model):
	title=models.CharField('任务名称',max_length=128)
	order=models.IntegerField('排序',max_length=64)
	completed=models.BooleanField('是否完成')

	class Meta:
		ordering=['order']	
