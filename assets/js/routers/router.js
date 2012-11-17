var app = app || {};

(function() {
	'use strict';

	var Workspace = Backbone.Router.extend({
		routes:{
			'': 'default',
			'filter/:tag': 'setFilter',
			'edit/:cid': 'edit'
		},
		
		default: function() {
			console.log('route');
			app.MonsterFilter = '';
			app.Monsters.trigger('filter');
			$('#searchbox').val(app.MonsterFilter);
			//app.Monsters.trigger('edit');
		},

		setFilter: function( tag ) {
			// Set the current filter to be used
			app.MonsterFilter = tag.trim() || '';
			// Trigger a collection filter event, causing hiding/unhiding
			app.Monsters.trigger('filter');
			$('#searchbox').val(app.MonsterFilter);
		},
		
		edit: function( cid ){
			var monster = app.Monsters.getByCid(cid);
			console.dir(monster);
			app.Monsters.trigger('edit', monster);
		}
		
	});

	app.MonsterRouter = new Workspace();
	Backbone.history.start();

}());