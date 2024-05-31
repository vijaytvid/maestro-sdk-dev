function stripHtmlTags(str) {
  // Create a temporary div element
  var tempDiv = document.createElement("div");

  // Set the innerHTML of the div to the input string
  tempDiv.innerHTML = str;

  // Extract and return the text content of the div
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
