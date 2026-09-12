# Merge part 1 and part 2, validate uniqueness, and compile js/products.js

$p1Path = "C:\Users\USER\.gemini\antigravity\scratch\howell-ecommerce\tools\products_part1.json"
$p2Path = "C:\Users\USER\.gemini\antigravity\scratch\howell-ecommerce\tools\products_part2.json"
$targetJs = "C:\Users\USER\.gemini\antigravity\scratch\howell-ecommerce\js\products.js"

$p1 = Get-Content $p1Path -Raw -Encoding utf8 | ConvertFrom-Json
$p2 = Get-Content $p2Path -Raw -Encoding utf8 | ConvertFrom-Json

$all = @($p1) + @($p2)
Write-Host "Total products combined: $($all.Count)"

# Check duplicate IDs
$dups = $all | Group-Object id | Where-Object { $_.Count -gt 1 }
if ($dups) {
    Write-Host "ERROR: Duplicate IDs detected:"
    foreach ($d in $dups) {
        Write-Host "  - $($d.Name) ($($d.Count) times)"
    }
    exit 1
} else {
    Write-Host "All $($all.Count) product IDs are unique!"
}

# Check duplicate images
$imgDups = $all | Group-Object image | Where-Object { $_.Count -gt 1 }
if ($imgDups) {
    Write-Host "ERROR: Duplicate images detected:"
    foreach ($d in $imgDups) {
        Write-Host "  - $($d.Name) ($($d.Count) times)"
    }
    exit 1
} else {
    Write-Host "All $($all.Count) product images are unique!"
}

# Count per category
$catCounts = @{}
foreach ($item in $all) {
    if (-not $catCounts.ContainsKey($item.category)) {
        $catCounts[$item.category] = 0
    }
    $catCounts[$item.category]++
}

Write-Host "Category breakdown:"
foreach ($k in $catCounts.Keys) {
    Write-Host "  $k : $($catCounts[$k])"
}

# Now generate js/products.js
$sb = [System.Text.StringBuilder]::new()

[void]$sb.AppendLine("/**")
[void]$sb.AppendLine(" * Format numerical price to Indonesian Rupiah (Rp)")
[void]$sb.AppendLine(" */")
[void]$sb.AppendLine("function formatRupiah(amount) {")
[void]$sb.AppendLine("  if (!amount && amount !== 0) return 'Rp 0';")
[void]$sb.AppendLine("  return 'Rp ' + Math.round(amount).toLocaleString('id-ID');")
[void]$sb.AppendLine("}")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("/**")
[void]$sb.AppendLine(" * HOWELL Official Master Product Catalog Data Store")
[void]$sb.AppendLine(" * Brand: HOWELL (PT Howell Niaga Indonesia) - Est. 2009")
[void]$sb.AppendLine(" * Images: Fully mapped to assets/Produk/Produk Batch 1/ (137 Verified Products)")
[void]$sb.AppendLine(" */")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("const HOWELL_CATEGORIES = [")
[void]$sb.AppendLine("  { id: `"patch-cable`", name: `"Patch Cable & Networking`", icon: `"network`", count: $($catCounts['patch-cable']), desc: `"Cat6/Cat8 Patch Cables, Bulk Rolls, RJ45 Connectors & Keystone Adapters`" },")
[void]$sb.AppendLine("  { id: `"hdmi-video`", name: `"HDMI & Video Cables`", icon: `"video`", count: $($catCounts['hdmi-video']), desc: `"HDMI 4K, 8K Ultra Gold, 16K, Active Optic Fiber HDMI, Micro & Mini HDMI`" },")
[void]$sb.AppendLine("  { id: `"displayport`", name: `"DisplayPort 8K / 16K`", icon: `"monitor`", count: $($catCounts['displayport']), desc: `"DisplayPort 8K 60Hz, DP 16K, Active Fiber Optic DP & Mini DisplayPort`" },")
[void]$sb.AppendLine("  { id: `"dvi-vga`", name: `"DVI & VGA Cables`", icon: `"tv`", count: $($catCounts['dvi-vga']), desc: `"DVI-D Dual Link 24+1, DVI Optic Fiber, HDMI to DVI & Heavy-Duty VGA 3+6`" },")
[void]$sb.AppendLine("  { id: `"audio`", name: `"Audio & Instrument Cables`", icon: `"headphones`", count: $($catCounts['audio']), desc: `"3.5mm AUX, 2RCA, Dual 6.35mm, Mono TS Guitar, XLR Microphone & Optical Toslink`" },")
[void]$sb.AppendLine("  { id: `"power-cable`", name: `"Power & PDU Cables`", icon: `"plug`", count: $($catCounts['power-cable']), desc: `"AC Power C5, CPU C13, Server PDU C13-C14, Heavy-Duty C19-C20 & CEE 7/7 Schuko`" },")
[void]$sb.AppendLine("  { id: `"adapter`", name: `"Adapters & Converters`", icon: `"cpu`", count: $($catCounts['adapter']), desc: `"Multi-port Display Converters, Audio Adapters, OTG & Signal Converters`" },")
[void]$sb.AppendLine("  { id: `"computer-acc`", name: `"Chargers & Mobile Acc`", icon: `"smartphone`", count: $($catCounts['computer-acc']), desc: `"GaN Fast Chargers, Car Chargers, USB Hubs & Mobile Accessories`" },")
[void]$sb.AppendLine("  { id: `"earphone-tws`", name: `"Audio & Earphones`", icon: `"music`", count: $($catCounts['earphone-tws']), desc: `"Wireless TWS, Noise-Cancelling Earbuds & Studio In-Ear Monitors`" }")
[void]$sb.AppendLine("];")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("const HOWELL_PRODUCTS = [")

for ($i = 0; $i -lt $all.Count; $i++) {
    $item = $all[$i]
    $isLast = ($i -eq ($all.Count - 1))
    
    [void]$sb.AppendLine("  {")
    [void]$sb.AppendLine("    id: `"$($item.id)`",")
    [void]$sb.AppendLine("    price: $($item.price),")
    
    # Check if variantPrices
    if ($item.variantPrices) {
        $vpList = @()
        foreach ($prop in $item.variantPrices.PSObject.Properties) {
            $vpList += "`"$($prop.Name)`": $($prop.Value)"
        }
        [void]$sb.AppendLine("    variantPrices: { $($vpList -join ', ') },")
    }

    $escapedName = $item.name.Replace('"', '\"')
    [void]$sb.AppendLine("    name: `"$escapedName`",")
    [void]$sb.AppendLine("    category: `"$($item.category)`",")
    [void]$sb.AppendLine("    categoryName: `"$($item.categoryName)`",")
    [void]$sb.AppendLine("    rating: $($item.rating),")
    [void]$sb.AppendLine("    reviewsCount: $($item.reviewsCount),")
    [void]$sb.AppendLine("    badge: `"$($item.badge)`",")
    [void]$sb.AppendLine("    sku: `"$($item.sku)`",")
    
    $escapedTag = $item.tagline.Replace('"', '\"')
    [void]$sb.AppendLine("    tagline: `"$escapedTag`",")
    
    $escapedSum = $item.summary.Replace('"', '\"')
    [void]$sb.AppendLine("    summary: `"$escapedSum`",")

    # Variants
    $lensList = @()
    if ($item.variants.lengths) {
        foreach ($l in $item.variants.lengths) { $lensList += "`"$l`"" }
    }
    $colsList = @()
    if ($item.variants.colors) {
        foreach ($c in $item.variants.colors) { $colsList += "`"$c`"" }
    }
    [void]$sb.AppendLine("    variants: { lengths: [$($lensList -join ', ')], colors: [$($colsList -join ', ')] },")

    # Specs
    $specsList = @()
    if ($item.specs) {
        foreach ($prop in $item.specs.PSObject.Properties) {
            $valEsc = $prop.Value.ToString().Replace('"', '\"')
            $specsList += "`"$($prop.Name)`": `"$valEsc`""
        }
    }
    [void]$sb.AppendLine("    specs: { $($specsList -join ', ') },")

    $descEsc = $item.description.Replace('"', '\"')
    [void]$sb.AppendLine("    description: `"$descEsc`",")
    
    [void]$sb.AppendLine("    image: `"$($item.image)`"")
    
    if ($isLast) {
        [void]$sb.AppendLine("  }")
    } else {
        [void]$sb.AppendLine("  },")
    }
}

[void]$sb.AppendLine("];")

[System.IO.File]::WriteAllText($targetJs, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "Successfully generated $targetJs with $($all.Count) products!"
