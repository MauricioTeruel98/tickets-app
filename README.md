# Requisitos:

- PHP: 8.1
- Node JS: 18
- Composer
- MySQL (Opcional, puedes usarlo con sqlite)

# Instrucciones para Configurar el Proyecto

Sigue estos pasos para configurar el proyecto y ejecutarlo correctamente en tu entorno local.

## 1. Crear el archivo `.env`

Primero, debes crear el archivo de configuración `.env`. Puedes copiar el contenido del archivo `.env.example` que ya se encuentra en el repositorio:

```bash
.env.example .env
```

### Configuración de la Base de Datos

Si usas MySQL, asegúrate de modificar los datos de conexión en el archivo `.env`:

```bash
DB_CONNECTION=mysql
DB_HOST=tu_host
DB_PORT=port
DB_DATABASE=nombre_base_de_datos
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

En caso de que prefieras utilizar SQLite, simplemente cambia la configuración en el archivo `.env` como sigue:
```bash
DB_CONNECTION=sqlite
```

### Configuración de la API Key de Giphy

Si prefieres, puedes generar tu propia API Key de Giphy y añadirla al archivo .env. Si no, puedes usar la clave proporcionada en el archivo de ejemplo; sin embargo, esta clave será eliminada en unas semanas.

```bash
GIPHY_API_KEY=cZxtcBF7SwMeWLu5d4huUwOx4PSLeio0
```

## 2. Instalar las dependencias de Composer

Instala las dependencias de PHP con Composer ejecutando el siguiente comando:

```bash
composer install
```

## 3. Instalar las dependencias de Node.js

Instala las dependencias del frontend usando NPM:

```bash
npm install
```

## 4. Generar la clave de la aplicación

Genera una clave única para la aplicación ejecutando el siguiente comando:

```bash
php artisan key:generate
```

## 5. Ejecutar las migraciones de la base de datos

Ejecuta las migraciones para crear las tablas en la base de datos:

```bash
php artisan migrate
```

Durante este proceso, si se te solicita que se cree la base de datos, escribe yes.


## 6. Generar la build del frontend

Para preparar el frontend para producción o pruebas, ejecuta el siguiente comando:

```bash
npm run build
```

## 7. Generar la build del frontend

Finalmente, inicia el servidor local de PHP para ejecutar la aplicación:

```bash
php artisan serve
```

Esto iniciará la aplicación en [http://localhost:8000](http://localhost:8000 "http://localhost:8000").