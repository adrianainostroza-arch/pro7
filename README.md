# Vue Product Showcase

Catálogo interactivo de productos (SPA) para el Departamento de E-commerce.
Proyecto del **Módulo 7 – Desarrollo de aplicaciones front-end con framework Vue** (Alkemy).

- Consume los productos desde una **API REST** con **Axios**
- Navegación con **Vue Router 4** (catálogo, detalle por producto `/producto/:id` y página 404)
- Estado global centralizado con **Vuex** (módulos `productos`, `filtros`, `favoritos`)
- Interfaz con **Vuetify 3**: responsive, tema claro/oscuro y accesible
- Pruebas unitarias con **Jest + Vue Test Utils** y prueba e2e con **Cypress**

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

## Estructura del proyecto

```
├── public/productos.json          # "API" estática por defecto
├── db.json                        # datos para json-server (opcional)
├── src/
│   ├── App.vue                    # layout raíz
│   ├── main.js                    # crea la app y registra Vuex + Router + Vuetify
│   ├── router/index.js            # rutas: /, /producto/:id y 404
│   ├── views/
│   │   ├── CatalogoView.vue       # ruta "/"
│   │   ├── ProductoDetalleView.vue# ruta "/producto/:id"
│   │   └── NotFoundView.vue       # cualquier otra ruta
│   ├── components/
│   │   ├── AppHeader.vue          # barra superior, contador de favoritos, cambio de tema
│   │   ├── AppFooter.vue
│   │   ├── ProductList.vue        # estados loading / error / empty + grilla
│   │   ├── ProductCard.vue        # tarjeta presentacional de un producto
│   │   └── ProductFilters.vue     # búsqueda, categorías y "solo favoritos"
│   ├── services/productosService.js  # cliente Axios
│   ├── store/
│   │   ├── index.js
│   │   └── modules/{productos,filtros,favoritos}.js
│   ├── composables/useTema.js     # tema claro/oscuro
│   └── plugins/vuetify.js         # configuración de Vuetify y temas
├── tests/unit/                    # Jest + Vue Test Utils
├── cypress/e2e/                   # prueba end-to-end
├── docs/evidencias/               # salida de las pruebas ejecutadas
└── ejemplos-clase/                # ejercicios originales de clase (Axios / fetch / JSON)
```

## Cumplimiento de la consigna

| Lección | Requerimiento | Dónde está |
|---|---|---|
| 1 | Proyecto con Vue CLI | `@vue/cli-service` 5 (`vue.config.js`, `babel.config.js`) |
| 1 | `<ProductCard>` | `src/components/ProductCard.vue` |
| 1 | Al menos un ciclo de vida | `onMounted(cargar)` en `ProductList.vue` |
| 1 | Estructura `<App>`, `<Header>`, `<Footer>`, `<ProductList>` | `App.vue`, `AppHeader.vue`, `AppFooter.vue`, `ProductList.vue` |
| 2 | Axios + API (JSON estático o json-server) | `services/productosService.js` |
| 2 | Productos dinámicos en `<ProductList>` | `ProductList.vue` |
| 2 | Estados loading / error / empty | `ProductList.vue` (además: "sin resultados" y botón *Reintentar*) |
| 2 | Filtro por categoría | `ProductFilters.vue` |
| 2 | Ver detalles individuales (objetivo general del PDF) | `router/index.js` + `views/ProductoDetalleView.vue` |
| 3 | Vuex con módulos productos, filtros, favoritos | `src/store/modules/` |
| 3 | API movida a acciones Vuex | `productos/fetchProductos` |
| 3 | Getters para productos filtrados | `productos/productosFiltrados` |
| 3 | Componentes conectados al store | `ProductList`, `ProductFilters`, `AppHeader` |
| 4 | 2 pruebas unitarias (render de `<ProductCard>` y error de API) | `tests/unit/ProductCard.spec.js`, `tests/unit/ProductList.spec.js` |
| 4 | 1 prueba e2e con Cypress (filtrar y ver resultados) | `cypress/e2e/filtrar-productos.cy.js` (y `detalle-producto.cy.js` para las rutas) |
| 5 | Librería UI aplicada | Vuetify 3 |
| 5 | Responsive y tema claro/oscuro | grilla `v-col` por breakpoints y `useTema.js` |
| 5 | (Opcional) Nuxt / Quasar | Se evaluó y no se migró (ver justificación) |

> Los componentes `<Header>` y `<Footer>` se llaman `AppHeader` y `AppFooter` porque Vue recomienda nombres de varias palabras y `header` / `footer` son etiquetas HTML nativas.

## Decisiones técnicas

- **Vue CLI + Vue 3 (`<script setup>`)**: es lo que pide la consigna y lo que se usó en clase. `<script setup>` reduce código repetitivo y facilita las pruebas.
- **Vuex 4 con módulos namespaced**: separa responsabilidades (datos, filtros, favoritos). El getter `productosFiltrados` lee el estado de `filtros` y `favoritos`, por lo que la lista se recalcula sola cuando cambia cualquiera de ellos. El store se crea con una fábrica (`crearStore`) para tener un estado limpio en cada test.
- **Vue Router 4 (modo history)**: el detalle de cada producto tiene su propia URL (`/producto/:id`), que se puede compartir y funciona con los botones atrás/adelante. Si se entra directo a esa URL, la vista pide los datos al store. El router se crea con una fábrica (`crearRouter`) para usar un historial en memoria en los tests. Al desplegar en un servidor estático hay que redirigir todas las rutas a `index.html` (en desarrollo, Vue CLI ya lo hace).
- **Componentes presentacionales vs. contenedores**: `ProductCard` solo recibe props y emite eventos (fácil de probar y reutilizar); `ProductList` y `ProductFilters` son los que hablan con Vuex.
- **Axios aislado en un servicio**: la URL se configura por variables de entorno y los tests lo reemplazan con `jest.mock`, sin depender de la red.
- **Vuetify 3**: es la librería sugerida en la consigna, trae accesibilidad y temas integrados. Se usa `webpack-plugin-vuetify` para importar solo los componentes utilizados.
- **Accesibilidad**: landmarks semánticos (`header`, `main`, `footer`), `aria-label` en botones de ícono, `aria-pressed` en favoritos, `role="status"` / `aria-live` en cargas y contador de resultados, y contraste de color provisto por los temas de Vuetify.
- **Persistencia**: los favoritos y el tema se guardan en `localStorage` (con manejo de errores si no está disponible).
- **¿Por qué no se migró a Nuxt ni a Quasar?** El catálogo es una SPA sin necesidad de SEO ni renderizado en servidor, por lo que Nuxt aportaría complejidad sin beneficio inmediato. Quasar sería la opción si se quisiera publicar como app móvil o de escritorio (Capacitor / Electron), algo que la consigna solo deja como posibilidad futura. La arquitectura (componentes + Vuex + servicio) se puede portar a cualquiera de los dos sin reescribir la lógica.
- **Datos**: se amplió `productos.json` con una `descripcion` y se reemplazaron las categorías `A/B/C` por nombres con significado (Computación, Móviles, Periféricos, Oficina, Almacenamiento).

## Evidencias de pruebas

- Salida de Jest y cobertura: [`docs/evidencias/jest-resultados.txt`](docs/evidencias/jest-resultados.txt) (22 pruebas en 5 suites).
- Cypress: ejecutar `npm run test:e2e`; las capturas ante fallos se guardan en `docs/evidencias/cypress-screenshots`.

## Mejoras futuras

Paginación u orden por precio, carrito de compras y migración a Quasar para empaquetar como app móvil.
