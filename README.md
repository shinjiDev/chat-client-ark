# Chat Client - Arkano

Cliente web de chat desarrollado en React con TypeScript y Material-UI que se conecta a un API de chat backend para realizar consultas y visualizar respuestas con análisis de datos.

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### Compilación para Producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## 📖 Uso

### Modo Normal (con Backend)

1. **Iniciar la aplicación**: Ejecuta `npm run dev`
2. **Configurar conexión**:
   - Ingresa tu `UserId` (ej: `382c74c3-721d-4f34-80e5-57657b6cbc27`)
   - Ingresa la URL del servicio (ej: `http://localhost:7071`)
   - Haz clic en "Iniciar Chat"
3. **Enviar mensajes**: Escribe tu consulta en el campo de texto y presiona Enter o haz clic en el botón de enviar
4. **Ver respuestas**: Las respuestas se mostrarán con formato markdown, incluyendo tablas y análisis
5. **Ver queries SQL**: Si la respuesta incluye queries SQL, haz clic en "Mostrar Queries SQL" para verlas

### Modo Mock (sin Backend)

Para probar la aplicación sin tener el backend corriendo:

1. **Iniciar la aplicación**: Ejecuta `npm run dev`
2. **Activar modo Mock**:
   - Ingresa cualquier `UserId` (ej: `test-user-123`)
   - **Marca el checkbox "Usar modo Mock"**
   - El campo URL se deshabilitará automáticamente
   - Haz clic en "Iniciar Chat"
3. **Probar con ejemplos**:
   - "¿Cuáles fueron las ventas del año 2025 por país?"
   - "Muestra las top 5 marcas"
   - "Ventas por categoría"
   - "¿Cuál es la venta de productos calmantes en México?"

## 💡 Ejemplos de Consultas

### Consultas sobre Ventas

```
¿Cuáles fueron las ventas totales del top 5 marcas en la categoría 'APARATO CARDIOVASCULAR', 
subcategoría 'ORAL S.ORD. TABLETAS', Formato 'ORAL SOLIDO ORDINARIO' en el País Chile en el 2024?
```

```
¿Cuál es la venta del año 2025 de productos para el dolor de cabeza sumado por país?
```

### Consultas sobre Marcas

```
Dime las cuotas de mercado que tienen actualmente las 5 marcas que más venden en Chile, 
en diciembre del 2024 considerando solo Formatos de comprimidos y categoría de laxantes.
```

### Consultas sobre Categorías

```
¿Cuál es la venta de este año de productos calmantes en México?
```

## 🎯 Características

- ✅ **Interfaz moderna** con Material-UI
- ✅ **Soporte para Markdown** en las respuestas (tablas, formato, etc.)
- ✅ **Visualización de Queries SQL** en panel colapsable
- ✅ **Modo Mock** para desarrollo sin backend
- ✅ **Generación automática de ConversationId** (GUID) en cada request
- ✅ **Persistencia de configuración** en localStorage
- ✅ **Manejo de errores** con notificaciones
- ✅ **Historial de conversación** durante la sesión

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Material-UI (MUI)** - Componentes de UI
- **Axios** - Cliente HTTP
- **React Markdown** - Renderizado de markdown

## 📁 Estructura del Proyecto

```
ChatClient/
├── src/
│   ├── components/          # Componentes React
│   │   ├── ConfigScreen.tsx    # Pantalla de configuración
│   │   ├── ChatScreen.tsx       # Pantalla principal de chat
│   │   ├── MessageList.tsx      # Lista de mensajes
│   │   ├── MessageItem.tsx      # Componente de mensaje individual
│   │   ├── MessageInput.tsx     # Input para enviar mensajes
│   │   └── SqlQueriesPanel.tsx  # Panel para queries SQL
│   ├── context/            # Context API
│   │   └── ChatContext.tsx      # Estado global del chat
│   ├── services/            # Servicios
│   │   ├── chatService.ts       # Cliente HTTP del API
│   │   └── mockChatService.ts   # Servicio mock para desarrollo
│   ├── types/               # Tipos TypeScript
│   │   └── api.ts               # Interfaces del API
│   ├── utils/               # Utilidades
│   │   └── guid.ts              # Generador de GUIDs
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Punto de entrada
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🔧 Configuración

### Variables de Entorno

No se requieren variables de entorno. La configuración se realiza a través de la interfaz de usuario.

### Proxy de Desarrollo

El proyecto está configurado con un proxy de Vite para evitar problemas de CORS durante el desarrollo. Cuando uses `http://localhost:7071` en modo desarrollo, las peticiones a `/api/*` se redirigen automáticamente al backend a través del proxy.

### Headers del API

El cliente envía automáticamente los siguientes headers:
- `UserId`: El ID del usuario configurado
- `UserEmail`: `oscar.vivas@arkanosoft.com` (por defecto)
- `AttachmentUri`: `localhost` (por defecto)

## 📝 Notas Importantes

- **ConversationId**: Se genera automáticamente un nuevo GUID en cada request
- **Modo Mock**: Las respuestas son simuladas y no provienen del backend real
- **Persistencia**: La configuración se guarda en localStorage y se carga automáticamente al iniciar

## 🐛 Solución de Problemas

### Error de CORS (Cross-Origin Resource Sharing)

Si ves errores de CORS al intentar conectar con Azure Functions local:

**Solución automática**: El proyecto está configurado con un proxy de Vite que resuelve automáticamente los problemas de CORS en desarrollo. Cuando uses `http://localhost:7071` en modo desarrollo, las peticiones se redirigen automáticamente a través del proxy.

**Si el proxy no funciona**:
1. Asegúrate de que el backend esté corriendo en `http://localhost:7071`
2. Reinicia el servidor de desarrollo de Vite (`npm run dev`)
3. Verifica que la URL configurada sea exactamente `http://localhost:7071`

**Solución alternativa (configurar CORS en Azure Functions)**:
Si prefieres configurar CORS directamente en Azure Functions, agrega esto a tu `local.settings.json`:

```json
{
  "Host": {
    "CORS": "http://localhost:5173,http://localhost:3000,http://localhost:5174"
  }
}
```

### Error de conexión al servidor

Si ves el error "No se pudo conectar con el servidor":
1. Verifica que el backend esté corriendo en la URL configurada
2. Verifica que la URL sea correcta (ej: `http://localhost:7071`)
3. Usa el modo Mock para desarrollo sin backend

### Las queries SQL no aparecen

- Verifica que la respuesta del API incluya el campo `sqlQueries`
- Algunas respuestas pueden no tener queries SQL asociadas

## 📄 Licencia

Este proyecto es privado y propiedad de Arkano.

