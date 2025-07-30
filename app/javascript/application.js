// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";
import "controllers";

// Add confirmation for delete links
document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript loaded");
  
  document.addEventListener("click", function (event) {
    console.log("Click event:", event.target);
    
    if (event.target.matches("a[data-confirm]")) {
      console.log("Found link with data-confirm");
      const message = event.target.getAttribute("data-confirm");
      if (!confirm(message)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      
      // Handle DELETE method manually
      if (event.target.getAttribute("data-method") === "delete") {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        const form = document.createElement("form");
        form.method = "POST";
        form.action = url;
        
        const methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        methodInput.value = "DELETE";
        
        const csrfInput = document.createElement("input");
        csrfInput.type = "hidden";
        csrfInput.name = "authenticity_token";
        csrfInput.value = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
        
        form.appendChild(methodInput);
        form.appendChild(csrfInput);
        document.body.appendChild(form);
        form.submit();
      }
    }
  });
});
