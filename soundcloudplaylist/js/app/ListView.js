define(['app/actionHistory', 'app/utils', 'backbone', 'handlebars'], function(actionHistory, utils) {

  return Backbone.View.extend({

    tagName: 'div',

    template: Handlebars.compile($('#tpl-list').html()),

    initialize: function() {
      this.model.on('reset add change:title remove', this.render, this);
    },

    // Renders the playlist list template using the handlebars template
    render: function() {
      this.$el.html(this.template({
        playlists: this.model.toJSON()
      }));
      return this;
    },

    events: {
      'click .list-item__link': 'slowDoubleClick',
      'dblclick .list-item__link': 'edit',
      'submit .list-item__form': 'saveTitle',
      'submit .playlists__add': 'addPlaylist'
    },

    _lastClickElement: null,

    slowDoubleClick: function(event) {
      var target = event.target;
      if (target == this._lastClickElement) {
        this.edit(event);
      }
      this._lastClickElement = target;
    },

    prevId: '',

    show: function(id) {
      console.log('prev', this.prevId, '  id', id);
      if (this.prevId) {
        console.log('prevModel', this.model.get(this.prevId));
        $('#link_to_' + this.prevId).removeClass('list-item_active');
      }

      $('#link_to_' + id).addClass('list-item_active');
      this.prevId = id;
    },

    edit: function(event) {
      event.preventDefault();
      $(event.target).closest('.list-item').addClass('list-item_editing').find('.list-item__input').focus();
    },

    saveTitle: function(event) {
      event.preventDefault();
      var target = $(event.target);
      var id = target.data('playlist-id');
      var model = this.model.get(id);
      model.save('title', target.find('.list-item__input').val());
    },

    addPlaylist: function(event) {
      event.preventDefault();
      var input = this.$el.find('.playlists__add-input');
      var data = utils.formToObject(event.target);

      actionHistory.newAction(function() {
        return this.model.create(data).id;
      }, function(id) {
        this.model.get(id).destroy();
      }, this);

      input.val('');
      location.assign(this.$el.find('.list-item__link:last').attr('href')); // Select newly created item
      //FIXME: fix circular dependencies and use backbone route
    },

    undo: function(event) {
      //FIXME
      event.preventDefault();
      actionHistory.undo();
      this.render();
    }

  });
});
