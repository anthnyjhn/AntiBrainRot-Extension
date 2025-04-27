(function () {
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
                console.log("Redirecting away from Shorts...");
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
                console.log("Removed Shorts button.");
            } else {
                el.remove(); // fallback
                console.log("Removed endpoint with title 'Shorts'.");
            }
        });

        const ExploreNavLink = document.querySelectorAll('#items.style-scope.ytd-guide-section-renderer');
        ExploreNavLink.forEach(el => {
            el.remove();
            console.log("Removed rich/suggested content from homepage.");
        });
    }

    function removeReelsContentSections() {
        const elements = document.querySelectorAll(
            '#content.style-scope.ytd-rich-section-renderer,#contents.style-scope.ytd-reel-shelf-renderer, #chips.style-scope.ytd-feed-filter-chip-bar-renderer'
        );
        elements.forEach(el => {
            el.remove();
            console.log("Removed rich/suggested content from homepage.");
        });
    }

    function removeSuggestedContents() {
        if (isHomepage() && !isSubscriptionsPage() && !isResultsPage()) {
            const elements = document.querySelectorAll('#contents.style-scope.ytd-rich-grid-renderer');
            elements.forEach(el => {
                el.remove();
                console.log("Removed rich section content.");
            });
        }
    }


    function runAll() {
        removeSuggestedContents();
        checkAndRedirect();
        removeShortsNavButton();
        removeReelsContentSections();
    }

    runAll();

    // Observe DOM changes for URL changes or new elements
    const observer = new MutationObserver(() => {
        runAll();
    });

    observer.observe(document, { subtree: true, childList: true });

    // Handle back/forward navigation
    window.addEventListener("popstate", () => {
        runAll();
    });
})();
