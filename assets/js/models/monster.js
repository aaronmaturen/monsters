var app = app || {};

(function() {
	'use strict';

	app.Monster = Backbone.Model.extend({

		defaults: {
			description: 'He\'s a monster.',
			name: 'Monster',
			thumbnail: 'placeholder.png',
			date: (function(){
				var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
						months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
						today = new Date(),
						msg = days[today.getDay()] + ' ' + months[today.getMonth()] + ' ' + today.getDay() + ', ' + today.getFullYear();
				return msg;
			}()),
			author: 'Anonymous',
			tags: ['a','b','c']
		}
	});

}());