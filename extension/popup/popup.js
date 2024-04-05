chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];

    var domain = extractDomain(currentTab.url);

    if (domain === 'learn.canvas.net') {
        document.getElementById('div_found').style.display = "flex"
        document.getElementById('div_notfound').style.display = "none"
    } else {
        document.getElementById('div_found').style.display = "none"
        document.getElementById('div_notfound').style.display = "flex"
    }
});

function extractDomain(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    domain = domain.split(':')[0];
    return domain;
}

myElement = document.getElementById('info_ghostmode')
popup = document.getElementById('info_ghostmode_popup')
myElement.addEventListener('click', function() {
    console.log('btn clicked')
    popup.style.display = "flex";
});
popup.addEventListener('click', function() {
    console.log('popup clicked')
    popup.style.display = "none";
})