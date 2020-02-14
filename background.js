const config = {
    BOLCOM: 'https://www.bol.com/nl/s/?searchContext=books_all&searchtext=',
    BOEKWINKELTJES_SCHRIJVER: 'https://www.boekwinkeltjes.nl/su/?qs=',
    BOEKWINKELTJES_TITEL: 'https://www.boekwinkeltjes.nl/su/?qt=',
};

function getUrl(id) {
    switch (id) {
        case 2:
            return config.BOLCOM;
        case 3:
            return config.BOEKWINKELTJES_SCHRIJVER;
        case 4:
            return config.BOEKWINKELTJES_TITEL;
    }
}

function menuOnClick(info) {
    const {menuItemId, selectionText} = info;
    chrome.tabs.create({
        url: getUrl(menuItemId) + selectionText
    });
}

function buildMenu() {
    const parent = chrome.contextMenus.create(
        {
            title: `Zoek 'n boek "%s"`,
            contexts: ["selection"]
        });
    // ID 2
    chrome.contextMenus.create(
        {
            title: "bol.com",
            contexts:["selection"],
            parentId: parent,
            onclick: menuOnClick
        });
    // ID 3
    chrome.contextMenus.create(
        {
            title: "boekwinkeltjes schrijver",
            parentId: parent,
            contexts:["selection"],
            onclick: menuOnClick
        });
    // ID 4
    chrome.contextMenus.create(
        {
            title: "boekwinkeltjes titel",
            parentId: parent,
            contexts:["selection"],
            onclick: menuOnClick
        });
}

buildMenu();
