 //grootify background script
(() => {

  let self = {
    //Get saved setting and initialize GUI items
    init() {
      chrome.storage.sync.get({
        activate: true,
        contextmenu: true,
        contextmenuActivate: true
      }, function(items) {
        self.updateContextMenu(items);
      });

      chrome.runtime.onInstalled.addListener(self.onInstalled);
      chrome.runtime.onMessage.addListener(self.onMessageReceived);
    },

    //On first install
    onInstalled(details) {
      if (details.reason === "install") {
        self.openOptions();
      }
    },

    //On message received
    onMessageReceived(message, sender, sendResponse) {

      //Option page saved
      if (message.type === "options") {
        self.updateContextMenu(message.items);
      } else if (message.type === "extensions") {
        self.openExtensions();
      }
      if (typeof(sendResponse) === "function")
        sendResponse();
    },

    //Update GUI
    updateContextMenu(items) {

   //   chrome.contextMenus.remove("grootifyOptions");

      if (items.contextmenu) {
        chrome.contextMenus.create({
          "id": "grootifyOptions",
          "title": chrome.i18n.getMessage("contextMenuOptions"),
          "contexts": ["page"],
          "onclick" () {
            self.openOptions();
          }
        });
      }
    },

    //Opens the options tab
    openOptions() {
      var optionsUrl = chrome.extension.getURL('grootify/options/options.html');
      self.openUrl(optionsUrl);
    },

    openUrl(url) {
      chrome.tabs.query({
        url
      }, function(tabs) {
        if (tabs.length) {
          chrome.tabs.update(tabs[0].id, {
            active: true
          });
          chrome.windows.update(tabs[0].windowId, {
            focused: true
          });
        } else {
          chrome.tabs.create({
            url
          });
        }
      });
    }
  };

  self.init();

})();
