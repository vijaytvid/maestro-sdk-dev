// add eventListener for keydown
document.addEventListener("keydown", function (e) {
  console.log(e.key);

  switch (e.key) {
    case "Enter": //OK button
      // maestro.load();
      break;
    case "XF86Back": //RETURN button
      if ($(".video-player-container").hasClass("active"))
        show_hide_video_container(false);
      else if (
        document.querySelector(":focus").getAttribute("id") === "launchBtn"
      )
        tizen.application.getCurrentApplication().exit();

      break;
    default:
      console.log("Key code : " + e.key);
      break;
  }
});
