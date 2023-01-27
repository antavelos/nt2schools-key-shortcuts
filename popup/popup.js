(function() {
    const toggleEl = document.getElementById('toggle');
    
    chrome.storage.local.get("toggleChecked", function(data) {
        toggleEl.checked = data.toggleChecked || false;
    });
    
    document.getElementById('toggle').addEventListener('click', () => {
        chrome.storage.local.set({toggleChecked: toggleEl.checked});
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {shortcuts: toggleEl.checked}, (response) => {});
        });
    });
})();

        

