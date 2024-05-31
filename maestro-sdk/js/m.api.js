var site_data = {},
  theme_data = {},
  app_data = {},
  playListArray = [];

function getSiteData() {
  console.log("getSiteData");
  let url = `${config.domain}/site/v1/${config.siteId}`;
  fetch(url)
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      site_data = response;
      getThemeData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function getThemeData() {
  console.log("getThemeData");
  let url = `${config.domain}/themes/v1/${site_data.settings.default_theme_id}`;
  fetch(url, {
    headers: {
      "x-maestro-client-id": config.clientId,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      theme_data = response;
      document.getElementsByTagName("body")[0].style.fontFamily =
        theme_data.typography.body;
      document.getElementById(
        "maestro-container"
      ).style.backgroundImage = `url('${theme_data.desktopBackground}')`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getAppData() {
  console.log("getAppData");
  let url = `${config.domain}/page/v2/content/id/${config.slug}`;
  fetch(url, {
    headers: {
      "x-maestro-client-id": config.clientId,
      "x-maestro-maestro-kit-flavor": "OTT/tvOS",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      app_data = response;
      renderHeader();
    })
    .catch((error) => {
      console.log(error);
    });
}

function screenData() {
  console.log("getAppData");
  let url = `${config.domain}/page/v2/content/id/${config.slug}`;
  fetch(url, {
    headers: {
      "x-maestro-client-id": config.clientId,
      "x-maestro-maestro-kit-flavor": "OTT/tvOS",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      app_data = response;
      renderHomeScreen();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getVideoSpotLight(id = "", elementId = "", rowNumber = "") {
  console.log("getVideoSpotLight", id, elementId, rowNumber);

  if (id === "") return;

  let url = `${config.domain}/video/v3/${id}`;

  await fetch(url, {
    method: "GET",
    headers: {
      "x-maestro-client-id": config.clientId,
      "x-maestro-developer-key": config.developerKey,
    },
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      var resp = JSON.parse(result);
      setTimeout(() => {
        var div = document.getElementById(
          `videoSpotLightThumbnailBox_${rowNumber}`
        );

        var img = div.getElementsByTagName("img")[0];
        img.setAttribute("src", resp.thumbnail);

        document.getElementById(
          `videoSpotLightTextBox_${rowNumber}`
        ).innerHTML = `<h3>${resp.title}</h3><h4>${resp.description}</h4><div data-kind="videoSpotlight" class="banner-button secondary_cta">Watch Now</div>`;
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
      console.log();
    });
}

function getTopNavigationData() {
  console.log("getTopNavigationData");
  let url = `${config.domain}/navigation/v1/${app_data.channel.data.navigation_id}`;
  try {
    fetch(url, {
      headers: {
        "x-maestro-client-id": config.clientId,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        renderTopNavigation(response.parents);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Catch error: ", error);
  }
}

async function getVideoPlayList(playlistId, elementId, rowIndex) {
  console.log("getAppData", playlistId, elementId);
  let url = `${config.domain}/playlist/v1/${playlistId}`;
  try {
    await fetch(url, {
      headers: {
        "x-maestro-client-id": config.clientId,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        fetchData(response, elementId, rowIndex);
        // config.appData = response;
        // renderHeader();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log("Catch error: ", error);
  }
}

async function fetchData(playlistData, elementId, rowIndex) {
  let data = playlistData.members;
  let src = "";
  let i = 0;
  for (const list of data) {
    try {
      let url = `${config.domain}/video/v3/${list.id}`;
      const response = await fetch(url, {
        headers: {
          "x-maestro-client-id": config.clientId,
          "x-maestro-developer-key": config.developerKey,
        },
      });
      const data = await response.json();
      console.log(url + " API Response:", data);
      playListArray.push(data);
      src += `<div class="col-sm-3 focusable playlist-item ${
        !data.hasOwnProperty("thumbnail")
          ? "d-flex align-items-center justify-content-center"
          : ""
      } " id="row_item_${rowIndex}_${i}" data-sn-up="#row_item_${
        rowIndex - 1
      }_0" data-sn-down="#row_item_${
        rowIndex + 1
      }_0" tabindex="${rowIndex}" data-kind="playlist"> `;
      src += `<div class="playlist-image-box" style="background-color: #242438">`;
      if (data["thumbnail"] !== undefined)
        src += `<img src="${data["thumbnail"]}" alt="${data["title"]}" />`;
      else src += `<h3>${data["title"]}</h3>`;
      src += `</div><div class="playlist-item-details"><div class="playlist-item-title">${data["title"]}</div><div class="playlist-item-desc">${data["description"]}</div></div>`;
      src += `</div>`;
      // Process the API response as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    i++;
  }
  console.log(elementId);
  document.getElementById(`playlistTitle_${rowIndex}`).innerText =
    playlistData.title;
  document.getElementById(elementId).innerHTML = src;
}

function updateLoginScreen() {
  console.log("updateLoginScreen");
  clearInterval(qr_code_interval);
  let url = `${config.domain}/accesscode/v1/tv`;
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-maestro-client-id": config.clientId,
    },
    body: JSON.stringify({ deviceId: webapis.appcommon.getUuid() }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.code !== null && result.code !== undefined) {
        var currentTimestamp = Date.now();
        if (result.expiresAt < currentTimestamp) {
          updateLoginScreen();
        } else renderLoginCode(result);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function checkQRCodeExpiration(code) {
  console.log("checkQRCodeExpiration", code);
  let url = `${config.domain}/accesscode/v1/tv/${code}`;
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //     "x-maestro-client-id": config.clientId,
  //   },
  //   body: JSON.stringify({ deviceId: webapis.appcommon.getUuid() }),
  // };

  fetch(url, {
    method: "GET",
    headers: {
      "x-maestro-client-id": config.clientId,
      "x-maestro-device-id": webapis.appcommon.getUuid(),
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      // if (result.code !== null && result.code !== undefined) {
      //   var currentTimestamp = Date.now();
      //   if (result.expiresAt < currentTimestamp) {
      //     updateLoginScreen();
      //   } else renderLoginCode(result);
      // }
    })
    .catch((error) => {
      console.log(error);
    });
}
