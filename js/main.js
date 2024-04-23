window.onload = function () {
  maestro.load();

  // window.SN = SpatialNavigation;
  // SN.init();

  // setTimeout(function () {
  //   document.getElementById("splash-screen-container").style.display = "none";
  //   // document.getElementById("main-container").style.display = "block";
  //   launch_button_navigation();
  // }, 5000);

  // function launch_button_navigation() {
  //   SN.remove("launchBtnBox");
  //   SN.add({
  //     id: "launchBtnBox",
  //     selector: "#launchBtnBox .focusable",
  //     restrict: "self-first",
  //     defaultElement: "#launchBtn",
  //     enterTo: "last-focused",
  //   });

  //   SN.makeFocusable();
  //   SN.focus("#launchBtn");

  //   // launch buttn selection
  //   $("#launchBtnBox").on("sn:enter-down", function (e) {
  //     maestro.load();
  //   });
  // }
};
