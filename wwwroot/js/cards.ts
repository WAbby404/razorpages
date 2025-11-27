// Card interaction functions

function handleCardClick(cardId: string, message: string): void {
  console.log(`Card ${cardId} clicked!`);
  alert(message);
}

function logCardClick(cardId: string): void {
  const timestamp = new Date().toLocaleString();
  console.log(`Card "${cardId}" clicked at ${timestamp}`);

  // You could send this to a server endpoint
  // fetch('/api/log', { method: 'POST', body: JSON.stringify({ cardId, timestamp }) });
}

function highlightCard(element: HTMLElement): void {
  element.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
  element.style.transform = "translateY(-2px)";
}

function unhighlightCard(element: HTMLElement): void {
  element.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  element.style.transform = "translateY(0)";
}

function toggleCardExpand(cardId: string): void {
  const card = document.getElementById(cardId);
  if (!card) return;

  const content = card.querySelector(".expandable-content") as HTMLElement;
  if (!content) return;

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
  } else {
    content.classList.add("hidden");
  }
}

// Initialize all cards on page load
document.addEventListener("DOMContentLoaded", function () {
  console.log("Cards JavaScript loaded and ready!");

  // Add smooth transitions to all cards
  const cards = document.querySelectorAll(".interactive-card");
  cards.forEach((card) => {
    const cardElement = card as HTMLElement;
    cardElement.style.transition = "all 0.3s ease";
  });
});
