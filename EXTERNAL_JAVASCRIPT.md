# Managing JavaScript Externally in Razor Pages

This document explains how to manage JavaScript in separate files rather than inline in your Razor components.

## Project Structure

```
razorpages/
├── Program.razor
└── wwwroot/              # Static files directory
    ├── js/
    │   ├── cards.js      # Card-specific functions
    │   └── utils.js      # Utility functions
    └── css/
        └── styles.css    # External CSS
```

## Key Steps

### 1. Enable Static Files in Program.razor

Add `app.UseStaticFiles();` in your Main method:

```csharp
public static void Main(string[] args)
{
    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddRazorComponents();
    var app = builder.Build();
    
    // Enable serving static files from wwwroot
    app.UseStaticFiles();
    
    // ... your routes
    app.Run();
}
```

### 2. Create External JavaScript Files

**wwwroot/js/cards.js:**
```javascript
function handleCardClick(cardId, message) {
    console.log(`Card ${cardId} clicked!`);
    alert(message);
}

function toggleCardExpand(cardId) {
    const card = document.getElementById(cardId);
    const content = card.querySelector('.expandable-content');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}
```

### 3. Reference JavaScript in RenderFragments

Create a layout that includes your JavaScript files:

```csharp
private static RenderFragment PageWithExternalAssets(string title, RenderFragment content)
{
    return @<html>
        <head>
            <title>@title</title>
            <link rel="stylesheet" href="/css/styles.css" />
        </head>
        <body>
            @content
            
            <!-- Load external JavaScript files at end of body -->
            <script src="/js/cards.js"></script>
            <script src="/js/utils.js"></script>
        </body>
    </html>;
}
```

### 4. Use External Functions in Your Components

```csharp
private static RenderFragment ExternalJSCard(string id, string title, string content)
{
    return @<div id="@id" class="interactive-card"
        onclick="handleCardClick('@id', 'Card clicked!')">
        <h2>@title</h2>
        <p>@content</p>
        <button onclick="event.stopPropagation(); logCardClick('@id')">
            Log Click
        </button>
    </div>;
}
```

## Benefits of External JavaScript

1. **Separation of Concerns**: Keep JavaScript logic separate from markup
2. **Reusability**: Share functions across multiple components
3. **Maintainability**: Easier to update and debug JavaScript code
4. **Caching**: Browsers can cache JavaScript files
5. **Organization**: Better project structure for larger applications
6. **Testing**: Easier to test JavaScript functions in isolation

## File Paths

All static files are served from the `wwwroot` directory:
- `/js/cards.js` maps to `wwwroot/js/cards.js`
- `/css/styles.css` maps to `wwwroot/css/styles.css`
- `/images/logo.png` would map to `wwwroot/images/logo.png`

## Example Routes

```csharp
app.MapGet("/external-js", () =>
{
    RenderFragment pageContent = @<div>
        <h1>Cards with External JavaScript</h1>
        @ExternalJSCard("card1", "Card 1", "Click me!")
        @ExternalJSCard("card2", "Card 2", "Or click me!")
    </div>;
    
    return Results.Razor(PageWithExternalAssets("External JS Demo", pageContent));
});
```

## Tips

1. **Load scripts at the end of `<body>`** for better page load performance
2. **Use `event.stopPropagation()`** on buttons inside clickable cards to prevent parent handlers from firing
3. **Check browser console** to verify JavaScript files are loading (F12 Developer Tools)
4. **Use classes for styling** from external CSS instead of inline styles
5. **Organize by feature**: Create separate JS files for different features (cards.js, forms.js, etc.)

## Accessing Files

The static files are automatically available at:
- http://localhost:5001/js/cards.js
- http://localhost:5001/js/utils.js
- http://localhost:5001/css/styles.css

You can test them directly in your browser to verify they're being served correctly.
