var player = "";
function load_player(videoData) {
  console.log(videoData, player);
  var videoType = "";
  var options = {
    autoplay: false,
    controls: true,
    preload: "auto",
    fluid: true,
    aspectRatio: "16:9",
  };

  player = videojs("maestroPlayer", options, function onPlayerReady() {
    videojs.log("Your player is ready!");

    // In this context, `this` is the player that was created by Video.js.
    //   this.play();

    // Assuming you have a <video> element with ID 'my-video'

    // Listen for the 'play' event
    this.on("play", function () {
      console.log("Playback started");
    });

    // Listen for the 'pause' event
    this.on("pause", function () {
      console.log("Playback paused");
    });

    // Listen for the 'ended' event
    this.on("ended", function () {
      console.log("Playback ended");
    });

    // Listen for the 'timeupdate' event
    this.on("timeupdate", function () {
      console.log("Current time: " + this.currentTime());
    });

    // Listen for the 'volumechange' event
    this.on("volumechange", function () {
      console.log("Volume changed: " + this.volume());
    });

    // Listen for the 'fullscreenchange' event
    this.on("fullscreenchange", function () {
      console.log("Fullscreen changed");
    });

    // Listen for the 'error' event
    this.on("error", function (e) {
      console.error("Error:", e);
    });
  });

  if (videoData !== null && videoData !== undefined) {
    videoType =
      videoData.url.indexOf(".m3u8") > -1
        ? "application/x-mpegURL"
        : "video/mp4";
  }

  player.src({
    src: videoData.url,
    type: videoType,
    withCredentials: false,
  });

  show_hide_video_container(true);
  player.play();
}
// Open video screen
function show_hide_video_container(show = true) {
  //   $(".pause-icon").hide();
  //   $(".video-inner").show();
  //   $(".video-loader").show();
  if (show) {
    $(".home_container, .page_container, .login_container, .loader_container")
      .removeClass("active")
      .hide();
    $(".video-player-container").addClass("active").show();
  } else {
    player.pause();
    $(".video-player-container").removeClass("active").hide();
    $(".maestro-container").show();

    if (page_index == 5) $(".page_container").addClass("active").show();
    else $(".home_container").addClass("active").show();

    SN.focus("#" + first_page_selected_element);
  }
  //   $("#av-player").css("display", "block");
}
