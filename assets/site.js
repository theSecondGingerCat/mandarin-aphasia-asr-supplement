(function () {
  "use strict";

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    return new Promise(function (resolve, reject) {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        if (!document.execCommand("copy")) {
          throw new Error("Copy command was not accepted.");
        }
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  document.querySelectorAll("[data-copy-target]").forEach(function (button) {
    var defaultLabel = button.textContent;

    button.addEventListener("click", function () {
      var target = document.getElementById(button.dataset.copyTarget);
      if (!target) {
        return;
      }

      copyText(target.textContent).then(
        function () {
          button.textContent = "Copied";
          window.setTimeout(function () {
            button.textContent = defaultLabel;
          }, 1600);
        },
        function () {
          button.textContent = "Select and copy manually";
          window.setTimeout(function () {
            button.textContent = defaultLabel;
          }, 2200);
        }
      );
    });
  });
})();
