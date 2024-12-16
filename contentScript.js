(function () {
    const selectedText = window.getSelection() ? window.getSelection().toString() : "";
    chrome.runtime.sendMessage({ action: "getSelectedText", text: selectedText });
})();