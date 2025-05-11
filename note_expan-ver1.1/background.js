
chrome.commands.onCommand.addListener((command) => {
    if (command === "open_extension") {
        chrome.action.openPopup();
    }
    if (command === "save_note") {
        chrome.runtime.sendMessage({ action: "save_note" });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "open_popup") {
        chrome.windows.create({
            url: "../popups/popup.html", // Path to popup.html
            type: "popup",
            width: 400,
            height: 500,
            top: 100,
            left: 100,
            focused: true
        });
    }
});
