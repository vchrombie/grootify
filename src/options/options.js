(() => {
  let self = {

    //Bind events
    init() {
      
      //Header
      document.title = chrome.i18n.getMessage("optionsHeader");
      
      //Options
      self.restoreOptions();
      document.getElementById("chkActivate").addEventListener("change", self.saveOptions);

      //Options info ([LINK] not in use)
      let optionsInfo = chrome.i18n.getMessage("openOptionsInfo").replace("[LINK]", "chrome://extensions/");
      document.getElementById("optionsPage").innerHTML = optionsInfo;

      //Link
      let extensionsLink = document.getElementById("extensionsLink");
      //extensionsLink.addEventListener("click", self.linkExtensions);
      extensionsLink.textContent = "chrome://extensions/";

    },

    //Save to storage
    saveOptions() {
      var activate = document.getElementById("chkActivate").checked;
      var items = {
        activate,
      };
      chrome.storage.sync.set(items, function() {
        self.setStatus(activate);
        setTimeout(function() {}, 750);
      });

      //Notify bg.js
      chrome.runtime.sendMessage({
        type: "options",
        items
      });
    },

    //Load from storage
    restoreOptions() {
      chrome.storage.sync.get({
        activate: true,
        contextmenu: true,
      }, function(items) {
        document.getElementById("chkActivate").checked = items.activate;
        self.setStatus(items.activate);
      });
    },

    //Update page with status
    setStatus(active) {
      var url;
      if (active) {
        url = chrome.extension.getURL("src/assets/images/on.jpg");
      } else {
        url = chrome.extension.getURL("src/assets/images/off.jpg");
      }
      document.getElementById("imgStatus").src = url;
    },
  };

  document.addEventListener("DOMContentLoaded", self.init);

})();
