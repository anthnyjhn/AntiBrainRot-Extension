(function () {
    if (location.hostname !== "www.tiktok.com") return;

    chrome.storage.sync.get(['blockTiktok'], (data) => {

        if (!data.blockTiktok) {
            return;
        }

        function checkAndRedirect() {
            if (location.hostname !== "www.tiktok.com") {
                window.stop();
                window.location.replace("");
                return;
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