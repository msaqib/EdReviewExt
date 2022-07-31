chrome.tabs.onUpdated.addListener((tabid, tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const pageu = tabs[0].url;
        if (pageu && pageu.includes("educative.io")) {
            const tokens = pageu.split("/");
            chrome.tabs.sendMessage(tabid, {
                type: "NEW",
                courseId: tokens[4],
                lessonId: tokens[5]
            })
        }

    })
    /*if (tab.url && tab.url.includes("educative.io"))*/ {
        //const pageu = tab.url.split("/"); // This isn't quite right. It'll split on the / in https://, I think

    }
})