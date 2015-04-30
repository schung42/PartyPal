requirejs.config({
  baseUrl: 'js/vendor',
  paths: {app: '../app'},
  shim: {
    'underscore': ['jquery'],
    'backbone': ['underscore'],
    'backbone.localStorage': ['backbone'],
    'handlebars': []
  }
});

// Start the main app logic.
requirejs(['app/Router', 'soundcloud-sdk'], function(Router) {
  SC.initialize({
    client_id: '40cb7f3bd24d40b339dea8923162ae20'
  });

  new Router();
  Backbone.history.start();
});
