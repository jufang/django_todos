define(['jquery','underscore','backbone','views/todos','routers/router'],function($, _, Backbone, TodoView,router){
	var AppView=Backbone.View.extend({
		el:'#todoapp',
		statsTemplate:_.template($('#stats-template').html()),
		events:{
			'keypress #new-todo':'createOnEnter',
			'click #clear-completed':'clearCompleted',
			'click #toggle-all':'toggleAllComplete'
		},
		initialize:function(){
			this.allCheckbox=this.$('#toggle-all')[0];
			this.$input=this.$('#new-todo');
			this.$footer=this.$('#footer');
			this.$main=this.$('#main');
			this.listenTo(this.collection,'add',this.addOne);
			this.listenTo(this.collection,'reset',this.addAll);

			this.listenTo(this.collection,'change:completed',this.filterOne);
			this.listenTo(this.collection,'filter',this.filterAll);
			this.listenTo(this.collection,'all',this.render);

			this.collection.fetch({reset: true});
		},
		render:function(){
			var completed=this.collection.completed().length;
			var remaining=this.collection.remaining().length;

			if(this.collection.length){
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.statsTemplate({
					completed:completed,
					remaining:remaining
				}));
				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/'+(router.TodoFilter || '')+'"]')
					.addClass('selected');
			}else{
				this.$main.hide();
				this.$footer.hide()
			}
			this.allCheckbox.checked=!remaining;
		},
		addOne:function(todo){
			var view=new TodoView({model:todo});
			$('#todo-list').append(view.render().el);
		},
		addAll:function(){
			$('#todo-list').html('');
			this.collection.each(this.addOne,this);
		},
		filterOne:function(todo){
			todo.trigger('visible')
		},
		filterAll:function(){
			this.collection.each(this.filterOne,this);
		},
		newAttributes:function(){
			return {
				title:this.$input.val().trim(),
				order:this.collection.nextOrder(),
				completed:false
			};
		},
		createOnEnter:function(event){
			if(event.which!==ENTER_KEY ||!this.$input.val().trim()){
				return;
			}
			this.collection.create(this.newAttributes())
			this.$input.val('')
		},
		clearCompleted:function(){
			_.invoke(Todos.completed(),'destroy');
			return false;
		},
		toggleAllComplete:function(){
			var completed=this.allCheckbox.checked;
			this.collection.each(function(todo){
				todo.save({
					'completed':completed
				});
			});
		}
	});
	return AppView;
})