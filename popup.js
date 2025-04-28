// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['blockInstagram', 'blockYouTube'], (data) => {
        document.getElementById('toggleInstagram').checked = data.blockInstagram ?? true;
        document.getElementById('toggleYouTube').checked = data.blockYouTube ?? true;
    });

    refreshMessage(false);
});

// Save settings when toggled
document.getElementById('toggleInstagram').addEventListener('change', (e) => {
    chrome.storage.sync.set({ blockInstagram: e.target.checked });
    refreshMessage(true);
});

document.getElementById('toggleYouTube').addEventListener('change', (e) => {
    chrome.storage.sync.set({ blockYouTube: e.target.checked });
    refreshMessage(true);
});

function refreshMessage(isEnabled) {
    const message = document.getElementById('refresh-msg');

    if (isEnabled) {
        message.textContent = "Settings saved! Refresh the page to apply changes.";
        message.style.display = 'block';

    }
    else {
        message.textContent = "";
        message.style.display = 'none';

    }

}
