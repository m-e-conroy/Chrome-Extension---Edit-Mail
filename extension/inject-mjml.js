(function () {
  if (window.CKEDITOR && Object.keys(CKEDITOR.instances).length > 0) {
    var editorName = Object.keys(CKEDITOR.instances)[0];
    var editor = CKEDITOR.instances[editorName];

    // Only inject if the button doesn't already exist
    if (!editor.ui.instances["MJMLButton"]) {
      editor.addCommand("openMJMLEditor", {
        exec: function (edt) {
          if (window.createMJMLModal) {
            window.createMJMLModal();
          } else {
            // NEW ROBUST URL CHECK
            // First check the current frame, then check the top-level document
            const mjmlUrl =
              document.documentElement.getAttribute("data-mjml-url") ||
              window.top.document.documentElement.getAttribute("data-mjml-url");

            if (!mjmlUrl) {
              console.error(
                "[MJML] Extension URL not found on document or top document."
              );
              return;
            }

            var script = document.createElement("script");
            script.src = mjmlUrl;
            script.onload = function () {
              window.createMJMLModal();
            };
            document.body.appendChild(script);
          }
        },
      });

      editor.ui.add("MJMLButton", CKEDITOR.UI_BUTTON, {
        label: "MJ",
        command: "openMJMLEditor",
        icon: "",
      });

      // Render and style the button
      var output = [];
      var buttonUI = editor.ui.create("MJMLButton");
      buttonUI.render(editor, output);
      var htmlString = output.join("");

      var toolbarRow = document.querySelector(".cke_toolbar");
      if (toolbarRow) {
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlString;
        var buttonElement = tempDiv.firstChild;

        // Custom orange styling
        buttonElement.style.background = "#e56a54";
        buttonElement.style.color = "#fff";
        buttonElement.style.fontWeight = "bold";
        buttonElement.style.fontFamily = "Segoe UI, Arial, sans-serif";
        buttonElement.style.fontSize = "14px";
        buttonElement.style.borderRadius = "4px";
        buttonElement.style.padding = "2px 10px";
        buttonElement.innerText = "MJ";

        toolbarRow.appendChild(buttonElement);
        editor.ui.instances["MJMLButton"] = buttonUI;
        console.log("MJML Button injected successfully.");
      } else {
        console.error("CKEditor toolbar not found.");
      }
    }
  }
})();

window.addEventListener("mjml-insert-to-ckeditor", function (e) {
  if (window.CKEDITOR && Object.keys(CKEDITOR.instances).length > 0) {
    var editorName = Object.keys(CKEDITOR.instances)[0];
    var editor = CKEDITOR.instances[editorName];
    // This inserts the rendered HTML into the current CKEditor instance
    editor.setData(e.detail.html);
  }
});
