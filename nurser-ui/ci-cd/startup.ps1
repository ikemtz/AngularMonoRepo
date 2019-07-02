Set-Location $PSScriptRoot;
$p = (Get-Location).Path;
$p = $p.Replace("\", "/");

docker run -v $p/:/devvol --rm -it ikemtz/azurecli-sqltools-dev