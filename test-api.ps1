# Test API Authentication
# Run this script to test the JWT API endpoints

Write-Host "Testing API Authentication..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:5001"

# Test 1: Get JWT Token
Write-Host "1. Getting JWT token..." -ForegroundColor Yellow
try {
    $tokenResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/token" `
        -Method POST `
        -ContentType "application/json" `
        -Body '{"username":"demo","password":"password123"}'
    
    $token = $tokenResponse.token
    Write-Host "✓ Token received!" -ForegroundColor Green
    Write-Host "  Username: $($tokenResponse.username)" -ForegroundColor Gray
    Write-Host "  Email: $($tokenResponse.email)" -ForegroundColor Gray
    Write-Host "  Expires in: $($tokenResponse.expiresIn) seconds" -ForegroundColor Gray
    Write-Host "  Token: $($token.Substring(0, 50))..." -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to get token" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

# Test 2: Get Products (with token)
Write-Host "2. Getting products list..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "$baseUrl/api/products" `
        -Headers @{ Authorization = "Bearer $token" }
    
    Write-Host "✓ Products retrieved: $($products.Count) items" -ForegroundColor Green
    $products | Select-Object id, name, price | Format-Table
} catch {
    Write-Host "✗ Failed to get products" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Test 3: Get Product by ID
Write-Host "3. Getting product by ID..." -ForegroundColor Yellow
try {
    $product = Invoke-RestMethod -Uri "$baseUrl/api/products/1" `
        -Headers @{ Authorization = "Bearer $token" }
    
    Write-Host "✓ Product retrieved!" -ForegroundColor Green
    Write-Host "  ID: $($product.id)" -ForegroundColor Gray
    Write-Host "  Name: $($product.name)" -ForegroundColor Gray
    Write-Host "  Price: `$$($product.price)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to get product" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Test 4: Create Product
Write-Host "4. Creating new product..." -ForegroundColor Yellow
try {
    $newProduct = @{
        name = "API Test Product"
        description = "Created via API at $(Get-Date)"
        price = 99.99
    } | ConvertTo-Json

    $created = Invoke-RestMethod -Uri "$baseUrl/api/products" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{ Authorization = "Bearer $token" } `
        -Body $newProduct
    
    Write-Host "✓ Product created!" -ForegroundColor Green
    Write-Host "  ID: $($created.id)" -ForegroundColor Gray
    Write-Host "  Name: $($created.name)" -ForegroundColor Gray
    Write-Host "  Price: `$$($created.price)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to create product" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Test 5: Get Current User
Write-Host "5. Getting current user info..." -ForegroundColor Yellow
try {
    $userInfo = Invoke-RestMethod -Uri "$baseUrl/api/user/me" `
        -Headers @{ Authorization = "Bearer $token" }
    
    Write-Host "✓ User info retrieved!" -ForegroundColor Green
    Write-Host "  Username: $($userInfo.username)" -ForegroundColor Gray
    Write-Host "  Authenticated: $($userInfo.authenticated)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "✗ Failed to get user info" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

# Test 6: Test without token (should fail)
Write-Host "6. Testing without token (should fail)..." -ForegroundColor Yellow
try {
    $products = Invoke-RestMethod -Uri "$baseUrl/api/products"
    Write-Host "✗ Unexpected: Request succeeded without token!" -ForegroundColor Red
} catch {
    Write-Host "✓ Correctly rejected unauthorized request" -ForegroundColor Green
    Write-Host ""
}

Write-Host "All tests completed!" -ForegroundColor Cyan
