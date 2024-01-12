# API Genérica - Inicializador de Proyecto

[![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)](https://github.com/ezequielgenoves/api-template)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Un inicializador de proyecto para APIs genéricas en Express, que facilita la creación rápida y estructurada de servicios web.

## Estructura del Proyecto
```
api
|-- components
| |-- crud.manager.ts
|-- controllers
| |-- controller.ts
|-- repositories
| |-- repository.ts
|-- routes
| |-- router.ts
|-- services
| |-- service.ts
index.ts
```
## Funcionalidades Principales

- **Estructura Modular:** Divide tu API en componentes, controladores, repositorios, rutas y servicios para una organización clara y mantenible del código.

- **Enrutamiento Automático:** Las rutas se generan automáticamente a partir de los archivos `.router`, pero puedes personalizarlo desde el archivo `router.ts`.

- **Configuración Flexible:** Personaliza la configuración al invocar `apiRouter()` en `index.ts`. Puedes excluir archivos específicos del enrutamiento al proporcionar un array de nombres de archivos.

## Instalación

1. Clona este repositorio: `git clone https://github.com/ezequielgenoves/api-template.git`
2. Instala las dependencias: `npm install`
3. Configura tus variables de entorno en un archivo `.env`.

## Inicio Rápido

```typescript
import 'dotenv/config';
import express from 'express';
import apiRouter from '@routes/router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRouter());
app.listen(port, () => console.log(`Server started at ${process.env.SERVER_URL}!`));
```

## Uso de Rutas
**Ejemplo**
```typescript
import { Router } from 'express';
import CrudManager from '@CrudManager';
import UsersController from '@controllers/users.controller';

const router = Router();
router.use(CrudManager.crud(UsersController));

module.exports = router;
```
