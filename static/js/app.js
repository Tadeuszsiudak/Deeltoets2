var frisbeeApp = frisbeeApp || {};

(function () {
	// Data objecten
	frisbeeApp.schedule = {
		scheduleThead: [
			{
				description: 'Datum'
			},{
				description: 'Team 1'
			}, {
				description: 'Team 1 Score'
			}, {
				description: 'Team 2'
			}, {
				description: 'Team 2 Score'
			}, {
				description: 'Last Update'
			}, {
				description: 'Score Update'
			}
		]
	};

	frisbeeApp.game = {
		gameThead: [
			{
				description: 'Team1'
			}, {
				description: 'score1'
			},{
				description: 'score2'
			}, {
				description: 'Team2'
			}
		],		
	};

	frisbeeApp.ranking = {
		rankingThead: [
			{
				description: 'Teamnaam'
			}, {
				description: 'Keren gespeeld'
			}, {
				description: 'Win'
			}, {
				description: 'Lose'
			}, {
				description: 'Points Scored'
			}, {
				description: '+/-'
			}
		]
	};
	
	// Controller Init
	frisbeeApp.controller = {
		init: function () {
			// Initialize router
			frisbeeApp.router.init();
		}
		 var type='POST',
                 url='https://api.leaguevine.com/v1/game_scores/',
                 postData= JSON.stringify({
                 	"game_id": "127236",
    			 	"team_1_score": "5",
    				"team_2_score": "6",
    				"is_final": "False"
                 });

                        // Create request
                        var xhr = new XMLHttpRequest();
                        
                        // Open request
                        xhr.open(type,url,true);

                        // Set request headers
                        xhr.setRequestHeader('Content-type','application/json');
                        xhr.setRequestHeader('Authorization','bearer 78f73d2624');
                        
                        // Send request (with data as a json string)
                        xhr.send(postData);
		},
		
	};
	
	// Router
	frisbeeApp.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	frisbeeApp.page.schedule();
				},
			    '/game/': function(game_id) {
			    	frisbeeApp.page.game();
			    },

			    '/ranking': function() {
			    	frisbeeApp.page.ranking();
			    },
		
			    '*': function() {
			    	frisbeeApp.page.game();
			    }
			});


		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

            // Show active section, hide all other
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Pages
	frisbeeApp.page = {
		schedule: function () {
			$$.json('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=c0d139912b',{},function(data){
				Transparency.render(qwery('[data-route=schedule')[0], frisbeeApp.schedule);
				Transparency.render(qwery('[data-route=schedule.time')[0], data);
				frisbeeApp.router.change();
				console.log(data);
			})			
		},

		game: function () {
		$$.json('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=c0d139912b',{},function(data){	
			Transparency.render(qwery('[data-route=game')[0], frisbeeApp.game);
				Transparency.render(qwery('[data-route=game.score')[0], data);
				frisbeeApp.router.change();
				console.log(data);
			})
		},

		ranking: function () {			
			$$.json('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=29da126e2c',{},function(data){
					Transparency.render(qwery('[data-route=ranking')[0], frisbeeApp.ranking);
					Transparency.render(qwery('[data-route=Tournament.pools')[0], data);
					//console.log(frisbeeApp.Tournament.pools);
					frisbeeApp.router.change();
				})
		}
	}
	// DOM ready
	domready(function () {
		// Kickstart application
		frisbeeApp.controller.init();
	});
	
})();
