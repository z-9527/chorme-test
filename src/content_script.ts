function addStyle() {
  const elements = document.body.getElementsByTagName("*");
  const items = [];
  for (let i = 0; i < elements.length; i++) {
    if (
      elements[i].innerHTML.indexOf("html * { outline: 1px solid red }") != -1
    ) {
      items.push(elements[i]);
    }
  }
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      items[i].innerHTML = "";
    }
  } else {
    document.body.innerHTML +=
      "<style>html * { outline: 1px solid red }</style>";
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("request: ", request);
  if (request.type === "execute") {
    addStyle();
    sendResponse({ message: "执行成功了" });
  }
});
