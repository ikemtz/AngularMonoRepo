Set-Location $PSScriptRoot;
$p = (Get-Location).Path;
$p = $p.Replace("\", "/");

docker build --rm -f "Dockerfile" -t ikemtz/ng-nurser:latest .
docker run -v $p/nginx:/etc/nginx/conf.d --rm -itp 4200:80/tcp ikemtz/ng-nurser:latest
