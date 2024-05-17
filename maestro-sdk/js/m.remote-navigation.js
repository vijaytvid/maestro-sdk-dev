// add eventListener for keydown
document.addEventListener("keydown", function (e) {
  console.log(e.key);

  if (e.key === "ArrowRight") {
  }
  switch (e.key) {
    case "Enter": //OK button
      // maestro.load();
      break;

    case "ArrowRight": //Right button
      break;

    case "ArrowLeft": //Left button
      break;

    case "XF86Back": //RETURN button
      if ($(".login_container").hasClass("active")) {
        if (qr_code_interval) clearInterval(qr_code_interval);
        show_hide_screens("home_container");
        SN.focus("menu");
      } else if ($(".page_container").hasClass("active")) {
        show_hide_screens("home_container");
        SN.focus("#" + first_page_selected_element);
      } else if ($(".video-player-container").hasClass("active"))
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
