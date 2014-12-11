define(['underscore','backbone','collections/todos'],function(_,Backbone,Todos){
	var TodoRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},
		setFilter: function (param) {
			// Set the current filter to be used
			 this.TodoFilter = param || '';
			// 触发过滤事件
			Todos.trigger('filter');
		}
	});
	Backbone.history.start();
	return new TodoRouter();
	
})