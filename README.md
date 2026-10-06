
## Instalación y uso

Requisitos: Node.js 18 o superior.

```bash
npm install          # instala dependencias (incluye el binario de Cypress)
npm run serve        # desarrollo en http://localhost:8080
npm run build        # build de producción en /dist
npm run lint         # revisión de estilo
```

### Datos / API

Por defecto, Axios consulta `GET /productos.json` (archivo `public/productos.json`), así que la app funciona sin configurar nada.

Para usar una API REST simulada con **json-server** (opcional):

```bash
cp .env.example .env.development.local   # apunta a http://localhost:3000/productos
npm run api                              # terminal 1: levanta json-server con db.json
npm run serve                            # terminal 2
```

Variables de entorno: `VUE_APP_API_URL` (URL base) y `VUE_APP_PRODUCTS_PATH` (ruta del recurso).

### Pruebas

```bash
npm run test:unit            # pruebas unitarias (Jest + Vue Test Utils)
npm run test:unit:coverage   # con reporte de cobertura (docs/evidencias/coverage)
npm run test:e2e             # levanta la app y ejecuta Cypress en modo headless
npm run cy:open              # Cypress en modo interactivo (con la app ya levantada)
```