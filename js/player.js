jQuery(document).ready(function() {

    // inner variables
    var song;
    var tracker = $('.tracker');
    var volume = $('.volume');

    function initAudio(elem) {
        var url = elem.attr('audiourl');
        var title = elem.text();
        var cover = elem.attr('cover');
        var artist = elem.attr('artist');

        $('.player .title').text(title);
        $('.player .artist').text(artist);
        $('.player .author__cover').css('background-image','url(images/covers/' + cover+')');;

        song = new Audio('data/songs/' + url);

        // timeupdate event listener
        song.addEventListener('timeupdate',function (){
            var curtime = parseInt(song.currentTime, 10);
            tracker.slider('value', curtime);
        });

        $('.nav--playlist li a').removeClass('singer--active');
        elem.addClass('singer--active');
    }
    function playAudio() {
        song.play();

        tracker.slider("option", "max", song.duration);

        $('.player__play').addClass('player__hidden');
        $('.player__pause').addClass('player__visible');
    }
    function stopAudio() {
        song.pause();

        $('.player__play').removeClass('player__hidden');
        $('.player__pause').removeClass('player__visible');
    }

    // play click
    $('.player__play').click(function (e) {
        e.preventDefault();

        playAudio();
    });

    // pause click
    $('.player__pause').click(function (e) {
        e.preventDefault();

        stopAudio();
    });

    // forward click
    $('.player__fwd').click(function (e) {
        e.preventDefault();

        stopAudio();

        var next = $('.nav--playlist li a.singer--active').next();
        if (next.length == 0) {
            next = $('.nav--playlist li:first-child a');
        }
        initAudio(next);
    });

    // rewind click
    $('.player__rew').click(function (e) {
        e.preventDefault();

        stopAudio();

        var prev = $('.nav--playlist li a.singer--active').prev();
        if (prev.length == 0) {
            prev = $('.nav--playlist li:last-child a');
        }
        initAudio(prev);
    });

    

    // playlist elements - click
    $('.nav--playlist li a').click(function () {
        stopAudio();
        initAudio($(this));
    });

    // initialization - first element in playlist
    initAudio($('.nav--playlist li:first-child a'));

    // set volume
    song.volume = 0.8;

    // initialize the volume slider
    volume.slider({
        range: 'min',
        min: 1,
        max: 100,
        value: 80,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.volume = ui.value / 100;
        },
        stop: function(event,ui) {},
    });

    // empty tracker slider
    tracker.slider({
        range: 'min',
        min: 0, max: 10,
        start: function(event,ui) {},
        slide: function(event, ui) {
            song.currentTime = ui.value;
        },
        stop: function(event,ui) {}
    });
});
