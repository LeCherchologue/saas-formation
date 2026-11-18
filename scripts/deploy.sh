#!/bin/sh
# Déploie le front sur le VPS (servi par Apache, voir docs/DEPLOIEMENT.md).
# Usage : DEPLOY_HOST=utilisateur@serveur sh scripts/deploy.sh
set -e
HOST="${DEPLOY_HOST:?Definir DEPLOY_HOST, ex. DEPLOY_HOST=root@mon-serveur sh scripts/deploy.sh}"
DEST="/var/www/saas-formation"

npx vue-cli-service build
# l'ancienne version est gardée dans $DEST.prev-<date> pour revenir en arrière
tar -C dist -czf - . | ssh "$HOST" "set -e
  rm -rf $DEST.new && mkdir -p $DEST.new
  tar --no-same-owner -xzf - -C $DEST.new
  if [ -d $DEST ]; then mv $DEST $DEST.prev-\$(date +%Y%m%d%H%M%S); fi
  mv $DEST.new $DEST
  chown -R www-data:www-data $DEST
  ls -dt $DEST.prev-* 2>/dev/null | tail -n +4 | xargs -r rm -rf   # garde les 3 dernières versions
"
echo "Déployé : https://vps126762.serveur-vps.net/"
