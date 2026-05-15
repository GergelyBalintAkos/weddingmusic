# Image compression script
# Resizes images to max 1920px width and saves as JPEG quality 82

Add-Type -AssemblyName System.Drawing

$maxWidth   = 1920
$jpegQuality = 82
$srcFolder  = "C:\Users\gerba\weddingmusic\images"

# Create JPEG encoder with quality parameter
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
  [System.Drawing.Imaging.Encoder]::Quality, [long]$jpegQuality)

$files = Get-ChildItem $srcFolder -File | Where-Object { $_.Extension -match '^\.jpe?g$' }

$totalBefore = 0
$totalAfter  = 0

foreach ($file in $files) {
  $sizeBefore = $file.Length
  $totalBefore += $sizeBefore

  # Load original
  $img = [System.Drawing.Image]::FromFile($file.FullName)

  # Calculate new dimensions
  if ($img.Width -gt $maxWidth) {
    $ratio = $maxWidth / $img.Width
    $newW  = $maxWidth
    $newH  = [int]($img.Height * $ratio)
  } else {
    $newW  = $img.Width
    $newH  = $img.Height
  }

  # Resize
  $resized = New-Object System.Drawing.Bitmap($newW, $newH)
  $graphics = [System.Drawing.Graphics]::FromImage($resized)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode   = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.DrawImage($img, 0, 0, $newW, $newH)

  # Dispose of original
  $img.Dispose()
  $graphics.Dispose()

  # Save to temp path (normalize to lowercase .jpg)
  $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name).ToLower()
  $tempPath = Join-Path $srcFolder "$baseName.tmp.jpg"
  $resized.Save($tempPath, $jpegCodec, $encoderParams)
  $resized.Dispose()

  # Replace original
  Remove-Item $file.FullName -Force
  $finalPath = Join-Path $srcFolder "$baseName.jpg"
  Move-Item $tempPath $finalPath -Force

  $sizeAfter = (Get-Item $finalPath).Length
  $totalAfter += $sizeAfter

  $savings = [math]::Round((1 - $sizeAfter/$sizeBefore) * 100, 1)
  $beforeMB = [math]::Round($sizeBefore/1MB, 2)
  $afterKB  = [math]::Round($sizeAfter/1KB, 0)
  Write-Host ("{0,-20} {1,8} MB -> {2,6} KB  (-{3}%)" -f $file.Name, $beforeMB, $afterKB, $savings)
}

Write-Host ""
Write-Host ("Total before: {0} MB" -f [math]::Round($totalBefore/1MB, 1))
Write-Host ("Total after:  {0} MB" -f [math]::Round($totalAfter/1MB, 1))
Write-Host ("Saved:        {0}%" -f [math]::Round((1 - $totalAfter/$totalBefore) * 100, 1))
