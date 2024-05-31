var playlistContainer = "";

function renderHeader() {
  console.log("renderHeader", app_data, page_index);
  document.getElementById("headerLogo").src =
    app_data.channel.data.artwork.header.logo;
  document.getElementById("headerLogo").alt =
    app_data.channel.data.artwork.header.logo_title;
  // document.getElementById("headerTitle").innerText =
  //   app_data.data.artwork.header.logo_title;

  document.getElementById("loginLogo").src =
    app_data.channel.data.artwork.header.logo;

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

  let selectedNav = "";

  for (let i = 0; i < len; i++) {
    // downFocus = " data-sn-down='#row_item_0_0'";

    if (i == len - 1) rightFocus = " data-sn-right='null'";
    else rightFocus = " data-sn-right='#nav_" + (i + 1) + "'";

    if (i > 0) leftFocus = " data-sn-left='#nav_" + (i - 1) + "'";
    else leftFocus = ""; //"data-sn-left='null'";

    // if (i == 0) selectedNav = "selected-nav";
    // else selectedNav = "";

    src +=
      `<div class="nav-item focusable ${selectedNav}" id="nav_${i}" tabindex="0" data-slug="${topNavData[i]["slug"]}" ` +
      rightFocus +
      leftFocus +
      upFocus +
      downFocus +
      `>${topNavData[i]["name"]}</div>`;
  }

  document.getElementById("headerNavigation").innerHTML = src;
  manage_spatial_navigation("navigation_container");
}

async function renderHomeScreen() {
  const homeData = app_data.channel.data.landing_content;
  console.log("renderHomeScreen", homeData);
  let len = homeData.length;
  let src = "";
  var rowIndex = 0;
  let downFocus = "";
  let upFocus = "";

  src += `<div class="container-fluid p-0">`;

  for (let i = 0; i < len; i++) {
    const element = homeData[i];
    let containerCss = "",
      aspectRatio = "",
      bannerHeight = "",
      style = "";

    if (i === len - 1) downFocus = ` data-sn-down='null' `;
    else downFocus = ` data-sn-down='#row_item_${rowIndex + 1}_0' `;

    if (i > 0) upFocus = ` data-sn-up='#row_item_${rowIndex - 1}_0' `;
    else if (i == 0) upFocus = ` data-sn-up='#nav_0' `;

    console.log("downFocus ==>", downFocus);
    console.log("upFocus ==>", upFocus);

    //Hero banner
    if (homeData[i]["kind"] === "heroBanner") {
      if (homeData[i]["data"]["background"]["desktop"]) {
        style = ` style="background-image: url(${homeData[i]["data"]["background"]["desktop"]}); background-size: cover;background-position: center;background-repeat: no-repeat;" `;
      } else style = ` style="background: #000;" `;

      if (i !== 0) bannerHeight = `style="height: 740px;"`;

      src += `<div class="row banner-container" id="row_${rowIndex}" ${bannerHeight}>`;
      if (
        !homeData[i]["data"]["primary_cta"]["show"] &&
        !homeData[i]["data"]["secondary_cta"]["show"]
      ) {
        src += `<div class="col-sm-12 focusable" ${style} data-kind="${homeData[i]["kind"]}" id="row_item_${rowIndex}_0" ${upFocus}  tabindex="${rowIndex}" class="focusable" >`;
      } else src += `<div class="col-sm-12" ${style} >`;
      // src += `<img id="homeBanner" src="${homeData[i]["data"]["background"]["desktop"]}" alt="banner" />`;
      src += `<div class="banner-content-container banner-overlay" id="bannerButtonBox">`;
      src += `<div class="banner-content-detail-box"><div class="banner-content-detail-left"><div class="banner-content-title">${homeData[i]["data"]["title"]["raw_data"]}</div><div class="banner-content-description">${homeData[i]["data"]["description"]["raw_data"]}</div></div>`;
      src += `<div class="banner-content-buttons">`;

      if (homeData[i]["data"]["primary_cta"]["show"]) {
        src += `<div id="row_item_${rowIndex}_0" ${upFocus} data-kind="${homeData[i]["kind"]}" tabindex="${rowIndex}" class="focusable banner-button mb-3 primary_cta" style="font-size: ${homeData[i]["data"]["primary_cta"]["font_size"]}">${homeData[i]["data"]["primary_cta"]["text"]}</div>`;
      }

      if (homeData[i]["data"]["secondary_cta"]["show"]) {
        src += `<div id="row_item_${rowIndex}_1"  data-kind="${homeData[i]["kind"]}" tabindex="${rowIndex}" class="focusable banner-button secondary_cta" style="font-size: ${homeData[i]["data"]["secondary_cta"]["font_size"]}">${homeData[i]["data"]["secondary_cta"]["text"]}</div>`;
      }

      src += `</div></div><div class="banner-content-detail-right"></div>`;

      src += `</div></div></div>`;
    }

    // if (i === 0 && homeData[i]["kind"] === "heroBanner") {
    //   src += `<div class="content-container">`;
    // }
    if (i === 1 && homeData[0]["kind"] === "heroBanner")
      containerCss = " margin-top: -160px; ";

    //Image gallery block
    if (homeData[i]["kind"] === "imageGallery") {
      aspectRatio = homeData[i]["data"]["aspect_ratio"]["desktop"].replace(
        /\s+/g,
        ""
      );

      if (
        homeData[i]["data"]["aspect_ratio"]["desktop"].replace(/\s+/g, "") ===
        "16/9"
      ) {
        console.log(
          homeData[i]["data"]["aspect_ratio"]["desktop"].replace(/\s+/g, "")
        );
        // containerCss += "height: 626px; ";
      } else if (
        homeData[i]["data"]["aspect_ratio"]["desktop"].replace(/\s+/g, "") ===
        "2/3"
      ) {
        console.log(
          homeData[i]["data"]["aspect_ratio"]["desktop"].replace(/\s+/g, "")
        );
        // containerCss += "height: 800px; ";
      } else if (
        homeData[i]["data"]["aspect_ratio"]["desktop"].replace(/\s+/g, "") ===
        "1/1"
      ) {
        console.log(
          homeData[i]["data"]["aspect_ratio"]["desktop"].replace(/\s+/g, "")
        );
      }

      src += `<div class="row image-gallery-container my-4 padding-left" id="row_${rowIndex}" style="${containerCss}">`;
      src += `<div class="image-gallery-row-heading">${stripHtmlTags(
        homeData[i]["data"]["title"]
      )}</div><div class="col-sm-12 d-flex image-gallery-slider">`;
      let imageGalleryData = homeData[i]["data"]["image_cards"];
      let imgLength = homeData[i]["data"]["image_cards"].length;
      for (let j = 0; j < imgLength; j++) {
        let defaultBg = `style="background-color: #242438;"`;

        if (imageGalleryData[j]["image"]["desktop"]) defaultBg = "";

        src += `<div class="col-sm-3 focusable image-gallery-item" id="row_item_${rowIndex}_${j}"  ${downFocus} ${upFocus} data-kind="${homeData[i]["kind"]}" tabindex="${rowIndex}"> `;
        src += `<div class="image-gallery-image-box" ${defaultBg}>`;
        if (imageGalleryData[j]["image"]["desktop"])
          src += `<img src="${imageGalleryData[j]["image"]["desktop"]}" alt="Gallery" style="aspect-ratio: ${aspectRatio};" />`;
        else {
          src += `${imageGalleryData[j]["title"]}`;
        }
        src += `</div><div class="image-gallery-item-details"><div class="image-gallery-item-label">${stripHtmlTags(
          imageGalleryData[j]["label"]
        )}</div><div class="image-gallery-item-title">${stripHtmlTags(
          imageGalleryData[j]["title"]
        )}</div><div class="image-gallery-item-desc">${stripHtmlTags(
          imageGalleryData[j]["description"]
        )}</div>`;
        src += `<div class="image-gallery-item-button"><div id="rowdad" data-kind="${homeData[i]["kind"]}" tabindex="${rowIndex}" class="focusable banner-button primary_cta">${imageGalleryData[j]["cta"]["text"]}</div></div>`;
        src += `</div></div>`;
      }
      src += `</div></div>`;
    }

    if (homeData[i]["kind"] === "pagesRow") {
      src += `<div class="row item-container padding-left my-4" id="row_${rowIndex}" syle="${containerCss}"><h3 class="row_heading">${homeData[i]["title_text"]}</h3><div class="col-sm-12 p-0 d-flex pages-row-slider">`;
      let pagesData = homeData[i]["pages"];
      let pageLength = pagesData.length;
      let style = "";
      for (let j = 0; j < pageLength; j++) {
        if (pagesData[j]["image"]) {
          style = ` style="background: none;" `;
        } else style = ``;
        src += `<div class="col-sm-3 focusable page-row-item" id="row_item_${rowIndex}_${j}" ${downFocus} ${upFocus} data-kind="${homeData[i]["kind"]}" data-slug="${pagesData[j]["page"]["slug"]}" tabindex="${rowIndex}" ${style}> `;
        if (pagesData[j]["image"])
          src += `<img src="${pagesData[j]["image"]}" alt="bg">`;

        if (pagesData[j]["page"]["seo"]["title"])
          src += `<div class="item-title">${pagesData[j]["page"]["seo"]["title"]}</div>`;
        else {
          src += `<div class="item-title">Default</div>`;
        }
        src += `</div>`;
      }
      src += `</div></div>`;
    }

    if (homeData[i]["kind"] === "textBanner") {
      src += `<div class="row text-banner-container" id="row_${rowIndex}" style="background-color: ${homeData[i]["data"]["background"]["custom_color"]}; ${containerCss}">`;
      if (homeData[i]["data"]["cta"]["show"]) {
        src += `<div class="col-sm-12"><div class="textbanner_content">`;
      } else
        src += `<div class="col-sm-12 focusable" tabindex="${rowIndex}" id="row_item_${rowIndex}_0" ${downFocus} ${upFocus} data-kind="${homeData[i]["kind"]}"><div class="textbanner_content">`;

      if (homeData[i]["data"]["background"]["desktop"]) {
        src += `<img id="textBanner_${rowIndex}" src="${homeData[i]["data"]["background"]["desktop"]}" alt="banner" />`;
      }
      src += `<div class="text-banner-overlay" style="float: ${homeData[i]["data"]["alignment"]["horizontal"]}; text-align: ${homeData[i]["data"]["alignment"]["horizontal"]}"><div class="textbanner_sub_heading">${homeData[i]["data"]["label"]["raw_data"]}</div><div class="textbanner_title">${homeData[i]["data"]["title"]["raw_data"]}</div><div class="textbanner_description">${homeData[i]["data"]["subtitle"]["raw_data"]}</div>`;
      src += `<div class="textbanner_buttons">`;
      if (homeData[i]["data"]["cta"]["show"]) {
        src += `<div class="banner-button textbanner_button primary_cta focusable" tabindex="${rowIndex}" id="row_item_${rowIndex}_0" ${downFocus} ${upFocus} data-kind="${homeData[i]["kind"]}" style="font-size: ${homeData[i]["data"]["cta"]["font_size"]}" >${homeData[i]["data"]["cta"]["text"]}</div></div >`;
      } else {
        src += `<div class="banner-button textbanner_button primary_cta" style="font-size: ${homeData[i][" data"]["cta"]["font_size"]}" >${homeData[i]["data"]["cta"]["text"]}</div></div >`;
      }
      src += `</div></div></div></div>`;
    }

    if (homeData[i]["kind"] === "videoSpotlight") {
      let responsiveStyle = "";
      let stackedStyle = "";
      if (homeData[i]["data"]["background"]["image"]["desktop"]) {
        style = ` background-image: url(${homeData[i]["data"]["background"]["image"]["desktop"]}); background-size: cover;background-position: center;background-repeat: no-repeat; `;
      } else style = ` background: #000; `;

      if (homeData[i]["data"]["layout"] === "left") {
        responsiveStyle = "d-flex flex-wrap-reverse ";
      } else if (homeData[i]["data"]["layout"] === "right") {
        responsiveStyle = "d-flex flex-wrap ";
      } else if (homeData[i]["data"]["layout"] === "stacked") {
        stackedStyle += ` display:grid; place-items:center; height: 800px; `;
        style += ` height: 800px;display: flex;flex-direction: column;align-items:center; `;
      }

      src += `<div class="row text-banner-container videoSpotlight-container" id="row_${rowIndex}" style="${containerCss} ${stackedStyle}">`;
      src += `<div class="col-sm-12 focusable ${responsiveStyle}" tabindex="${rowIndex}" id="row_item_${rowIndex}_0" ${downFocus} ${upFocus} data-kind="${homeData[i]["kind"]}" style="${style}">`;
      src += `<div class="col-sm-6 py-4 text-center" id="videoSpotLightThumbnailBox_${rowIndex}">`;
      src += `<div class="image-wrapper"><img class="spotlight-image" src="" alt="${homeData[i]["kind"]}" /></div>`;
      src += `</div>`;
      src += `<div class="col-sm-6 d-flex align-self-center">`;
      src += `<div class="videospotlight-text-box" id="videoSpotLightTextBox_${rowIndex}" style="display:grid;place-items: ${homeData[i]["data"]["alignment"]}">`;
      // src += `<p>${homeData[i]["data"]["label"]["raw_data"]}</p><p>${homeData[i]["data"]["title"]["raw_data"]}</p>`;
      src += `</div>`;
      src += `</div></div></div>`;
      await getVideoSpotLight(
        homeData[i]["data"]["video_id"],
        `row_${rowIndex}`,
        rowIndex
      );
    }

    if (homeData[i]["kind"] === "imageAndText") {
      //flex-row-reverse, flex-column
      src += `<div class="row imagetext-container" id="row_${rowIndex}" style="background-color: ${
        homeData[i]["data"]["background"]["custom_color"]
      }"><div class="col-sm-12 p-0 focusable d-flex ${
        homeData[i]["data"]["layout"] === "left"
          ? "flex-wrap-reverse"
          : "flex-wrap"
      }  align-items-center" style="flex-direction: ${
        homeData[i]["data"]["layout"] === "left" ? "row-reverse" : "unset"
      };" id="row_item_${rowIndex}_0" tabindex="${rowIndex}" ${downFocus} ${upFocus} data-kind="${
        homeData[i]["kind"]
      }">`;
      src += `<div class="col-sm-6 flex-fill py-4 text-center" id="imageAndText_${i}"><div class="text-image-wrapper">`;
      if (homeData[i]["data"]["image"]["src"])
        src += `<img id="imageAndText_background" src="${homeData[i]["data"]["image"]["src"]}" alt="banner" />`;
      src += `</div></div>`;
      src += `<div class="col-sm-6 flex-fill py-4 text-${
        homeData[i]["data"]["alignment"]
      }" id="imageAndText_${i}" style="padding-left: ${
        homeData[i]["data"]["layout"] === "left" ? "80px" : "0"
      };">`;
      src += `<div class="image-text-box" style="float: ${homeData[i]["data"]["alignment"]}; text-align: ${homeData[i]["data"]["alignment"]};">${homeData[i]["data"]["title"]["raw_data"]} ${homeData[i]["data"]["description"]["raw_data"]}`;
      src += `</div>`;
      src += `<div class="button-container py-4 text-${homeData[i]["data"]["alignment"]}" id="imageAndText_${i}">`;
      src += `<div id="imageTextButton" tabindex="${rowIndex}" class="banner-button primary_cta"  style="font-size: ${homeData[i]["data"]["cta"]["font_size"]}">${homeData[i]["data"]["cta"]["text"]}</div>`;
      src += `</div></div></div></div>`;
    }

    if (homeData[i]["kind"] === "playlist") {
      src += `<div class="row playlist-container" style="${containerCss}" id="row_${rowIndex}">`;
      src += `<h3 class="playlist-row-heading" id="playlistTitle_${rowIndex}">Video Playlist</h3>`;
      src += `<div class="col-sm-12 p-0 d-flex align-items-center playlist-item-container" id="playlist_row_${rowIndex}">`;
      src += `</div></div>`;

      await getVideoPlayList(
        homeData[i]["playlist"]["_id"],
        `playlist_row_${rowIndex}`,
        rowIndex
      );
      playlistContainer = `playlist_row_${rowIndex}`;
    }

    // if (i === len - 1 && homeData[0]["kind"] === "heroBanner") {
    //   src += `</div>`;
    // }

    rowIndex++;
  }
  src += `</div>`;
  if (page_index == 5) document.getElementById("pageContainer").innerHTML = src;
  else document.getElementById("homeContainer").innerHTML = src;
  set_content_focus(rowIndex);
  $(".loader_container").hide();
  show_hide_screens("home_container");
  setTimeout(() => {
    console.log("set focus");
    if ($(".selected-nav").length > 0) SN.focus("headerNavigation");
    else if (SN.focus("row_0")) SN.focus("row_0");
    // else SN.focus("headerNavigation");
  }, 1000);
  // manage_spatial_navigation("banner_container");
  // manage_spatial_navigation("image_gallery_container");
  // manage_spatial_navigation("text_banner_container");
  // manage_spatial_navigation("video_spotlight_container", playlistContainer);
  // manage_spatial_navigation("pages_container");
}

function setVideoPlayList(playListId, elementId) {
  console.log("setVideoPlayList", playListId, elementId);
}

function resetTopNavigation(elementId) {
  console.log("resetTopNavigation", elementId);
  $(".selected-nav").removeClass("selected-nav");
  if (elementId.indexOf("nav_") !== -1) {
    nav_index = $("#" + elementId).index();
    $("#" + elementId).addClass("selected-nav");
  } else {
    nav_index = "";
  }
}

function show_hide_screens(className) {
  let mainList = ["login_container", "video-player-container"];
  $(
    ".home_container, .page_container, .login_container, .video-player-container, .loader_container"
  )
    .removeClass("active")
    .hide();

  if (mainList.includes(className)) {
    $(".maestro-container").hide();
  } else $(".maestro-container").show();

  if (className != "")
    $("." + className)
      .addClass("active")
      .show();
  // else $("#loader_container").show();
  console.log("fdsfdfdf");
}

function renderLoginCode(result) {
  var url = `${config.domain}/activate`;
  $(".qr-link").text(url);
  var str = "";
  Array.from(result.code).forEach((char) => {
    console.log(char);
    str += `<div>${char}</div>`;
  });
  $(".login-code").html(str);

  document.getElementById("qrCode").innerHTML = "";
  // createLoginQRCode();
  var qrcode = new QRCode(document.getElementById("qrCode"), {
    text: url,
    width: 215,
    height: 215,
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  show_hide_screens("login_container");
  console.log(qrcode);
  qr_code_expire_at = result.expiresAt;
  if (qr_code_interval) clearInterval(qr_code_interval);
  qr_code_interval = setInterval(() => {
    if (qr_code_expire_at < Date.now()) {
      console.log(qr_code_expire_at);
      updateLoginScreen();
    } else checkQRCodeExpiration(result.code);
  }, 10000);
}
