var Tutor = Parse.Object.extend("_User", {
});

var TutorView = Parse.View.extend({

  tagName: "tr",
  template: _.template($('#tutor-template').html()),

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  render: function() {
    var tutorModel = this.model.toJSON();
    if (tutorModel['picture']) {
      var url = this.model.get('picture').url();
      tutorModel['url'] = url;
    }
    else {
      tutorModel['url'] = "../../images/noPic.jpg";
    }

    $(this.el).html(this.template(tutorModel));
    return this;
  },
});

var Tutors = Parse.Collection.extend({
  model: Tutor
});

var TutorsView = Parse.View.extend({

  el: "#content-container",

  initialize: function() {
    _.bindAll(this, 'addAll');

    this.tutors = new Tutors();
    this.tutors.query = new Parse.Query(Parse.User);
    this.tutors.query.equalTo('accountType', 1);

    this.tutors.bind('reset', this.addAll);

    this.tutors.fetch();
  },

  addOne: function(tutor) {
    var view = new TutorView({model: tutor});
    this.$("#content-container").append(view.render().el);
  },

  addAll: function() {
    this.tutors.each(this.addOne);
  }
});

$(function() {
  new TutorsView;
});
