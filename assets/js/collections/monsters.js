var app = app || {};

(function() {
	'use strict';
	var MonsterList = Backbone.Collection.extend({
		// The list of monsters is stored in localstorage in lieu of an external server.

		model: app.Monster, 
		localStorage: new Store('monsters-backbone'),

		comparator: function( monster ) {
			return monster.get('order');
		},
		
		initialize: function() {
			this.fetch();
			if(this.length === 0){
				this.loadSampleMonsters();
			}
		},
		
		loadSampleMonsters: function() {
			this.create({"description":"Vicious beast that wreaks havoc on towns and villages.","name":"Oculos Armis","thumbnail":"monster001_trans.png","date":"Fri Nov 5, 2012","author":"Dylan","tags":["scary","dangerous"]});
			this.create({"description":"Derpy tentacle three-eyed goblin with a relatively low intellect. ","name":"Crinis Cobolorum","thumbnail":"monster010_trans.png","date":"Fri Nov 5, 2012","author":"Dylan","tags":["derp face","three-eyed","octo","tentacle"]});
			this.create({"description":"Enormous flying eyeball creature. Commonly infuriated and ready to attack. ","name":"Iratus Oculus","thumbnail":"monster006_trans.png","date":"Fri Nov 5, 2012","author":"Anonymous","tags":["scary","eyeball","tentacle","dangerous"]});
		}
	});

	app.Monsters = new MonsterList;
}());