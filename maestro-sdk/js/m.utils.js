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
  // console.log("smoothScrollToRow", rowId);
  const rowElement = document.getElementById(rowId);
  const homeContainer = document.getElementById("homeContainer");

  // Get the top position of rowElement relative to homeContainer
  const rowElementTop = rowElement.getBoundingClientRect().top;
  const homeContainerTop = homeContainer.getBoundingClientRect().top;

  const rowElementRect = rowElement.getBoundingClientRect();
  const homeContainerRect = homeContainer.getBoundingClientRect();
  // Calculate the center positions
  const rowElementCenter = rowElementRect.top + rowElementRect.height / 2;
  const homeContainerCenter =
    homeContainerRect.top + homeContainerRect.height / 2;

  // Calculate the difference between the centers
  const scrollTop = rowElementCenter - homeContainerCenter;

  // Adjust the scroll position of the container to center the row element
  homeContainer.scrollTop += scrollTop;

  // Check if rowElement is already at the top of homeContainer
  // if (rowElementTop !== homeContainerTop) {
  //   console.log("sfasfsfsfsdfd");
  //   rowElement.scrollIntoView({
  //     behavior: "smooth", // Smooth scroll
  //     block: "start", // Align to the top of homeContainer
  //     inline: "nearest",
  //   });
  // }
}

function horizontalScrollableItems() {
  const items = document.getElementsByClassName("scrollable-item");
  // const homeContainer = items.parent(); // document.getElementById("homeContainer");

  Array.from(items).forEach((item) => {
    item.addEventListener("focus", () => {
      const itemRect = item.getBoundingClientRect();
      let parentContainer = item.parentElement;
      // console.log("parentContainer", parentContainer);
      const containerRect = parentContainer.getBoundingClientRect();

      const itemLeft = itemRect.left - containerRect.left;
      parentContainer.scrollLeft += itemLeft - 10; // Adjust with padding if needed
    });
  });
}

function shiftMainContainerContent(flag) {
  const mainContentBox = document.querySelectorAll(".main-content-box");
  mainContentBox.forEach((box) => {
    if (flag) box.classList.add("shift-margin-left");
    else box.classList.remove("shift-margin-left");
  });
}
