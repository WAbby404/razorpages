// Utility functions for various UI interactions

type NotificationType = "info" | "success" | "error";

interface UIHelpersInterface {
  showNotification(message: string, type?: NotificationType): void;
  animateClick(element: HTMLElement): void;
  fetchData<T = any>(url: string): Promise<T | null>;
}

const UIHelpers: UIHelpersInterface = {
  showNotification: function (
    message: string,
    type: NotificationType = "info"
  ): void {
    // Create a simple notification
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background-color: ${
              type === "success"
                ? "#28a745"
                : type === "error"
                ? "#dc3545"
                : "#007bff"
            };
            color: white;
            border-radius: 4px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  },

  animateClick: function (element: HTMLElement): void {
    element.style.transform = "scale(0.95)";
    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 100);
  },

  fetchData: async function <T = any>(url: string): Promise<T | null> {
    try {
      const response = await fetch(url);
      return (await response.json()) as T;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },
};

// Add CSS animations
const style = document.createElement("style");
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
