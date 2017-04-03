
//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");


if (Meteor.isClient) {

  Meteor.startup(function () {

});


  Template.playground.helpers({
        "startdac": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.start == 1) {
                    playAll();
                }
            }
            return Session.get('startdac');
        },
        "stopdac": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.start == 0) {
                    stopAll();
                }
            }
            return Session.get('startdac');
        },
        "drums": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.drums == 1) {
                    setVolume(0, starter.slider0volume / 50);
                } else if (starter.drums == 0) {
                    stopOne();
                }
            }
            return Session.get('drums');
        },
        "bassline": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.bassline == 1) {
                    setVolume(1, starter.slider1volume / 50);
                } else if (starter.bassline == 0) {
                    stopOne();
                }
            }
            return Session.get('bassline');
        },
        "arp": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.arp == 1) {
                    setVolume(1, starter.slider2volume / 50);
                } else if (starter.arp == 0) {
                    stopOne();
                }
            }
            return Session.get('arp');
        },
        "cymbal": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.cymbal == 1) {
                    setVolume(1, starter.slider3volume / 50);
                } else if (starter.cymbal == 0) {
                    stopOne();
                }
            }
            return Session.get('cymbal');
        },
        "hihat": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.hihat == 1) {
                    setVolume(1, starter.slider4volume / 50);
                } else if (starter.hihat == 0) {
                    stopOne();
                }
            }
            return Session.get('hihat');
        },
        "snaredrum": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.snaredrum == 1) {
                    setVolume(1, starter.slider5volume / 50);
                } else if (starter.snaredrum == 0) {
                    stopOne();
                }
            }
            return Session.get('snaredrum');
        },
        "bassdrum": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.bassdrum == 1) {
                    setVolume(1, starter.slider6volume / 50);
                } else if (starter.bassdrum == 0) {
                    stopOne();
                }
            }
            return Session.get('bassdrum');
        },
        "riff": function() {
            var starter = MusicMachine.findOne();
            if (starter) {
                if (starter.riff == 1) {
                    setVolume(1, starter.slider7volume / 50);
                } else if (starter.riff == 0) {
                    stopOne();
                }
            }
            return Session.get('riff');
    },

   

    //don't forget the commas between each function
//the last one doesn't have to have one!


  "sliderVal1":  function() { 
    var slider = MusicMachine.findOne();
    if (slider) { 
        Template.instance().$('#slider1').data('uiSlider').value(slider.slide);
        setSpeed(slider.slide/50);
        return slider.slide;
      }
    },

  });


  Template.playground.events({

     "click button.startButton": function () {
      Session.set('startdac', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {start: 1}});
    },

     "click button.myButton1": function () {
      Session.set('drums', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 1}});

    },
      "click button.myButton2": function () {
      Session.set('drums', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 0}});
    },

      "click button.myButton3": function () {
      Session.set('bass', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 1}});

    },

      "click button.myButton4": function () {
      Session.set('bass', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 0}});

    },
      "click button.myButton5": function () {
      Session.set('arp', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 1}});

    },

      "click button.myButton6": function () {
      Session.set('arp', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 0}});

    },
      "click button.myButton7": function () {
      Session.set('bassdrum', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassdrum: 1}});

    },

      "click button.myButton8": function () {
      Session.set('bassdrum', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassdrum: 0}});

    }
	

  });

  Template.playground.onRendered(function() {
    $('h2').hide();
    var handler = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    }, 50, { leading: false });
    
    if (!this.$('#slider1').data('uiSlider')) {
        $("#slider1").slider({
            slide: handler,
            min: 0,
            max: 100
        });
    }
  });
}

if (Meteor.isServer) {
//MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
      MusicMachine.insert({slide: 50});

    }

}