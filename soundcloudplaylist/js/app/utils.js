define(function() {

  return {
    formToObject: function(form) {
      var result = {};
      for (var i = 0; i < form.elements.length; i++) {
        var input = form.elements[i];
        var name = input.name;
        if (!name) {
          continue;
        }
        result[name] = input.value;
      }
      return result;
    }
  }

});
