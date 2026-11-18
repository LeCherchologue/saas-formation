# Déploiement du front

**Adresse en ligne** : https://vps126762.serveur-vps.net/

## Architecture sur le VPS

Un seul domaine, servi en HTTPS par Apache (vhost `/etc/apache2/sites-available/saas-api.conf`) :

| Chemin | Servi par |
|--------|-----------|
| `/api/…`, `/docs`, `/redoc`, `/openapi.json` | API FastAPI (Docker, `127.0.0.1:8000`) |
| `/webhook/…`, `/webhook-test/…` | n8n (`127.0.0.1:5679`) |
| `/pgadmin` | pgAdmin (`127.0.0.1:5050`) |
| tout le reste | front Vue, fichiers dans `/var/www/saas-formation` |

- **Port 5804** : il sert toujours l'API seule.
- **Pas de CORS** : le front appelle l'API en relatif (`VUE_APP_API_URL=/api` dans `.env.production`), sur le même domaine.
- **Liens directs** : les routes du front (`/espace`, `/learn/...`) fonctionnent grâce à `FallbackResource /index.html`.

## Mettre à jour le site

```sh
DEPLOY_HOST=<utilisateur>@<serveur> sh scripts/deploy.sh
```

Le script fait quatre choses :
1. il compile le front ;
2. il envoie les fichiers sur le VPS ;
3. il bascule le site sur la nouvelle version ;
4. il garde les 3 versions précédentes dans `/var/www/saas-formation.prev-<date>`.

## Revenir en arrière

```sh
ssh <utilisateur>@<serveur>
mv /var/www/saas-formation /var/www/saas-formation.casse
mv /var/www/saas-formation.prev-<date> /var/www/saas-formation
```

La configuration Apache d'avant la mise en ligne du front est sauvegardée dans `/root/backups/apache/`. Pour la remettre :

```sh
cp /root/backups/apache/saas-api.conf.<date> /etc/apache2/sites-available/saas-api.conf
apache2ctl configtest && systemctl reload apache2
```
