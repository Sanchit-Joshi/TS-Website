# Define the root directory
$rootDir = "transformers-ecommerce"

# Create the root directory if it doesn't exist
if (-not (Test-Path -Path $rootDir)) {
    New-Item -ItemType Directory -Path $rootDir
}

# Function to create a file with optional content
function Create-File {
    param (
        [string]$filePath,
        [string]$content = ""
    )
    if (-not (Test-Path -Path $filePath)) {
        New-Item -ItemType File -Path $filePath -Force
        if ($content) {
            Set-Content -Path $filePath -Value $content
        }
        Write-Host "Created: $filePath"
    } else {
        Write-Host "Skipped (already exists): $filePath"
    }
}

# Function to create a directory if it doesn't exist
function Create-Directory {
    param (
        [string]$dirPath
    )
    if (-not (Test-Path -Path $dirPath)) {
        New-Item -ItemType Directory -Path $dirPath
        Write-Host "Created: $dirPath"
    } else {
        Write-Host "Skipped (already exists): $dirPath"
    }
}

# Frontend structure
$frontendDir = "$rootDir/frontend"
Create-Directory -dirPath $frontendDir

# Frontend/Public
$publicDir = "$frontendDir/public"
Create-Directory -dirPath $publicDir
Create-Directory -dirPath "$publicDir/images"
Create-Directory -dirPath "$publicDir/icons"
Create-File -filePath "$publicDir/favicon.ico"

# Frontend/Src
$srcDir = "$frontendDir/src"
Create-Directory -dirPath $srcDir

# Frontend/Src/Components
$componentsDir = "$srcDir/components"
Create-Directory -dirPath $componentsDir
Create-File -filePath "$componentsDir/Header.jsx"
Create-File -filePath "$componentsDir/Footer.jsx"
Create-File -filePath "$componentsDir/ProductCard.jsx"
Create-File -filePath "$componentsDir/CartItem.jsx"
Create-File -filePath "$componentsDir/AuthForm.jsx"

# Frontend/Src/Pages
$pagesDir = "$srcDir/pages"
Create-Directory -dirPath $pagesDir
Create-File -filePath "$pagesDir/index.js"
Create-File -filePath "$pagesDir/products.js"
Create-File -filePath "$pagesDir/product/[id].js"
Create-File -filePath "$pagesDir/cart.js"
Create-File -filePath "$pagesDir/checkout.js"
Create-File -filePath "$pagesDir/about.js"
Create-File -filePath "$pagesDir/contact.js"
Create-File -filePath "$pagesDir/gallery.js"
Create-File -filePath "$pagesDir/dashboard.js"

# Frontend/Src/Pages/Admin
$adminDir = "$pagesDir/admin"
Create-Directory -dirPath $adminDir
Create-File -filePath "$adminDir/index.js"
Create-File -filePath "$adminDir/products.js"
Create-File -filePath "$adminDir/orders.js"

# Frontend/Src/Styles
$stylesDir = "$srcDir/styles"
Create-Directory -dirPath $stylesDir
Create-File -filePath "$stylesDir/globals.css"

# Frontend/Src/Context
$contextDir = "$srcDir/context"
Create-Directory -dirPath $contextDir
Create-File -filePath "$contextDir/CartContext.js"
Create-File -filePath "$contextDir/AuthContext.js"

# Frontend/Src/Api
$apiDir = "$srcDir/api"
Create-Directory -dirPath $apiDir
Create-File -filePath "$apiDir/auth.js"
Create-File -filePath "$apiDir/products.js"
Create-File -filePath "$apiDir/orders.js"

# Frontend/Src/Utils
$utilsDir = "$srcDir/utils"
Create-Directory -dirPath $utilsDir
Create-File -filePath "$utilsDir/api.js"
Create-File -filePath "$utilsDir/auth.js"

# Frontend Root Files
Create-File -filePath "$frontendDir/tailwind.config.js"
Create-File -filePath "$frontendDir/postcss.config.js"
Create-File -filePath "$frontendDir/package.json"

# Backend structure
$backendDir = "$rootDir/backend"
Create-Directory -dirPath $backendDir

# Backend/Config
$configDir = "$backendDir/config"
Create-Directory -dirPath $configDir
Create-File -filePath "$configDir/db.js"

# Backend/Models
$modelsDir = "$backendDir/models"
Create-Directory -dirPath $modelsDir
Create-File -filePath "$modelsDir/User.js"
Create-File -filePath "$modelsDir/Product.js"
Create-File -filePath "$modelsDir/Order.js"

# Backend/Routes
$routesDir = "$backendDir/routes"
Create-Directory -dirPath $routesDir
Create-File -filePath "$routesDir/auth.js"
Create-File -filePath "$routesDir/products.js"
Create-File -filePath "$routesDir/orders.js"
Create-File -filePath "$routesDir/users.js"

# Backend/Controllers
$controllersDir = "$backendDir/controllers"
Create-Directory -dirPath $controllersDir
Create-File -filePath "$controllersDir/authController.js"
Create-File -filePath "$controllersDir/productController.js"
Create-File -filePath "$controllersDir/orderController.js"

# Backend/Middleware
$middlewareDir = "$backendDir/middleware"
Create-Directory -dirPath $middlewareDir
Create-File -filePath "$middlewareDir/auth.js"
Create-File -filePath "$middlewareDir/errorHandler.js"

# Backend/Utils
$backendUtilsDir = "$backendDir/utils"
Create-Directory -dirPath $backendUtilsDir
Create-File -filePath "$backendUtilsDir/email.js"
Create-File -filePath "$backendUtilsDir/fileUpload.js"

# Backend Root Files
Create-File -filePath "$backendDir/app.js"
Create-File -filePath "$backendDir/server.js"
Create-File -filePath "$backendDir/package.json"

# Root Files
Create-File -filePath "$rootDir/.env"
Create-File -filePath "$rootDir/.gitignore"
Create-File -filePath "$rootDir/README.md"

Write-Host "Folder structure and files creation completed!"