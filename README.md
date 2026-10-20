# Mente Sana Joven — Hackathon Villavicencio 2026

Plataforma web informativa y directorio estructurado de rutas de apoyo institucional para el bienestar emocional de los jovenes. Desarrollada como prototipo funcional (prototipo integrado y validado en entorno controlado) para el reto **Mente Sana Joven: tecnologia para el bienestar emocional y conexion con rutas de apoyo**.

---

## 1. Proposito y alcance del proyecto

**Mente Sana Joven** facilita el acceso a informacion general validada sobre autocuidado cotidiano y acerca a los jovenes a recursos de orientacion institucional sin exigir el envio de experiencias personales, cuestionarios clinicos ni datos sensibles.

El proyecto se diseno para demostrar:
- Una arquitectura separada en tres capas reales: **Next.js (React)** en el frontend, **Express.js (Node.js)** en el backend y **PostgreSQL** en la capa de persistencia.
- El cumplimiento estricto de las salvaguardas eticas exigidas en temas de bienestar emocional juvenil.
- Un mecanismo verificable de control de fuentes donde ningun recurso con estado `pendiente_verificacion` se publica como ruta activa confirmada.

---

## 2. Arquitectura y estructura del proyecto

```text
Hackaton/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── base_datos/
│   ├── esquema.sql
│   └── datos_semilla.sql
├── backend/
│   ├── .env.example
│   ├── package.json
│   ├── aplicacion.js
│   ├── servidor.js
│   ├── configuracion/
│   │   ├── entorno.js
│   │   └── baseDatos.js
│   ├── validaciones/
│   │   └── validarSolicitud.js
│   ├── consultas/
│   │   ├── consultasCategorias.js
│   │   ├── consultasRecursos.js
│   │   └── consultasContenidos.js
│   ├── controladores/
│   │   ├── controladorSalud.js
│   │   ├── controladorCategorias.js
│   │   ├── controladorRecursos.js
│   │   └── controladorContenidos.js
│   ├── rutas/
│   │   ├── rutasSalud.js
│   │   ├── rutasCategorias.js
│   │   ├── rutasRecursos.js
│   │   └── rutasContenidos.js
│   ├── scripts/
│   │   └── inicializarBaseDatos.js
│   └── pruebas/
│       └── api.test.js
└── frontend/
    ├── .env.example
    ├── package.json
    ├── jsconfig.json
    ├── next.config.mjs
    └── src/
        ├── pages/
        │   ├── _app.js
        │   ├── _document.js
        │   └── index.js
        ├── servicios/
        │   └── clienteApi.js
        ├── componentes/
        │   ├── AvisoAtencionInmediata.js
        │   ├── EncabezadoNavegacion.js
        │   ├── SeccionHero.js
        │   ├── SeccionProposito.js
        │   ├── SeccionBienestar.js
        │   ├── DirectorioRutasApoyo.js
        │   ├── FiltrosDirectorio.js
        │   ├── TarjetaRecurso.js
        │   ├── ModalDetalleRecurso.js
        │   ├── SeccionPreguntasFrecuentes.js
        │   ├── SeccionTransparencia.js
        │   └── PiePagina.js
        └── estilos/
            └── globales.css
```

---

## 3. Diseno de la base de datos PostgreSQL

El archivo `base_datos/esquema.sql` define tres tablas normalizadas sin almacenar datos personales ni historiales de visitantes:

1. **`categorias_apoyo`**:
   - Clasifica las rutas institucionales (`orientacion_institucional`, `bienestar_educativo`, `acompanamiento_psicosocial`, `proteccion_derechos`, `atencion_inmediata`).
2. **`recursos_apoyo`**:
   - Contiene los recursos institucionales con clave primaria `id`, relacion foranea `categoria_id`, `codigo_recurso`, `nombre_servicio`, `institucion_responsable`, `descripcion`, `tipo_servicio`, `modalidad_atencion`, `poblacion_atendida`, `territorio_cobertura`, `medio_contacto`, `horario_atencion`, `condiciones_acceso`, `url_oficial`, `fuente_verificacion`, `fecha_consulta`, `estado_verificacion` (valor predeterminado `pendiente_verificacion`), `es_dato_ficticio` (valor predeterminado `TRUE`), `es_atencion_inmediata` y `nota_transparencia`.
   - Incluye la restriccion `chk_verificacion_completa`, que impide a nivel de motor SQL asignar el estado `verificado_entorno_controlado` si `fecha_consulta` o `url_oficial` son nulos.
3. **`contenidos_bienestar`**:
   - Almacena las guias informativas generales de autocuidado cotidiano, reconocimiento de senales y orientacion para pedir ayuda, con declaracion explicita de sus limites de alcance.

---

## 4. Requisitos e instalacion paso a paso

### 4.1. Requisitos previos
- **Node.js** version 18 o superior (probado en Node.js v25.4.0).
- **PostgreSQL** (opcional en desarrollo local gracias al soporte dual del modulo `baseDatos.js`: conecta mediante `pg.Pool` a un servidor PostgreSQL externo en `PGHOST:PGPORT` o, cuando `MODO_BASE_DATOS=auto` / `embebido` y no hay un servicio PostgreSQL externo activo en el equipo, inicializa automaticamente un motor PostgreSQL embebido con `@electric-sql/pglite` ejecutando exactamente los mismos archivos `esquema.sql` y `datos_semilla.sql`).

### 4.2. Instalacion de dependencias

Desde la carpeta raiz `d:\Hackaton`:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4.3. Configuracion de variables de entorno

Copie los archivos `.env.example` en `backend/.env` y `frontend/.env.local` (sin incluir secretos reales en el control de versiones):

Variables en `backend/.env`:
- `PUERTO_BACKEND=4000`
- `ORIGEN_PERMITIDO_CORS=http://localhost:3000`
- `PGHOST=localhost`
- `PGPORT=5432`
- `PGDATABASE=mente_sana_joven`
- `PGUSER=postgres`
- `PGPASSWORD=cambiar_contrasena_local`
- `PGSSLMODE=disable`
- `MODO_BASE_DATOS=auto` (`postgres` para exigir servidor PostgreSQL externo, `embebido` para usar el motor PostgreSQL local embebido, `auto` para detectar automaticamente).

Variables en `frontend/.env.local`:
- `NEXT_PUBLIC_API_URL=http://localhost:4000/api`

### 4.4. Creacion de tablas e insercion de datos ficticios (Semilla)

Opción A — Mediante el script automatizado de Node.js (funciona tanto con PostgreSQL externo como con el motor PostgreSQL embebido):

```bash
cd backend
npm run db:init
```

Opción B — Directamente con el cliente `psql` sobre una base de datos PostgreSQL vacia:

```bash
psql -h localhost -U postgres -d mente_sana_joven -f ../base_datos/esquema.sql
psql -h localhost -U postgres -d mente_sana_joven -f ../base_datos/datos_semilla.sql
```

### 4.5. Ejecucion del backend y del frontend

1. Iniciar el backend Express (puerto `4000`):
```bash
cd backend
npm start
```

2. En otra terminal, iniciar el frontend Next.js (puerto `3000`):
```bash
cd frontend
npm run dev
```

Direcciones locales utilizadas:
- **Frontend Next.js**: `http://localhost:3000`
- **Backend API Express**: `http://localhost:4000/api`

---

## 5. Documentacion de endpoints de la API REST

Todos los endpoints devuelven respuestas JSON estructuradas con la propiedad `exito` (`true` o `false`) y codigos de estado HTTP coherentes (`200`, `400`, `403`, `404`, `405`, `429`, `500`).

| Metodo | Ruta | Descripcion | Parametros de consulta / ruta |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/salud` | Verifica la conexion entre Express y PostgreSQL y el estado de las salvaguardas eticas. | Ninguno |
| `GET` | `/api/categorias` | Lista las categorias de apoyo con el conteo de recursos verificados y los valores permitidos de filtrado. | Ninguno |
| `GET` | `/api/recursos` | Consulta el directorio de rutas de apoyo devolviendo exclusivamente registros con estado `verificado_entorno_controlado`. | `categoria`, `modalidad`, `tipoServicio`, `busqueda` (max. 80 caracteres), `soloAtencionInmediata` |
| `GET` | `/api/recursos/:id` | Obtiene la ficha completa y los metadatos de verificacion de un recurso especifico. Devuelve `404` si el recurso no existe o esta pendiente de verificacion. | `:id` entero positivo |
| `GET` | `/api/recursos/auditoria-verificacion` | Devuelve el resumen de transparencia y el listado de referencias retenidas en estado `pendiente_verificacion`. | Ninguno |
| `GET` | `/api/contenidos-bienestar` | Obtiene las guias informativas generales de bienestar emocional y autocuidado. | `ejeTematico` (opcional) |
| `POST / PUT / PATCH / DELETE` | `/api/recursos` | Bloqueado con `HTTP 405`. Ningun visitante puede modificar datos ni marcar recursos como verificados. | No aplica |

---

## 6. Salvaguardas eticas y limitaciones del sistema

1. **Sin diagnostico ni prescripcion clinica**: La plataforma no evalua sintomas, no emite diagnosticos psicologicos o psiquiatricos y no recomienda medicamentos ni tratamientos.
2. **Sin chatbots clinicos ni prediccion de riesgo**: No existe ningun agente conversacional que simule ser terapeuta ni algoritmos que clasifiquen usuarios segun riesgo suicida o estado clinico.
3. **Cero recoleccion de datos sensibles**: No se solicitan ni almacenan nombres, telefonos, correos, relatos traumaticos ni antecedentes de salud.
4. **Verificacion estricta de fuentes institucionales**:
   - Los numeros mencionados en material secundario (como la linea 106 o el servicio Yo Te Escucho 316 390 7010) **no se publican como rutas activas confirmadas** sin verificacion documental territorial directa. En la semilla se registran bajo estado `pendiente_verificacion` para demostrar que el backend los excluye del directorio publico activo.
   - Todos los registros de demostracion activa llevan el indicador `es_dato_ficticio = true` y etiquetas visibles de `Dato sintetico`.

---

## 7. Capacidades implementadas vs. funciones pendientes para fases posteriores

### Capacidades implementadas y operativas
- Esquema relacional PostgreSQL con restricciones de integridad sobre el estado de verificacion.
- Semilla reproducible con datos sinteticos identificados y casos de control en estado `pendiente_verificacion`.
- API REST en Express con consultas SQL parametrizadas (`$1`, `$2`), validacion de entradas, control CORS, cabeceras de seguridad, limite de tasa por IP y bloqueo de escritura publica (`HTTP 405`).
- Interfaz Next.js accesible (WCAG 2.2 AA) con navegacion por teclado, filtros combinados en tiempo real, buscador validado, modal de ficha tecnica, seccion de autocuidado, preguntas frecuentes y seccion de transparencia.
- Suite de pruebas automatizadas de integracion sobre Express y PostgreSQL.

### Funciones pendientes (Fuera del alcance actual)
- Convenios interadministrativos y verificacion juridica en tiempo real con las secretarias municipales y departamentales para sustituir el conjunto de datos sinteticos por el directorio oficial en produccion.
- Panel administrativo autenticado para funcionarios designados encargados de auditar y actualizar periodicamente las fechas de vigencia documental.
- Pruebas piloto con usuarios reales bajo protocolo revisado por comite de etica.

---

## 8. Demostracion de integracion tecnica y pruebas ejecutadas

Para ejecutar la suite de pruebas automatizadas del backend y la base de datos:

```bash
cd backend
npm test
```

Las pruebas verifican:
1. Respuesta de `/api/salud` y conexion real con el motor PostgreSQL.
2. Consulta de categorias con conteos agregados (`COUNT` y `GROUP BY`).
3. Exclusion estricta de registros con `estado_verificacion = 'pendiente_verificacion'` en `/api/recursos`.
4. Filtrado parametrizado por `categoria`, `modalidad`, `tipoServicio` y `busqueda`, incluyendo el manejo de estado vacio.
5. Rechazo con `HTTP 400` ante parametros no permitidos o intentos de inyeccion SQL.
6. Consulta de detalle en `/api/recursos/:id` y bloqueo con `HTTP 404` cuando se intenta consultar por ID un registro pendiente de verificacion.
7. Bloqueo con `HTTP 405` frente a intentos de modificacion mediante `POST`.
8. Consulta y filtrado de guias en `/api/contenidos-bienestar`.

---

## 9. Declaracion de propiedad intelectual y componentes de terceros

- **Propiedad intelectual**: La solucion desarrollada pertenece a los participantes autores del proyecto en el marco de la Hackathon Villavicencio 2026.
- **Componentes de terceros y licencias**:
  - `next` y `react` / `react-dom`: Licencia MIT.
  - `express` y `cors`: Licencia MIT.
  - `dotenv`: Licencia BSD-2-Clause.
  - `pg` (node-postgres): Licencia MIT.
  - `@electric-sql/pglite` (motor PostgreSQL WASM para entorno controlado local): Licencia Apache-2.0 / PostgreSQL License.
