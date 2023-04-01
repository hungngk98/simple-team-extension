async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function injectScript() {
    const tags = document.querySelectorAll('a');
    const links = [...tags].map(item => item.href);

    [...links].forEach((link) => {
        console.log(link);
    });
}

document.querySelector('#btn-crawl').addEventListener('click', async () => {
    chrome.scripting.executeScript({
        target: { tabId: (await getCurrentTab()).id },
        func: injectScript
    });
});