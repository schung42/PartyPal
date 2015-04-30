define(['app/PlaylistModel', 'backbone.localStorage'], function(PlaylistModel) {

  return Backbone.Collection.extend({
    model: PlaylistModel,
    localStorage: new Backbone.LocalStorage("playlists")
  });

});
