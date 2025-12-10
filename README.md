# Restaurant App (Calculadora de Consumos y Propinas)

Aplicación web para la gestión de pedidos de restaurante en tiempo real. Permite crear órdenes por mesa, calcular consumos, agregar propinas y gestionar el resumen de cuenta de manera dinámica.

## Demo

_(Inserta aquí un enlace a tu demo en vivo o un GIF mostrandola funcionalidad)_

## Características

- **Gestión de Órdenes**: Creación de nuevas órdenes asignando mesa y hora.
- **Menú Dinámico**: Carga de platillos desde un servidor JSON local.
- **Cálculo en Tiempo Real**: Actualización automática de subtotales al modificar cantidades.
- **Gestión de Propinas**: Cálculo de propinas basado en porcentajes predefinidos (10%, 25%, 50%).
- **Resumen Interactivo**: Visualización detallada del pedido con opción de eliminar ítems.
- **Validaciones**: Verificación de campos obligatorios antes de crear la orden.

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica de la aplicación.
- **CSS3**: Estilos personalizados.
- **Bootstrap 5**: Framework para diseño responsivo y componentes de UI (Modales, Grid, Utilidades).
- **JavaScript (ES6+)**: Lógica del lado del cliente, manipulación del DOM y Fetch API.
- **JSON Server**: Simulación de una REST API para obtener los datos del menú.

## Instalación y Requisitos

Para ejecutar este proyecto localmente, necesitas tener Node.js instalado para correr `json-server`.

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/tu-usuario/restaurant-manager-javascript.git
    cd restaurant-manager-javascript
    ```

2.  **Instalar dependencias (Global o Local)**
    Necesitas `json-server` para simular la API.

    ```bash
    npm install -g json-server
    ```

3.  **Iniciar el servidor**
    Ejecuta el siguiente comando para levantar la API en el puerto 3000:

    ```bash
    json-server --watch db.json --port 3000
    ```

4.  **Abrir la aplicación**
    Abre el archivo `index.html` en tu navegador web de preferencia.

## Cómo funciona

1.  **Iniciar Orden**: Al abrir la app, haz clic en "Nueva Orden".
2.  **Datos de Mesa**: Ingresa el número de mesa y la hora en el modal.
    - _Validación_: Ambos campos son obligatorios. Si están vacíos, se mostrará una alerta.
3.  **Selección de Platillos**: Se desplegará el menú. Ingresa la cantidad deseada para cada platillo.
    - El resumen se actualizará automáticamente a la derecha (en desktop) o abajo (en móvil).
4.  **Confirmar y Propina**: Revisa el resumen. Selecciona el porcentaje de propina para calcular el total final.
5.  **Eliminar Ítems**: Puedes eliminar platillos individuales desde el resumen si el cliente cambia de opinión.

### Validaciones

- **Formulario de Inicio**: No permite avanzar si no se especifica mesa y hora.
- **Cantidades**: No permite cantidades negativas. Al poner 0, se elimina del pedido.
- **Pedido Vacio**: Muestra un mensaje "Añade los elementos del pedido" si no hay ítems seleccionados.

## Estructura de Archivos

```bash
restaurant-manager-javascript/
├── css/
│   └── bootstrap.min.css      # Hoja de estilos del framework Bootstrap
├── js/
│   ├── app.js                 # Lógica principal de la aplicación (Eventos, Funciones, API)
│   └── bootstrap.bundle.min.js # Scripts de Bootstrap
├── REQUEST_URI/              # (Opcional) Archivos de configuración de entorno
├── db.json                    # Base de datos simulada con los platillos
├── index.html                 # Punto de entrada y estructura principal
├── LICENSE                    # Archivo de licencia
└── README.md                  # Documentación del proyecto
```

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor sigue estos pasos:

1.  Haz un **Fork** del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz **Commit** (`git commit -m 'Agregar nueva funcionalidad'`).
4.  Haz **Push** a la rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un **Pull Request**.

### Sugerencias

- Mejorar la persistencia de datos (ej. LocalStorage).
- Agregar más categorías de platillos en `db.json`.
- Implementar una validación para evitar mesas duplicadas.

## Créditos

Este proyecto fue desarrollado como parte del curso "JavaScript Moderno Guía Definitiva Construye +20 Proyectos" de Juan Pablo De la Torre.

## Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.
