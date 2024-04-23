window.maestro = {
  load: () => {
    console.log("home screen");
    window.SN = SpatialNavigation;
    SN.init();
    $("#root").load("maestro-sdk/views/main.html");

    setTimeout(() => {
      $(".splash-screen-container").hide();
      $(".loader_container").show();
      $(".maestro-container").show();
    }, 5000);
    // getAppData();

    // $("#maestro-container").append("<div class='home-container' id='home-container'></div>");
    // $("body").prepend(
    //   '<nav class="navbar navbar-expand-md navbar-dark fixed-top header-section"></nav>'
    // );
    // $("#maestro-container").append(
    //   '<section class="home-screen-section"></section>'
    // );
    // $("body").append('<section class="video-player-section"></section>');
    // $(".video-player-section").load("maestro-sdk/views/video-player.html");
    // $(".header-section").load("maestro-sdk/views/header.html");
    // $(".home-screen-section").load("maestro-sdk/views/home.html");
    // $(".launch-screen-section").hide();
    // getAppData();
  },
};
