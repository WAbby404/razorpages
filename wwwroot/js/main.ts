// Main entry point - imports all modules
// This file will be bundled into a single bundle.js

// Import all functionality
import "./cards";
import "./utils";

// You can also re-export if you want to make functions available globally
// Or just rely on the side effects (like DOMContentLoaded listeners)

console.log("Application initialized");
