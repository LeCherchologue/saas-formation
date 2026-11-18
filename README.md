# saas-formation

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Documentation

Analyse et schémas draw.io : [docs/ANALYSE.md](docs/ANALYSE.md) · [docs/architecture.drawio](docs/architecture.drawio)

## Lancer avec l'API

Le front lit ses données dans l'API FastAPI `api-saas-formation` (dossier séparé).

1. Dans le dossier de l'API : `.venv\Scripts\python seed.py`, puis `.venv\Scripts\python -m uvicorn main:app --port 8000`
2. Ici : `npm run serve`

L'adresse de l'API se règle dans `.env.development` (`VUE_APP_API_URL`).

- **Particuliers** : création de compte sur `/connexion`, espace sur `/espace`.
- **Administrateur** : vérification des diplômes et revue des codes déposés sur `/admin`.
