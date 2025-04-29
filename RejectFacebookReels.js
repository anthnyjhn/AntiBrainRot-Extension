(function () {
    chrome.storage.sync.get(['blockFacebook'], (data) => {

        if (!data.blockFacebook) {
            return;
        }

        let lastUrl = location.href;

        function checkAndRedirect() {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
            }

            if (location.pathname.startsWith("/reel")) {
                window.stop();
                window.location.replace("https://www.facebook.com/");
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