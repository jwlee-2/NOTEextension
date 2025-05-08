chrome.commands.onCommand.addListener((command) => {
    if (command === "open_extension") {
        chrome.action.openPopup();
    }
    if (command === "save_note") {
        chrome.runtime.sendMessage({ action: "save_note" });
    }
});
