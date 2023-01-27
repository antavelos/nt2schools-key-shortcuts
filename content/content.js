
const getById = function(id) {
	return () => window.document.getElementById(id);
};

const getByClass = function(cls) {
	return () => window.document.getElementsByClassName(cls)[0];
};

const buttonGettersPerEventKey = {
	'a': getById('peekLT'),
	'b': getById('previous'),
	'n': getById('next'),
	'r': getByClass('mic'),
	'p': getById('playLT'),
	'Enter': getByClass('textButton'),
};

const handleEvent = function(event) {
    const buttonGetter = buttonGettersPerEventKey[event.key];	
	
	if (buttonGetter === undefined) {
        return;
	}
	
	buttonGetter().click();
}

const enableKeyShortcuts = function() {
	console.log('Enable keyup.')
    window.document.addEventListener('keyup', handleEvent);
}

const disableKeyShortcuts = function() {
	console.log('Disable keyup.')
    window.document.removeEventListener('keyup', handleEvent);
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  request.shortcuts === false ? disableKeyShortcuts() : enableKeyShortcuts();
	}
);