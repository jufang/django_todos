define(['underscore','backbone','models/todo'],function(_,Backbone,Todo){
	var TodoList=Backbone.Collection.extend({
		url:'www.url.com/todos',
		model:Todo,
		
		//返回一个已完成todo项
		completed: function () {
			return this.where({completed: true});
		},
		//返回一个未完成todo项
		remaining:function(){
			return this.where({completed: false});
		},
		nextOrder:function(){
			return this.length ? this.last().get('order') + 1 : 1;
		},
		comparator: 'order'
	});
	return new TodoList()
})