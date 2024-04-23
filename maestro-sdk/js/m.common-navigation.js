var first_page_selected_id = "";
function manage_spatial_navigation(containerClass, containerId = "") {
  if (containerId) itemId = containerId + "_0";

  switch (containerClass) {
    case "navigation_container":
      set_focus("headerNavigation", "nav_0");

      $("#headerNavigation").on("sn:focused", function (e) {
        console.log("headerNavigation focused...");
      });

      $("#headerNavigation").on("sn:enter-down", function (e) {
        console.log("headerNavigation enter...");
      });
      break;

    case "menu_container":
      set_focus("menu", "menu_2");

      // When menu foucs
      $("#menu").on("sn:focused", function (e) {
        console.log("menu focused");
        // if ($(".menu_container").hasClass("toggle_menu"))
        //   $(".menu_container").removeClass("toggle_menu");
        // set_page_index();
        // PREVIEW_FULL_DISPLAY = false;
        // change_sidebar_focus_image(e.target.id);
      });

      $("#menu").on("sn:enter-down", function (e) {
        console.log("menu entered");
        // if (!$(".home_container").hasClass("active")) {
        //   $("#home_spinner").hide();
        //   MENU_INDEX = TAB_INDEX = PAGE_INDEX = 0;
        //   reset_preview_player(true);
        //   $(".menu_container").removeClass("toggle_menu");
        //   $(
        //     ".home_container, .account_container, .setting_container, .search_container, .video_library_container, .video_container, .exit_container"
        //   )
        //     .removeClass("active")
        //     .hide();
        //   $("#home_spinner").show();
        //   if (
        //     SELECTED_COUNTRY_GENRE == COUNTRY_GENRE &&
        //     SELECTED_ALPHA_NUMERIC == ALPHA_NUMERIC
        //   ) {
        //     reset_global_variable();
        //     if (_.size(COUNTRY_CHOICE) > 0) {
        //       var tempArray = JSON.parse(JSON.stringify(APP_COUNTRY_ARRAY));
        //       var tempArr = [];
        //       for (var c = _.size(COUNTRY_CHOICE) - 1; c > -1; c--) {
        //         for (var i = 0; i < _.size(tempArray); i++) {
        //           if (tempArray[i]["id"] == COUNTRY_CHOICE[c]) {
        //             tempArr = tempArray[i];
        //             tempArray.splice(i, 1);
        //             tempArray.unshift(tempArr);
        //             tempArr = [];
        //           }
        //         }
        //       }
        //       APP_GENRE_COUNTRY_LIST = tempArray.slice(0);
        //     } else {
        //       APP_GENRE_COUNTRY_LIST = JSON.parse(
        //         JSON.stringify(APP_COUNTRY_ARRAY)
        //       );
        //     }
        //     if (SELECTED_COUNTRY_GENRE == "GENRE")
        //       APP_GENRE_COUNTRY_LIST = JSON.parse(
        //         JSON.stringify(APP_GENRE_LIST)
        //       );
        //     set_homepage_genre_country_channel();
        //   } else {
        //     if (SELECTED_COUNTRY_GENRE == "COUNTRY") {
        //       if (_.size(COUNTRY_WISE_CHANNEL_DATA) > 0) {
        //         reset_global_variable();
        //         if (_.size(COUNTRY_CHOICE) > 0) {
        //           var tempArray = APP_COUNTRY_ARRAY.slice(0);
        //           var tempArr = [];
        //           for (var c = _.size(COUNTRY_CHOICE) - 1; c > -1; c--) {
        //             for (var i = 0; i < _.size(tempArray); i++) {
        //               if (tempArray[i]["id"] == COUNTRY_CHOICE[c]) {
        //                 tempArr = tempArray[i];
        //                 tempArray.splice(i, 1);
        //                 tempArray.unshift(tempArr);
        //                 tempArr = [];
        //               }
        //             }
        //           }
        //           APP_GENRE_COUNTRY_LIST = tempArray.slice(0);
        //         } else {
        //           APP_GENRE_COUNTRY_LIST = JSON.parse(
        //             JSON.stringify(APP_COUNTRY_ARRAY)
        //           );
        //         }
        //         set_homepage_genre_country_channel();
        //       } else getListOfCountries();
        //     } else if (SELECTED_COUNTRY_GENRE == "GENRE") {
        //       if (_.size(APP_GENRE_LIST) > 0) {
        //         reset_global_variable();
        //         APP_GENRE_COUNTRY_LIST = JSON.parse(
        //           JSON.stringify(APP_GENRE_LIST)
        //         );
        //         set_homepage_genre_country_channel();
        //       } else getGenreList();
        //     }
        //   }
        // }
      });

      break;

    case "banner_container":
      set_focus("bannerButtonBox", "primaryCta");

      $("#bannerButtonBox").on("sn:focused", function (e) {
        console.log("bannerButtonBox focused...");
      });

      $("#bannerButtonBox").on("sn:enter-down", function (e) {
        console.log("bannerButtonBox enter...");
      });
      break;

    case "image_gallery_container":
      set_focus("imageGallery", "imageGallery_0");

      $("#imageGallery").on("sn:focused", function (e) {
        console.log("imageGallery focused...");
      });

      $("#imageGallery").on("sn:enter-down", function (e) {
        console.log("imageGallery enter...");
      });
      break;

    case "text_banner_container":
      set_focus("textBannerBox", "textBannerInnerBox");

      $("#textBannerBox").on("sn:focused", function (e) {
        console.log("textBannerBox focused...");
      });

      $("#textBannerBox").on("sn:enter-down", function (e) {
        console.log("textBannerBox enter...");
      });
      break;

    case "video_spotlight_container":
      set_focus(containerId, containerId);

      $("#" + containerId).on("sn:focused", function (e) {
        console.log("video_spotlight_container focused...");
      });

      $("#" + containerId).on("sn:enter-down", function (e) {
        console.log("videoSpotlightContainer enter...", playListArray);
        console.log("Target element ", e);
        first_page_selected_id = e.target.id;
        let index = $("#" + e.target.id).index();
        console.log(index);
        load_player(playListArray[index]);
      });
      break;

    case "pages_container":
      set_focus("pagesRow", "pages_item_0");

      $("#pagesRow").on("sn:focused", function (e) {
        console.log("pagesRow focused...");
      });

      $("#pagesRow").on("sn:enter-down", function (e) {
        console.log("pagesRow enter...");
      });
      break;

    case "LOGOUT":
      set_focus("logout_modal", "no_logout");

      $("#no_logout").on("sn:enter-down", function (e) {
        $(".logout_modal").hide();
        SN.focus("account_btns");
      });

      $("#yes_logout").on("sn:enter-down", function (e) {
        signOutApp();
      });
      break;

    case "exit_container_box":
      set_focus("exit_container", "exitOk");

      $("#exit_container").on("sn:enter-down", function (e) {
        tizen.application.getCurrentApplication().exit();
      });
      break;

    case "EXIT":
      set_focus("exitModal", "noButton");

      $("#noButton").on("sn:enter-down", function (e) {
        hide_show_modal(false, "EXIT");

        var className = "";
        if (PAGE_INDEX == 0) className = "home_container";
        else if (PAGE_INDEX == 1) className = "video_library_container";
        else if (PAGE_INDEX == 2) className = "episode_container";
        else if (PAGE_INDEX == 3) className = "search_container";
        else if (PAGE_INDEX == 4) className = "account_container";
        else if (PAGE_INDEX == 5) className = "setting_container";

        remove_add_active_class(className);
        $(".menu_container").addClass("active");
        set_selected_menu();
        $(".menu_container").removeClass("toggle_menu");
        SN.focus("left_sidebar");
      });

      $("#yesButton").on("sn:enter-down", function (e) {
        // closeVideo();
        tizen.application.getCurrentApplication().exit();
      });
      break;

    case "RETRY_CANCEL":
      set_focus("retryModal", "retryButton");
      SN.focus("retryModal");

      $("#retryModal").off("sn:enter-down");
      $("#retryButton").on("sn:enter-down", function (e) {
        if (PREVIEW_FULL_DISPLAY) SN.focus("previewVideoPlayer");
        load_main_player();
        // webapis.avplay.restoreAsync(VOD_URL, 0, false);
      });

      $("#cancelButton").on("sn:enter-down", function (e) {
        closeVideo();
      });

      $("#retryModal").on("sn:enter-down", function (e) {
        var modalName = "RETRY_CANCEL";
        hide_show_modal(false, modalName);
      });
      break;

    case "RETRY_EXIT":
      set_focus("retryModal", "retryButton");
      SN.focus("retryModal");

      $("#retryModal").on("sn:enter-down", function (e) {
        if ($("#retryButton").is(":focus")) {
          hide_show_modal(false, "RETRY_EXIT");
        } else if ($("#cancelButton").is(":focus")) {
          if (TAB_INDEX != -1) closeVideo();
          tizen.application.getCurrentApplication().exit();
        }
      });
      break;
  }
}

function set_focus(containerId, itemId) {
  console.log("set_focus ", containerId, itemId);
  var restrictVal = "self-first";
  if (containerId == "EXIT" || containerId == "RETRY_CANCEL")
    restrictVal = "self-only";

  SN.remove(containerId);
  SN.add({
    id: containerId,
    selector: "#" + containerId + " .focusable",
    restrict: restrictVal,
    defaultElement: "#" + itemId,
    enterTo: "last-focused",
  });
  SN.makeFocusable();
}

function focus_channel_list() {
  var restrictVal = "self-first";
  var containerId = "channel_list_" + ROW_INDEX;
  var itemId = "row_item_" + ROW_INDEX + "_0";
  SN.remove(containerId);
  SN.add({
    id: containerId,
    selector: "#" + containerId + " .focusable",
    restrict: restrictVal,
    defaultElement: "#" + itemId,
    enterTo: "last-focused",
  });
  SN.makeFocusable();
}

function set_channel_list_focus(row_num) {
  var restrictVal = "self-first";
  var total = 0;
  if (SELECTED_COUNTRY_GENRE == "COUNTRY") total = _.size(APP_COUNTRY_LIST);
  else if (SELECTED_COUNTRY_GENRE == "GENRE") total = _.size(APP_GENRE_LIST);
  for (i = row_num; i < total; i++) {
    var containerId = "channel_list_" + i;
    var itemId = "row_item_" + i + "_0";
    SN.remove(containerId);
    SN.add({
      id: containerId,
      selector: "#" + containerId + " .focusable",
      restrict: restrictVal,
      defaultElement: "#" + itemId,
      enterTo: "last-focused",
    });
    SN.makeFocusable();
  }

  // When menu foucs
  $("[id^=channel_list_]").on("sn:focused", function (e) {
    PAGE_INDEX = MENU_INDEX = TAB_INDEX = 0;
    var id = (FIRST_PAGE_FOCUSED_ITEM = e.target.id);
    if (!$(".menu_container").hasClass("toggle_menu"))
      $(".menu_container").toggleClass("toggle_menu");
    var parentId = $("#" + id)
      .parent()
      .attr("id");
    var countryIndex = $("#" + id)
      .parent()
      .parent()
      .parent()
      .find("h1")
      .attr("id");

    set_first_last_unfocusable_list(parentId, countryIndex);
  });

  $("[id^=channel_list_]").on("sn:enter-down", function (e) {
    PAGE_INDEX = MENU_INDEX = TAB_INDEX = 0;
    SELECTED_CHANNEL_TYPE = "CHA";
    var id = (FIRST_PAGE_SELECTED_ITEM = e.target.id);
    var index = (SELECTED_CHANNEL_INDEX = $("li#" + id).index());
    var countryName = (SELECTED_CAT_INDEX = $("#" + id)
      .parent()
      .attr("data-name"));
    SELECTED_CHANNEL_ROW = $("#" + id)
      .parent()
      .attr("id");
    var channel_id = APP_CHANNEL_DATA_ARRAY[countryName][index]["id"];
    if (TIMER) {
      clearTimeout(TIMER); //cancel the previous TIMER.
      TIMER = null;
    }

    if ($("#" + id).hasClass("selected_channel")) {
      $("#preview-av-player")
        .removeClass("video-player-minimize")
        .addClass("video-player-expand");
      $(".video_player_error_message").addClass("expand_preview_error_msg");
      $(".preview-video-buffered")
        .removeClass("live-preview-player-loader")
        .addClass("live-main-player-loader");

      $("#player_fav").attr(
        "data-id",
        APP_CHANNEL_DATA_ARRAY[countryName][index]["id"]
      );

      get_player_channel_epg(APP_CHANNEL_DATA_ARRAY[countryName][index]["id"]);

      $("#player_channel_name").text(
        APP_CHANNEL_DATA_ARRAY[countryName][index]["number"] +
          ". " +
          APP_CHANNEL_DATA_ARRAY[countryName][index]["name"]
      );

      if (
        APP_CHANNEL_DATA_ARRAY[countryName][index]["favorite"] ||
        typeof FAVORITE_DATA[channel_id] !== "undefined"
      ) {
        $("#player_fav").addClass("added");
        $("#player_fav").text("- FAV");
      } else {
        $("#player_fav").removeClass("added");
        $("#player_fav").text("+ FAV");
      }

      if (APP_CHANNEL_DATA_ARRAY[countryName][index]["hd"] != 0)
        $("#player_hd").show();
      else $("#player_hd").hide();

      $("#channel_logo_expend").html(
        '<img src="' +
          APP_IMAGE_URL +
          APP_CHANNEL_DATA_ARRAY[countryName][index]["logo"] +
          '" alt="' +
          APP_CHANNEL_DATA_ARRAY[countryName][index]["name"] +
          '" onerror="imageError(this);" />'
      );

      $("#video_content_details").show();
      if (
        webapis.avplay.getState() != "NONE" &&
        webapis.avplay.getState() != "IDLE"
      ) {
        webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
        sendMediaInfo(
          "tv-channel",
          APP_CHANNEL_DATA_ARRAY[countryName][index]["number"]
        );
      }
      PREVIEW_FULL_DISPLAY = true;
      SN.focus("favorite_button");

      TIMER = setTimeout(function () {
        $("#video_content_details").hide();
        if (PREVIEW_FULL_DISPLAY) SN.focus("previewVideoPlayer");
      }, 3000);
    } else {
      SELECTED_CHANNEL_NUMBER =
        APP_CHANNEL_DATA_ARRAY[countryName][index]["number"];
      $(".selected_channel").removeClass("selected_channel");
      $("#" + id).addClass("selected_channel");
      $("#selected_channel_name").text(
        APP_CHANNEL_DATA_ARRAY[countryName][index]["number"] +
          ". " +
          APP_CHANNEL_DATA_ARRAY[countryName][index]["name"]
      );
      $("#selected_channel_country").text(
        APP_CHANNEL_DATA_ARRAY[countryName][index]["country_id"]
      );
      $("#selected_channel_language").text(
        APP_CHANNEL_DATA_ARRAY[countryName][index]["language_id"]
      );
      get_channel_epg(APP_CHANNEL_DATA_ARRAY[countryName][index]["id"]);

      if (APP_CHANNEL_DATA_ARRAY[countryName][index]["favorite"])
        $(".fav").css("display", "inline-block");
      else $(".fav").hide();

      if (APP_CHANNEL_DATA_ARRAY[countryName][index]["hd"] != 0)
        $(".hd").css("display", "inline-block");
      else $(".hd").hide();

      webapis.avplay.stop();
      webapis.avplay.close();
      VOD_URL = APP_CHANNEL_DATA_ARRAY[countryName][index]["url"];
      checkVideoURL();
    }
  });
}

function focus_video_list(index) {
  var restrictVal = "self-first";
  var containerId = "video_list_" + index;
  var itemId = "video_item_" + index + "_0";
  SN.remove(containerId);
  SN.add({
    id: containerId,
    selector: "#" + containerId + " .focusable",
    restrict: restrictVal,
    defaultElement: "#" + itemId,
    enterTo: "last-focused",
  });
  SN.makeFocusable();
}

function set_video_list_focus(index) {
  var restrictVal = "self-first";
  var containerId = "video_list_" + index;
  var itemId = "video_item_" + index + "_0";
  SN.remove(containerId);
  SN.add({
    id: containerId,
    selector: "#" + containerId + " .focusable",
    restrict: restrictVal,
    defaultElement: "#" + itemId,
    enterTo: "last-focused",
  });
  SN.makeFocusable();

  $("[id^=video_list_]").on("sn:focused", function (e) {
    PAGE_INDEX = MENU_INDEX = TAB_INDEX = 1;
    if (!$(".menu_container").hasClass("toggle_menu"))
      $(".menu_container").toggleClass("toggle_menu");
    SECOND_PAGE_FOCUSED_ITEM = e.target.id;
    var parentId = $("#" + SECOND_PAGE_FOCUSED_ITEM)
      .parent()
      .attr("id");
    var categoryIndex = $("#" + SECOND_PAGE_FOCUSED_ITEM)
      .parent()
      .parent()
      .parent()
      .attr("id");
    set_video_library_next_previous_list(parentId, categoryIndex);
    if ($("#" + SECOND_PAGE_FOCUSED_ITEM).index() == 0)
      $("#half_video_left_side_" + categoryIndex).hide();
    if ($("#" + SECOND_PAGE_FOCUSED_ITEM + "li:last").is(":last-child"))
      $("#half_video_right_side_" + categoryIndex).hide();
  });

  $("[id^=video_list_]").on("sn:enter-down", function (e) {
    var id = (SECOND_PAGE_SELECTED_ITEM = e.target.id);
    var index = $("li#" + id).index();
    var categoryName = $("#" + id)
      .parent()
      .parent()
      .parent()
      .attr("data-category");
    if (TIMER) {
      clearTimeout(TIMER); //cancel the previous TIMER.
      TIMER = null;
    }
    if (
      $("#" + id).hasClass("selected_video") &&
      _.size(APP_CAT_VIDEO_ARRAY[categoryName][index]["series"]) > 0
    ) {
      $("#video_list").hide();
      $(".episode_container").show();
      $("#loader").show();
      SELECTED_VIDEO_DATA = {};
      SECOND_PAGE_SELECTED_SHOW_CATEGORY = categoryName;
      SELECTED_VIDEO_DATA = APP_CAT_VIDEO_ARRAY[categoryName][index];
      extractVideoCategory();
      $("#episode_list").html("");
      $(".episode_list").hide();
      get_episode_url();
    } else if (
      $("#" + id).hasClass("selected_video") &&
      _.size(APP_CAT_VIDEO_ARRAY[categoryName][index]["series"]) == 0
    ) {
      //Open main video player
      webapis.avplay.stop();
      webapis.avplay.close();
      VOD_COUNTER = index;
      VOD_URL = APP_CAT_VIDEO_ARRAY[categoryName][index]["url"];
      SELECTED_VIDEO_DATA = APP_CAT_VIDEO_ARRAY[categoryName][index];
      show_hide_show_deatils(true);
      load_main_player();
      sendMediaInfo("video", APP_CAT_VIDEO_ARRAY[categoryName][index]["id"]);
    } else {
      $(".selected_video").removeClass("selected_video");
      $("#" + id).addClass("selected_video");
      $("#video_name").text(APP_CAT_VIDEO_ARRAY[categoryName][index]["name"]);
      if (_.size(APP_CAT_VIDEO_ARRAY[categoryName][index]["series"]) > 0) {
        $("#vod_time").hide();
        $("#vod_type").css("display", "inline-block");
        $("#count").text(
          _.size(APP_CAT_VIDEO_ARRAY[categoryName][index]["series"])
        );
      } else {
        $("#count").text("");
        $("#vod_time").show();
        $("#vod_type").hide();
        $("#vod_time").text(
          APP_CAT_VIDEO_ARRAY[categoryName][index]["time"] + "m"
        );
      }
      $("#vod_year").text(APP_CAT_VIDEO_ARRAY[categoryName][index]["year"]);
      $("#vod_country").text(
        APP_CAT_VIDEO_ARRAY[categoryName][index]["country"]
      );
      $("#vod_genre").text(APP_CAT_VIDEO_ARRAY[categoryName][index]["genres"]);
      $("#vod_rating").text(
        APP_CAT_VIDEO_ARRAY[categoryName][index]["rating_mpaa"]
      );
      $("#director_name").text(
        APP_CAT_VIDEO_ARRAY[categoryName][index]["director"]
      );
      $("#actors").text(APP_CAT_VIDEO_ARRAY[categoryName][index]["actors"]);
      $("#video_desc").text(
        APP_CAT_VIDEO_ARRAY[categoryName][index]["description"]
      );

      if (APP_CAT_VIDEO_ARRAY[categoryName][index]["hd"])
        $(".video_hd").css("display", "inline-block");
      else $(".video_hd").hide();

      // if (APP_CAT_VIDEO_ARRAY[categoryName][index]['favorite']) $(".fav").css("display", "inline-block");
      // else $(".fav").hide();

      webapis.avplay.stop();
      webapis.avplay.close();
      $("div#video-preview-player").empty();
      $("div#video-preview-player").html(
        '<img src="' +
          APP_IMAGE_URL +
          APP_CAT_VIDEO_ARRAY[categoryName][index]["poster"] +
          '" alt="' +
          APP_CAT_VIDEO_ARRAY[categoryName][index]["name"] +
          '" onerror="imageError(this);" />'
      );

      //play preview video
      if (APP_CAT_VIDEO_ARRAY[categoryName][index]["promo_url"]) {
        TIMER = setTimeout(function () {
          $("div#video-preview-player").empty();
          $("div#video-preview-player").load("preview-video-player.html");
          VOD_URL = APP_CAT_VIDEO_ARRAY[categoryName][index]["promo_url"];
          load_preview_player();
        }, 4000);
      }
    }
  });
}
