define(['backbone'], function() {

  return Backbone.Model.extend({
    defaults: function() {
      return {
        title: "",
        trackId: 0,
        userId: 0,
        username: ""
      };
    }
  });

});