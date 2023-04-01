async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.contextMenus.create({
    id: "reveal",
    title: "View detail link",
    contexts: ['link']
});

chrome.contextMenus.create({
    id: "report",
    title: "Report link",
    contexts: ['link']
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === 'reveal') {
        chrome.scripting.executeScript({
            target: { tabId: (await getCurrentTab()).id },
            func: (info) => { alert(`The actual link is: ${info.linkUrl}`); },
            args: [info]
        });
    } else if (info.menuItemId === 'report') {
        chrome.scripting.executeScript({
            target: { tabId: (await getCurrentTab()).id },
            func: (info) => { alert(`Reported link successfully`); },
            args: [info]
        });
    }
});