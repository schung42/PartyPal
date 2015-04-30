define(['app/TrackModel', 'backbone'], function(TrackModel) {

  return Backbone.Model.extend({
    defaults: function() {
      return {
        title: '',
        description: 'My playlist',
        isSelected: false,
        tracks: []
      };
    },

    initialize: function() {
      this.save();

      this.tracks = new (Backbone.Collection.extend({
        model: TrackModel,

        localStorage: new Backbone.LocalStorage('playlists-' + this.id + '-tracks')

      }))();
      this.tracks.fetch()
    },

    deepCopy: function() {
      var json = this.toJSON();
      json.tracks = this.tracks.toJSON();
      return json;
    }

  });

});