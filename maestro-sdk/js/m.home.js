var playlistContainer = "";
function renderHeader() {
  console.log("renderHeader", config.appData);
  document.getElementById("headerLogo").src =
    config.appData.data.artwork.header.logo;
  document.getElementById("headerLogo").alt =
    config.appData.data.artwork.header.logo_title;
  document.getElementById("headerTitle").innerText =
    config.appData.data.artwork.header.logo_title;

  getTopNavigationData();
  renderHomeScreen();
}

function renderTopNavigation(topNavData) {
  // if (topNavData.navigation.state != "on") return;
  let src = "",
    leftFocus = 'data-sn-left= "null"',
    rightFocus = 'data-sn-right="null"',
    upFocus = " data-sn-up='null'",
    downFocus = "",
    len = topNavData.length;

  for (let i = 0; i < len; i++) {
    downFocus = " data-sn-down='#row_item_0_0'";

    if (i == len - 1) rightFocus = " data-sn-right='null'";
    else rightFocus = " data-sn-right='#nav_" + (i + 1) + "'";

    if (i > 0) leftFocus = " data-sn-left='#nav_" + (i - 1) + "'";
    else leftFocus = "data-sn-left='null'";

    src +=
      `<div class="nav-item focusable" id="nav_${i}" tabindex="0" ` +
      rightFocus +
      leftFocus +
      upFocus +
      downFocus +
      `>${topNavData[i]["name"]}</div>`;
  }
  document.getElementById("headerNavigation").innerHTML = src;
  manage_spatial_navigation("navigation_container");
}

function renderHomeScreen() {
  const homeData = config.appData.data.landing_content;
  console.log("renderHomeScreen", homeData);
  let len = homeData.length;
  let src = "";
  let rowIndex = 0;
  let downFocus = "";
  let upFocus = "";

  src += `<div class="container-fluid">`;
  for (let i = 0; i < len; i++) {
    const element = homeData[i];
    downFocus = ` data-sn-down='#row_item_${rowIndex + 1}_0' `;
    if (i > 0) upFocus = ` data-sn-up='#row_item_${rowIndex - 1}_0' `;
    if (homeData[i]["kind"] === "heroBanner") {
      src += `<div class="row banner-container" id="row_${rowIndex}"><div class="col-sm-12">`;
      src += `<img id="homeBanner" src="${homeData[i]["data"]["background"]["desktop"]}" alt="banner" />`;
      src += `<div class="banner-overlay" id="bannerButtonBox">${homeData[i]["data"]["title"]["raw_data"]} ${homeData[i]["data"]["description"]["raw_data"]}`;
      src += `<button type="button" id="row_item_${rowIndex}_0" ${downFocus} ${upFocus} tabindex="0" class="focusable btn btn-light banner-button" style="font-size: ${homeData[i]["data"]["primary_cta"]["font_size"]}">${homeData[i]["data"]["primary_cta"]["text"]}</button>`;
      src += `<button type="button" id="row_item_${rowIndex}_1" ${downFocus} ${upFocus} tabindex="0" class="focusable btn btn-light banner-button" style="font-size: ${homeData[i]["data"]["secondary_cta"]["font_size"]}">${homeData[i]["data"]["secondary_cta"]["text"]}</button>`;
      src += `</div></div></div>`;
    }

    if (homeData[i]["kind"] === "imageGallery") {
      src += `<div class="row item-container m-0 p-0 my-4" id="row_${rowIndex}"><div class="col-sm-12 d-flex">`;
      let imageGalleryData = homeData[i]["data"]["image_cards"];
      let imgLength = homeData[i]["data"]["image_cards"].length;
      console.log(imageGalleryData);
      for (let j = 0; j < imgLength; j++) {
        console.log(imageGalleryData[j]);
        src += `<div class="col-sm-3 pt-5 focusable image-gallery-item" id="row_item_${rowIndex}_${j}"  ${downFocus} ${upFocus} tabindex="1" style="background-color: #242438"> `;
        if (imageGalleryData[j]["image"]["desktop"])
          src += `<img src="${imageGalleryData[j]["image"]["desktop"]}" alt="Gallery" />`;
        else {
          src += `${imageGalleryData[j]["label"]} ${imageGalleryData[j]["title"]} ${imageGalleryData[j]["description"]}`;
        }
        src += `</div>`;
      }
      src += `</div></div>`;
    }

    if (homeData[i]["kind"] === "pagesRow") {
      src += `<div class="row item-container m-0 p-0 my-4" id="row_${rowIndex}"><h3 class="row_heading">${homeData[i]["title_text"]}</h3><div class="col-sm-12 py-5 d-flex">`;
      let pagesData = homeData[i]["pages"];
      let pageLength = pagesData.length;
      console.log(pagesData);
      for (let j = 0; j < pageLength; j++) {
        console.log(pagesData[j]);
        src += `<div class="col-sm-3 focusable page-row-item" id="row_item_${rowIndex}_${j}" ${downFocus} ${upFocus} tabindex="1" style="background-color: #242438"> `;
        if (pagesData[j]["page"]["seo"]["title"])
          src += `<div>${pagesData[j]["page"]["seo"]["title"]}</div>`;
        else {
          src += `<div>Default</div>`;
        }
        src += `</div>`;
      }
      src += `</div></div>`;
    }

    if (homeData[i]["kind"] === "textBanner") {
      src += `<div class="row text-banner-container" id="row_${rowIndex}" style="background-color: ${homeData[i]["data"]["background"]["custom_color"]}"><div class="col-sm-12 focusable" tabindex="2" id="row_item_${rowIndex}_0" ${downFocus} ${upFocus}>`;
      if (homeData[i]["data"]["background"]["desktop"])
        src += `<img id="textBanner" src="${homeData[i]["data"]["background"]["desktop"]}" alt="banner" />`;

      src += `<div class="text-banner-overlay" style="float: ${homeData[i]["data"]["alignment"]["horizontal"]}; text-align: ${homeData[i]["data"]["alignment"]["horizontal"]}">${homeData[i]["data"]["label"]["raw_data"]} ${homeData[i]["data"]["title"]["raw_data"]}`;
      src += `<button type="button" id="textBannerButton" class="btn btn-light banner-button"  style="font-size: ${homeData[i]["data"]["cta"]["font_size"]}">${homeData[i]["data"]["cta"]["text"]}</button>`;
      src += `</div></div></div>`;
    }

    if (homeData[i]["kind"] === "videoSpotlight") {
      src += `<div class="row text-banner-container videoSpotlight-container" id="row_${rowIndex}" style="text-align: ${
        homeData[i]["data"]["layout"]
      }"><div class="col-sm-12 focusable d-flex ${
        homeData[i]["data"]["layout"] === "left"
          ? "flex-wrap-reverse"
          : "flex-wrap"
      }  align-items-center"" tabindex="2" id="row_item_${rowIndex}_0" ${downFocus} ${upFocus}>`;
      src += `<div class="col-sm-6 py-4 text-center" id="videoSpotLightThumbnailBox_${i}">`;
      src += `<div class="image-wrapper"><img class="spotlight-image" tabindex="2" src="" alt="${homeData[i]["kind"]}" /></div>`;
      src += `</div>`;
      src += `<div class="col-sm-6 d-flex align-self-center">`;
      src += `<div class="videospotlight-text-box" id="videoSpotLightTextBox_${rowIndex}" style="float: ${homeData[i]["data"]["alignment"]}">`;
      // src += `<p>${homeData[i]["data"]["label"]["raw_data"]}</p><p>${homeData[i]["data"]["title"]["raw_data"]}</p>`;
      src += `</div>`;
      src += `</div></div></div>`;
      getVideoSpotLight(
        homeData[i]["data"]["video_id"],
        `row_${rowIndex}`,
        rowIndex
      );
    }

    if (homeData[i]["kind"] === "imageAndText") {
      //flex-row-reverse, flex-column
      src += `<div class="row imagetext-container" id="row_${rowIndex}" style="background-color: ${
        homeData[i]["data"]["background"]["custom_color"]
      }"><div class="col-sm-12 focusable d-flex ${
        homeData[i]["data"]["layout"] === "left"
          ? "flex-wrap-reverse"
          : "flex-wrap"
      }  align-items-center" style="flex-direction: ${
        homeData[i]["data"]["layout"] === "left" ? "row-reverse" : "unset"
      };" id="row_item_${rowIndex}_0" tabindex="3" ${downFocus} ${upFocus}>`;
      src += `<div class="col-sm-6 flex-fill py-4 text-center" id="imageAndText_${i}"><div class="text-image-wrapper">`;
      if (homeData[i]["data"]["background"]["desktop"])
        src += `<img id="imageAndText_background" src="${homeData[i]["data"]["background"]["desktop"]}" alt="banner" />`;
      src += `</div></div>`;
      src += `<div class="col-sm-6 flex-fill py-4 text-${
        homeData[i]["data"]["alignment"]
      }" id="imageAndText_${i}" style="padding-left: ${
        homeData[i]["data"]["layout"] === "left" ? "80px" : "0"
      };">`;
      src += `<div class="image-text-box" style="float: ${homeData[i]["data"]["alignment"]}; text-align: ${homeData[i]["data"]["alignment"]};">${homeData[i]["data"]["title"]["raw_data"]} ${homeData[i]["data"]["description"]["raw_data"]}`;
      src += `</div>`;
      src += `<div class="button-container py-4 text-${homeData[i]["data"]["alignment"]}" id="imageAndText_${i}">`;
      src += `<button type="button" id="imageTextButton" tabindex="2" class="btn btn-light banner-button"  style="font-size: ${homeData[i]["data"]["cta"]["font_size"]}">${homeData[i]["data"]["cta"]["text"]}</button>`;
      src += `</div></div></div></div>`;
    }

    if (homeData[i]["kind"] === "playlist") {
      src += `<div class="row item-container playlist-container" id="playlistContainer">`;
      src += `<h3 class="row_heading">Video Playlist</h3>`;
      src += `<div class="col-sm-12 py-4 d-flex align-items-center" id="row_${rowIndex}">`;
      src += `</div></div>`;

      getVideoPlayList(
        homeData[i]["playlist"]["_id"],
        `row_${rowIndex}`,
        rowIndex
      );
      playlistContainer = `row_${rowIndex}`;
    }

    rowIndex++;
  }
  src += `</div>`;
  document.getElementById("homeContainer").innerHTML = src;

  for (let k = 0; k < rowIndex; k++) {
    let containerId = `row_${k}`;
    let itemId = `row_item_${k}_0`;

    console.log("set_focus ", containerId, itemId);

    SN.remove(containerId);
    SN.add({
      id: containerId,
      selector: "#" + containerId + " .focusable",
      restrict: "self-first",
      defaultElement: "#" + itemId,
      enterTo: "last-focused",
    });
    SN.makeFocusable();
  }

  // manage_spatial_navigation("banner_container");
  manage_spatial_navigation("image_gallery_container");
  manage_spatial_navigation("text_banner_container");
  manage_spatial_navigation("video_spotlight_container", playlistContainer);
  manage_spatial_navigation("pages_container");
  SN.focus("#primaryCta");
}

function setVideoPlayList(playListId, elementId) {
  console.log("setVideoPlayList", playListId, elementId);
}

function show_hide_screens(className) {
  $(".home_container, .video-player-container").removeClass("active").hide();
  if (className != "")
    $("." + className)
      .addClass("active")
      .show();
  // else $("#home_spinner").show();
}
