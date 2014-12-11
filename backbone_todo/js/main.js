var ENTER_KEY=13;
require.config({
	paths:{
		jquery:'lib/jquery-1.8.2.min',
		underscore:'lib/underscore-min',
		backbone:'lib/backbone-min'
	},
	shim:{
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [ 'underscore', 'jquery' ],
			exports: 'Backbone'
		}
	}
});
require(['views/app','collections/todos'],function(AppView,AppCollection){
	var app_view = new AppView({
		collection: AppCollection
	});
})