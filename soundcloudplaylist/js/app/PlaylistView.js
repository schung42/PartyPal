define(['app/actionHistory', 'backbone', 'handlebars'], function(actionHistory) {

  return Backbone.View.extend({

    tagName: 'div',

    template: Handlebars.compile($('#tpl-playlist').html()),

    initialize: function() {
      this.model.bind('reset change', this.render, this);
      this.model.bind('remove', this.renderEmpty, this);
      this.model.tracks.bind('add change remove', this.render, this);
    },

    events: {
      'click .playlists__remove': 'remove',
      'click .playlist__save-meta': 'save',
      'click .playlist__track-play-pause':  'playPauseTrack',
      'click .playlist__delete-track':  'deleteTrack',
      'submit .playlists__add-track': 'addTrack'
    },

    remove: function() {
      this.model.destroy();
    },

    saveField: function(event) {
      event.preventDefault();
      var target = event.target;
      var name = target.name;

      actionHistory.newAction(function() {
        var prevValue = this.model.get(name);
        this.model.save(name, target.value);
        return prevValue;
      }, function (prevValue) {
        this.model.save(name, prevValue);
      }, this);
    },

    save: function(event) {
      event.preventDefault();
      var name = 'description';
      var description = this.$el.find('.playlist__description').html();

      actionHistory.newAction(function() {
        var prevValue = this.model.get(name);
        this.model.save(name, description);
        return prevValue;
      }, function(prevValue) {
        this.model.save(name, prevValue);
      }, this);
    },

    render: function() {
      var obj = this.model.deepCopy();
      // FIXME
      //obj.has_history = (actionHistory.size() > 0);
      //obj.history_length = actionHistory.size();
      this.$el.html(this.template(obj));
      return this;
    },

    renderEmpty: function() {
      this.$el.html('');
    },

    deleteTrack: function (event) {
      event.preventDefault();
      var trackId = $(event.currentTarget).attr('data-track-id');
      var track = this.model.tracks.get(trackId);

      actionHistory.newAction(function() {
        var prevValue = track.toJSON();
        track.destroy();
        return prevValue;
      }, function (prevValue) {
        this.model.tracks.create( prevValue );
      }, this);
    },

    addTrack: function(event) {
      event.preventDefault();
      var target = event.target;

      var value = target.track.value;
      if (value.indexOf('http') != 0) {
        return;
      }

      var that = this;

      SC.get('/resolve', {url: value}, function(data, err) {
        if (err == null && data.kind == 'track') {
          target.value = '';

          actionHistory.newAction(function() {
            return this.model.tracks.create({
              title: data.title,
              trackId: data.id,
              userId: data.user_id,
              username: data.user.username}).id;
          }, function (id) {
            this.model.tracks.get(id).destroy();
          }, that);
        } else {
          alert("404 Not found");
          //TODO: nice error message
        }
      });
    },

    playPauseTrack: function(event) {
      event.preventDefault();

      var newTrackId = $(event.currentTarget).attr('data-track-id');
      var track = this.model.tracks.get(newTrackId);
      var trackIndex = this.model.tracks.indexOf(track);

      if (this._currentTrackIndex == trackIndex) {
        this._currentTrack.togglePause();
      } else {
        if (this._currentTrack != null && this._currentTrackIndex != null) {
          this._currentTrack.pause();
        }
        this.playTracks(trackIndex);
      }
    },

    _currentTrackIndex: null,
    _currentTrack: null,

    resetPlayPauseIcons: function() {
      this.$el.find('.playlist__track-play-pause').removeClass('icon-pause').addClass('icon-play');
    },

    playTracks: function (startIndex) {
      this._currentTrackIndex = startIndex;
      this.resetPlayPauseIcons();

      var track = this.model.tracks.at(this._currentTrackIndex);
      var trackId = track.get("id");

      var that = this;
      SC.stream('/tracks/' + track.get('trackId'), {
        autoPlay: true,

        onplay: function() {
          that._currentTrack = this;
          that._setPause($('#track_'+trackId));
        },

        onpause: function() {
          that._setPlay($('#track_'+trackId));
        },

        onfinish: function() {
          var newIndex = that._currentTrackIndex + 1;
          if (newIndex < that.model.tracks.length) {
            that.playTracks(newIndex);
          } else {
            currentTrackIndex = null;
            currentTrack = null;
            that.resetPlayPauseIcons();
          }
        }

      });
    },

    _setPlay: function(element) {
      element.addClass('icon-play').removeClass('icon-pause');
    },

    _setPause: function(element) {
      element.addClass('icon-pause').removeClass('icon-play');
    },

    undo: function(event) {
      //FIXME: Implement
      event.preventDefault();
      actionHistory.undo();
      this.render();
    }

  });

});
