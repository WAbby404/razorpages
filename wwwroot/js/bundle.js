"use strict";
(() => {
  // wwwroot/js/cards.ts
  document.addEventListener("DOMContentLoaded", function() {
    console.log("Cards JavaScript loaded and ready!");
    const cards = document.querySelectorAll(".interactive-card");
    cards.forEach((card) => {
      const cardElement = card;
      cardElement.style.transition = "all 0.3s ease";
    });
  });

  // wwwroot/js/utils.ts
  var style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
  document.head.appendChild(style);

  // wwwroot/js/main.ts
  console.log("Application initialized");
})();
