var page_index = 0,
  menu_index = 2,
  tab_index = 2,
  nav_index = "",
  active_slug = "home",
  qr_code_interval = "",
  qr_code_expire_at = "";

var first_page_focused_element = "",
  first_page_selected_element = "";

window.maestro = {
  load: () => {
    console.log("home screen");
    window.SN = SpatialNavigation;
    SN.init();
    $("#root").load("maestro-sdk/views/main.html");
    getSiteData();
    if (localStorage.length < 1) {
      $("#menu_0").hide();
    }
    setTimeout(() => {
      $(".splash-screen-container").hide();
      $(".loader_container").show();
      $(".maestro-container").show();
      getAppData();
      manage_spatial_navigation("menu_container");
    }, 5000);
  },
};
