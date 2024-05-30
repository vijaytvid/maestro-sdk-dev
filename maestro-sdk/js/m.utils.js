function stripHtmlTags(str) {
  // Create a temporary div element
  var tempDiv = document.createElement("div");

  // Set the innerHTML of the div to the input string
  tempDiv.innerHTML = str;

  // Extract and return the text content of the div
  return tempDiv.textContent || tempDiv.innerText || "";
}
