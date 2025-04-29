(function () {
    console.log("RejectTiktok.js loaded");
    if (location.hostname !== "www.tiktok.com") return;


    chrome.storage.sync.get(['blockTiktok'], (data) => {

        if (!data.blockTiktok) {
            return;
        }

        function checkAndRedirect() {
            window.location.replace("https://www.google.com/");
            if (location.hostname === "www.tiktok.com") {
                window.location.replace("https://www.google.com/");
            }
        }

        function runAll() {
            checkAndRedirect();
        }

        runAll();

        const observer = new MutationObserver(runAll);
        observer.observe(document, { subtree: true, childList: true });

        window.addEventListener("popstate", runAll);

    });



})();