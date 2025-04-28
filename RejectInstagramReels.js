(function () {
    chrome.storage.sync.get(['blockInstagram'], (data) => {
        if (!data.blockInstagram) {
            //Blocking Instagram Reels is disabled
            return;
        }

        let lastUrl = location.href;

        function checkAndRedirect() {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
            }

            if (location.pathname.startsWith("/reel/") || location.pathname.startsWith("/reels/")) {
                window.stop();
                window.location.replace("https://www.instagram.com/");
            }
        }

        function removeReelsAndExploreButtons() {
            const navButtons = document.querySelectorAll('a');

            navButtons.forEach((button) => {
                const href = button.getAttribute('href');
                if (href && (href.startsWith('/reels') || href.startsWith('/explore'))) {
                    //Removing Reels/Explore button
                    button.closest('div')?.remove();
                    button.remove();
                }
            });
        }

        function removeReelsInMessages() {
            const reelIcons = document.querySelectorAll('svg[aria-label="Clip"]');

            reelIcons.forEach(svg => {
                const wrapper = svg.closest('div[role="button"]');
                if (wrapper) {
                    //Removing Reel link from Messages

                    wrapper.innerHTML = '';

                    const message = document.createElement('div');
                    message.textContent = "Reels blocked by AntiBrainRot";
                    message.style.padding = '8px';
                    message.style.fontSize = '14px';
                    message.style.color = 'white';
                    message.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                    message.style.borderRadius = '8px';
                    message.style.textAlign = 'center';

                    wrapper.appendChild(message);
                }
            });
        }


        function removeReelsInFeed() {
            // Select all buttons with the aria-label "Toggle audio"
            const audioButtons = document.querySelectorAll('button[aria-label="Toggle audio"]');

            // Iterate over each button
            audioButtons.forEach(button => {
                // Find the closest article element that contains the button
                const article = button.closest('article');

                // If the path element is found
                if (article) {
                    // Check if the overlay already exists
                    let existingOverlay = article.querySelector('.anti-brainrot-overlay');

                    // If no overlay exists, create a new one
                    if (!existingOverlay) {
                        // Create a new div to act as the overlay
                        const overlay = document.createElement('div');
                        overlay.classList.add('anti-brainrot-overlay'); // Add a class to easily identify the overlay
                        overlay.style.position = 'absolute';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.right = '0';
                        overlay.style.bottom = '0';
                        overlay.style.backgroundColor = 'rgb(0, 0, 0)';
                        overlay.style.color = 'white';
                        overlay.style.fontSize = '20px';
                        overlay.style.fontWeight = 'bold';
                        overlay.style.display = 'flex';
                        overlay.style.alignItems = 'center';
                        overlay.style.justifyContent = 'center';
                        overlay.style.zIndex = '9999';
                        overlay.style.borderRadius = '8px';

                        // Set the text message
                        overlay.textContent = 'Reel blocked by AntiBrainrot';

                        // Ensure the article is positioned relative so the overlay is on top
                        article.style.position = 'relative';

                        // Append the overlay to the article
                        article.appendChild(overlay);
                        article.style.overflow = 'hidden'; // Prevent overflow


                        //Overlayed a Reel with the 'AntiBrainrot' message
                    }
                }
            });
        }



        function runAll() {
            checkAndRedirect();
            removeReelsAndExploreButtons();
            removeReelsInMessages();
            removeReelsInFeed()
        }

        runAll();

        const observer = new MutationObserver(runAll);
        observer.observe(document, { subtree: true, childList: true });

        window.addEventListener("popstate", runAll);
    });
})();