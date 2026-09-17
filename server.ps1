$port = 5500
$rootFolder = $PSScriptRoot
$distFolder = Join-Path $rootFolder "dist"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
} catch {
    $port = 5501
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   AuraFit iOS - Running on http://localhost:$port/       " -ForegroundColor Green
Write-Host "   Do not close this window while using the app           " -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan

Start-Process "http://localhost:$port/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relPath = $request.Url.LocalPath
        if ($relPath.StartsWith("/")) {
            $relPath = $relPath.Substring(1)
        }
        if ([string]::IsNullOrEmpty($relPath)) {
            $relPath = "index.html"
        }

        # Check in dist folder first, then root folder
        $filePath = Join-Path $distFolder $relPath
        if (-not (Test-Path -Path $filePath -PathType Leaf)) {
            $filePath = Join-Path $rootFolder $relPath
        }
        if (-not (Test-Path -Path $filePath -PathType Leaf)) {
            $filePath = Join-Path $rootFolder "AuraFit_iOS.html"
        }

        if (Test-Path -Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "text/html"
            if ($ext -eq ".js") { $mime = "application/javascript" }
            elseif ($ext -eq ".css") { $mime = "text/css" }
            elseif ($ext -eq ".png") { $mime = "image/png" }
            elseif ($ext -eq ".svg") { $mime = "image/svg+xml" }
            elseif ($ext -eq ".json") { $mime = "application/json" }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = "$mime; charset=utf-8"
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.OutputStream.Close()
    } catch {
        # ignore client disconnects
    }
}