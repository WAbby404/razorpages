// Card interaction functions

function handleCardClick(cardId, message) {
    console.log(`Card ${cardId} clicked!`);
    alert(message);
}

function logCardClick(cardId) {
    const timestamp = new Date().toLocaleString();
    console.log(`Card "${cardId}" clicked at ${timestamp}`);
    
    // You could send this to a server endpoint
    // fetch('/api/log', { method: 'POST', body: JSON.stringify({ cardId, timestamp }) });
}

function highlightCard(element) {
    element.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
    element.style.transform = 'translateY(-2px)';
}

function unhighlightCard(element) {
    element.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    element.style.transform = 'translateY(0)';
}

function toggleCardExpand(cardId) {
    const card = document.getElementById(cardId);
    const content = card.querySelector('.expandable-content');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
    } else {
        content.classList.add('hidden');
    }
}

// Initialize all cards on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cards JavaScript loaded and ready!');
    
    // Add smooth transitions to all cards
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
});
