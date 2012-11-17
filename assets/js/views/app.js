var app = app || {};

$(function() {
	'use strict';
  app.AppView = Backbone.View.extend({
		el: $('#monsterapp'),
		editTemplate: _.template( $('#monster-edit-template').html() ),

    events: {
			'click #addMonster': 'addMonster',
			'click #resetApp': 'resetApp',
			'click #deleteAll': 'deleteAll',
			'submit form': 'search'
    },

    initialize: function() {
			app.Monsters.on( 'add', this.addOne, this );
			app.Monsters.on( 'reset', this.addAll, this );
			app.Monsters.on( 'filter', this.filterAll, this);
			app.Monsters.on( 'delete', this.deleteAll, this );
			app.Monsters.on( 'edit', this.edit, this );

			app.Monsters.fetch();
		},

		render: function() {
			return this;
		},
		
		preventDefault: function(e){
			e.preventDefault()
		},
		
		addMonster: function(e) {
			app.Monsters.add(new app.Monster());
		},
		
		deleteOne: function(monster){
			monster.destroy();
		},
		
		deleteAll: function(e) {
			_.chain(app.Monsters.models).clone().each(this.deleteOne, this);
		},
		
		addOne: function( monster ) {
			var view = new app.MonsterView({ model: monster });
			$('#monster-list').append( view.render().el );
		},
		
		resetApp: function(){
			this.deleteAll();
			app.Monsters.loadSampleMonsters();
		},
		
		addAll: function() {
			this.$('#monster-list').html('');
			app.Monsters.each(this.addOne, this);
		},

		filterOne : function (monster) {
			monster.trigger('visible');
		},

		filterAll : function () {
			app.Monsters.each(this.filterOne, this);
		},
		
		edit: function( monster, el ){
			jQuery(el).append( this.editTemplate( monster.toJSON()) );
			$('#modalDetails').modal({
			  keyboard: false
			});
			$('#modalDetails').on('hidden', function () {
				app.MonsterRouter.navigate("#");
			})
		},
				
		clear: function() {
			this.model.destroy();
		},
		
		search: function(e){
			e.preventDefault();
			app.MonsterFilter = $('#searchbox').val();
			app.MonsterRouter.navigate("filter/" + app.MonsterFilter);
			app.Monsters.trigger('filter');
		}
		
  });
});