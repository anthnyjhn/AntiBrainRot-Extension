(function () {
    if (location.hostname !== "www.youtube.com") return;

    chrome.storage.sync.get(['blockYouTube'], (data) => {
        if (!data.blockYouTube) {
            //Blocking YouTube Shorts is disabled
            return;
        }

        let lastUrl = location.href;

        function isHomepage() {
            return location.pathname === "/";
        }

        function isSubscriptionsPage() {
            return location.pathname.startsWith("/feed/subscriptions");
        }

        function isResultsPage() {
            return location.pathname.startsWith("/results") || location.pathname.startsWith("/search");
        }

        function checkAndRedirect() {
            if (location.href !== lastUrl) {
                lastUrl = location.href;

                if (location.pathname.startsWith("/shorts/")) {
                    // Redirecting from Shorts back to home 
                    // NO SHORTS FORM CONTENTS ALLOWED 
                    window.location.replace("https://www.youtube.com/");
                }
            }
        }

        function removeShortsNavButton() {
            const ShortsNavLink = document.querySelectorAll('#endpoint[title="Shorts"]');
            ShortsNavLink.forEach(el => {
                const parent = el.closest('ytd-mini-guide-entry-renderer, ytd-guide-entry-renderer, a');
                if (parent) {
                    parent.remove();
                    // Removed Shorts button
                } else {
                    el.remove();
                    // Removed endpoint with title 'Shorts'
                }
            });

            const ExploreNavLink = document.querySelectorAll('#items.style-scope.ytd-guide-section-renderer');
            ExploreNavLink.forEach(el => {
                el.remove();
                // Removed explore nav content in homepage's navbar.
            });
        }

        function removeReelsContentSections() {
            const elements = document.querySelectorAll(
                '#content.style-scope.ytd-rich-section-renderer,#contents.style-scope.ytd-reel-shelf-renderer, #chips.style-scope.ytd-feed-filter-chip-bar-renderer'
            );
            elements.forEach(el => {
                el.remove();
                // remove Reels Content Sections
            });

        }

        function removeReelsContentSectionTitle() {
            // Select all div elements with id 'title-container' and class 'style-scope ytd-reel-shelf-renderer'
            const elements = document.querySelectorAll('div#title-container.style-scope.ytd-reel-shelf-renderer');

            elements.forEach(el => {
                // Check if the element contains a yt-icon
                const ytIcon = el.querySelector('yt-icon');

                // If yt-icon is found, remove the entire div
                if (ytIcon) {
                    console.log("Removing Reels Content Section Title...");
                    el.remove();
                }
            });
        }


        function removeSuggestedContents() {
            if (isHomepage() && !isSubscriptionsPage() && !isResultsPage()) {
                const elements = document.querySelectorAll('#contents.style-scope.ytd-rich-grid-renderer');
                elements.forEach(el => {
                    el.remove();
                    // Removed suggested contents from homepage.
                });
            }
        }

        function runAll() {
            removeSuggestedContents();
            checkAndRedirect();
            removeShortsNavButton();
            removeReelsContentSections();
            removeReelsContentSectionTitle();
        }

        runAll();

        const observer = new MutationObserver(runAll);
        observer.observe(document, { subtree: true, childList: true });

        window.addEventListener("popstate", runAll);
    });
})();