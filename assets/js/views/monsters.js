var app = app || {};

$(function() {
	'use strict';
  app.MonsterView = Backbone.View.extend({
    tagName: 'div',
		template: _.template( $('#monster-template').html() ),
		
    events: {
			'click .delete': 'clear',
			'click #modalDetails .save': 'updateMonster',
			'click .edit': 'edit'
    },

    initialize: function() {
			//_.bindAll(this, 'render', 'close', 'remove');
			this.model.on( 'add', this.render, this );
			this.model.on( 'change', this.render, this );
			this.model.on( 'destroy', this.remove, this );
			this.model.on( 'visible', this.toggleVisible, this );
			
		},
		
		render: function() {
			this.model.set('cid', this.model.cid);
			this.$el.html( this.template( this.model.toJSON() ) );
			this.model.save();
			return this;
		},

		filterMatch: function(){
			var tags = this.model.get('tags');
			if(app.MonsterFilter === ''){
				return true;
			}
			return !(-1 === _.lastIndexOf(tags, app.MonsterFilter));
		},
		
		toggleVisible: function(){
				this.$el.toggleClass('hide', !this.filterMatch());
		},
		
		clear: function() {
			this.model.destroy();
		},
		
		edit: function() {
			app.Monsters.trigger('edit', this.model, this.$el);
			app.MonsterRouter.navigate("edit/" + this.cid);
		},
		
		updateMonster: function(){
			var values = ($('#modalDetails form').serializeArray()),
					results = {};
			$('#modalDetails').modal('hide');
			_.each(values, function(i){
				if(i.value !== ""){
					if(i.name === "tags"){
						results[i.name] = _.map(i.value.split(','), function(tag){ 
							return tag.trim().toLocaleLowerCase(); 
						});
					} else {
						results[i.name] = i.value;
					}
				}
			});
			this.model.save(results);
		}
  });
});

