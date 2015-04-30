(function() {

  //FIXME: not finished!
  // Probably want to replace it with https://github.com/derickbailey/backbone.memento

  function ActionHistory() {
    this.stack = [];
  }

  ActionHistory.prototype = {

    newAction: function(doAction, undoAction, context) {
      var i = this.stack.push({undoAction: undoAction, context: context});
      this.stack[i - 1].doActionResult = doAction.call(context);
    },

    undo: function() {
      if (this.stack.length > 0) {
        var step = this.stack.pop();
        step.undoAction.call(step.context, step.doActionResult);
      }
    },

    size: function() {
      return this.stack.length;
    }

  };

  var actionHistory = new ActionHistory();

  define(function() {
    return actionHistory;
  });

})();

