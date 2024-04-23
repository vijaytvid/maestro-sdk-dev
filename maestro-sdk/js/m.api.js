function getAppData() {
  console.log("getAppData");

  fetch(config.appUrl, {
    headers: {
      "x-maestro-client-id": config.clientId,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      config.appData = response;
      renderHeader();
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getVideoSpotLight(id = "", elementId = "", rowNumber = "") {
  console.log("getVideoSpotLight", id, elementId, rowNumber);
  if (id === "") return;

  let url = `${config.domain}/${config.v3Path}/${id}`;

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
      result = JSON.parse(result);
      var div = document.getElementById(elementId);
      var img = div.querySelector("img");
      img.setAttribute("src", result.thumbnail);

      document.getElementById(
        `videoSpotLightTextBox_${rowNumber}`
      ).innerHTML = `<h3>${result.title}</h3><h>${result.description}</h>`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getTopNavigationData() {
  console.log("getTopNavigationData");
  let url = `${config.domain}/navigation/v1/${config.appData.data.navigation_id}`;
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

function getVideoPlayList(playlistId, elementId, rowIndex) {
  console.log("getAppData", playlistId, elementId);
  let url = `${config.playlistUrl}/${playlistId}`;
  try {
    fetch(url, {
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
      let url = `${config.videoDetailUrl}/${list.id}`;
      const response = await fetch(url, {
        headers: {
          "x-maestro-client-id": config.clientId,
          "x-maestro-developer-key": config.developerKey,
        },
      });
      const data = await response.json();
      console.log(url + " API Response:", data);
      playListArray.push(data);
      src += `<div class="col-sm-3 focusable image-gallery-item ${
        !data.hasOwnProperty("thumbnail")
          ? "d-flex align-items-center justify-content-center"
          : ""
      } " id="row_item_${rowIndex}_${i}" data-sn-up="#row_item_${
        rowIndex - 1
      }_0" data-sn-down="#row_item_${
        rowIndex + 1
      }_0" tabindex="4" style="background-color: #242438"> `;
      if (data["thumbnail"] !== undefined)
        src += `<img src="${data["thumbnail"]}" alt="${data["title"]}" />`;
      else src += `<h3>${data["title"]}</h3>`;
      src += `</div>`;
      // Process the API response as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    i++;
  }

  document.getElementById(elementId).innerHTML = src;
}
