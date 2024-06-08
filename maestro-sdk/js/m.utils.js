function stripHtmlTags(str) {
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = str;
  return tempDiv.textContent || tempDiv.innerText || "";
}

function extractRowNumberFromId() {
  return str.split("_");
}

function smoothScrollToRow(rowId) {
  console.log("smoothScrollToRow", rowId);
  const rowElement = document.getElementById(rowId);
  const homeContainer = document.getElementById("homeContainer");

  // Get the top position of rowElement relative to homeContainer
  const rowElementTop = rowElement.getBoundingClientRect().top;
  const homeContainerTop = homeContainer.getBoundingClientRect().top;

  console.log(rowElementTop, homeContainerTop);

  // Check if rowElement is already at the top of homeContainer
  if (rowElementTop !== homeContainerTop) {
    console.log("sfasfsfsfsdfd");
    rowElement.scrollIntoView({
      behavior: "smooth", // Smooth scroll
      block: "start", // Align to the top of homeContainer
      inline: "nearest",
    });
  }
  console.log("sfsdfd");
}

function shiftMainContainerContent(flag) {
  const mainContentBox = document.querySelectorAll(".main-content-box");
  mainContentBox.forEach((box) => {
    if (flag) box.classList.add("shift-margin-left");
    else box.classList.remove("shift-margin-left");
  });
}
