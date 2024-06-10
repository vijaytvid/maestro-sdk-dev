// add eventListener for keydown
document.addEventListener("keydown", function (e) {
  console.log(e.key);

  switch (e.key) {
    case "Enter": //OK button
      // maestro.load();
      break;

    case "ArrowRight": //Right button
      if (
        $(".sidebar-container").hasClass("toggle_menu") &&
        $("[id^=menu_]").is(":focus")
      ) {
        SN.focus(`#${first_page_focused_element}`);
      }
      break;

    case "ArrowLeft": //Left button
      break;

    case "ArrowUp": //Up button
      if (
        $(".home_container").is(":visible") &&
        $(".home_container").hasClass("active") &&
        $("[id^=row_item_]").is(":focus")
      ) {
        let id = $(":focus").attr("id");
        let i = id.split("_")[2];
        if (i > 0) SN.focus("row_" + (Number(i) - 1));
        else if (i == 0) SN.focus("headerNavigation");
      }
      break;

    case "ArrowDown": //Down button
      if (
        $(".home_container").is(":visible") &&
        $(".home_container").hasClass("active") &&
        $("[id^=row_item]").is(":focus")
      ) {
        let id = $(":focus").attr("id");
        let i = id.split("_")[2];
        SN.focus("row_" + (Number(i) + 1));
      }
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
