define(['app/PlaylistCollection', 'app/ListView', 'app/PlaylistView', 'backbone'], function(PlaylistCollection, ListView, PlaylistView) {

  return Backbone.Router.extend({

    routes: {
      '': 'playlists',
      ':id': 'showPlaylist'
    },

    prevId: '',

    initialize: function() {
      this.playlistCollection = new PlaylistCollection;
      this.listView = new ListView({model: this.playlistCollection});
      this.playlistCollection.fetch();
      $('#list').html(this.listView.render().el);
    },

    playlists: function() {
      // Show first playlist, maybe?
    },

    showPlaylist: function(id) {
      if (this.prevId === id) {
        return;
      }

      var playlist = this.playlistCollection.get(id);
      this.playlistView = new PlaylistView({model: playlist});
      $('#content').html(this.playlistView.render().el);
      this.listView.show(id);

      this.prevId = id;
    }
  });

});
