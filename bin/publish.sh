#! /bin/sh
set -e

## Kein --delete wegen /cloud, /repo, ... !!!

npm run build
#rsync -avz --checksum build/ dennis@pingu-mobil.de:/srv/www/www.wpvs.de/
#rsync -avz --checksum build/ dennis@vhermes:/srv/www/www.wpvs.de/
rsync -avz --checksum -e 'ssh -p 4444' build/ dennis@wikiberd.de:/srv/www/www.wpvs.de/
