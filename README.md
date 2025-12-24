# Backend Servicios Web

Este proyecto es un conjunto de **servicios API** desarrollados con **Node.js** y **Express**, que incluyen funcionalidades como:

- Generador de QR
- Generador de PDF
- Acortador de enlaces

---

## 🔧 Requisitos

- Node.js >= 14
- npm

---

## ⚡ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/kennyVargas/backend_servicios_web.git
cd backend_servicios_web
```

2. Instalar las dependencias:
```bash
npm install
```
3. Configurar variables de entorno:
```bash
cp .env.test .env   # En Linux/Mac
copy .env.test .env # En Windows
```
4. Levantar el servicio

```bash
npm run dev
```

5. estructura:
```bash
proyecto_/
│   .env.test               # Variables de entorno para pruebas
│   .gitignore              # Archivos y carpetas ignorados por Git
│   estructura.txt          # Árbol de carpetas generado automáticamente
│   index.js                # Punto de entrada de la aplicación
│   package.json            # Dependencias y scripts del proyecto
│   package-lock.json       # Versiones exactas de dependencias
│   README.md               # Documentación principal del proyecto
│
└── src/
    │   app.js               # Configuración general de la aplicación (Express)
    │
    ├── controllers/         # Controladores de las APIs
    │   pdf.controller.js        # Endpoints para generación de PDF
    │   peticionApi.controller.js# Manejo de peticiones externas
    │   qr.controller.js         # Endpoints para generación de códigos QR
    │   urlacortador.controller.js # Endpoints para el acortador de URLs
    │
    ├── cron/                # Tareas programadas (cron jobs)
    │   index.js                 # Inicialización de tareas programadas
    │   myTask.js                # Definición de tareas automáticas
    │
    ├── database/            # Configuración y acceso a base de datos
    │   conection.js             # Conexión a la base de datos
    │   config.js                # Configuración de la base de datos
    │   db.sql                   # Script SQL de la base de datos
    │
    │   └── dto/              # Objetos de transferencia de datos
    │       enlace.js             # DTO para enlaces acortados
    │
    ├── middleware/          # Middlewares personalizados
    │   logger.js                # Registro y monitoreo de solicitudes
    │
    ├── routes/              # Definición de rutas de la API
    │   qr.routes.js             # Rutas relacionadas con el servicio de QR
    │
    └── services/            # Lógica de negocio
        ├── acortador/           # Servicios del acortador de URLs
        │   acortadorServices.js
        │
        ├── captcha/             # Validación de captcha
        │   verificadorCaptcha.js
        │
        ├── dbquery/             # Consultas a la base de datos
        │   queryServices.js
        │
        ├── pdf/                 # Generación de PDFs
        │   pdfGenerator.js
        │
        └── qr/                  # Generación de códigos QR
            qrGenerator.js

```
