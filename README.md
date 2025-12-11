# Restaurant App (Calculadora de Consumos y Propinas)

Aplicación web para la gestión de pedidos de restaurante. Permite a los meseros crear órdenes por mesa, agregar platillos desde un menú dinámico, calcular subtotales en tiempo real y determinar el total final incluyendo propinas seleccionables.

## Demo

Puedes ver el proyecto en funcionamiento aquí: [Restaurant App](https://mariokarajallo.github.io/restaurant-manager-javascript/)

![Demo del proyecto](restaurant-app.gif)

## Características

- **Gestión de Mesas y Horarios**: Creación de órdenes controlada con validación de datos iniciales.
- **Menú Interactivo**: Visualización de platillos categorizados cargados desde una API simulada.
- **Carrito de Compras**: Funcionalidad para agregar platillos y ajustar cantidades dinámicamente.
- **Gestión de Pedidos**: Posibilidad de eliminar artículos del pedido mediante un botón dedicado.
- **Cálculos Automáticos**: Actualización en tiempo real de subtotales por artículo y total de la cuenta.
- **Calculadora de Propinas**: Opciones predefinidas (10%, 25%, 50%) que ajustan automáticamente el total a pagar.

## Tecnologías utilizadas

- **HTML5**: Estructura semántica de la aplicación.
- **CSS3**: Estilos personalizados (`style.css`).
- **Bootstrap 5**: Framework para el diseño responsivo y componentes de UI (Modales, Grid, Botones).
- **JavaScript (ES6+)**: Lógica del cliente, manipulación del DOM y consumo de API con Fetch.
- **JSON Server**: Herramienta para simular una REST API local con `db.json`.

## Instalación y requisitos

Para ejecutar este proyecto localmente, es necesario tener **Node.js** instalado.

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/tu-usuario/restaurant-manager-javascript.git
    cd restaurant-manager-javascript
    ```

2.  **Instalar servidor JSON (Global)**
    El proyecto utiliza `json-server` para simular el backend.

    ```bash
    npm install -g json-server
    ```

3.  **Iniciar la Base de Datos**
    Ejecuta el siguiente comando para servir los datos del archivo `db.json` (puerto 3000 por defecto):

    ```bash
    json-server --watch db.json --port 3000
    ```

4.  **Ejecutar la App**
    Abre el archivo `index.html` directamente en tu navegador.

## Cómo funciona

1.  **Crear Orden**: Haz clic en el botón "Nueva Orden".
2.  **Datos**: Ingresa el número de mesa y la hora en la ventana modal.
3.  **Selección**: Usa los inputs en las tarjetas del menú para agregar la cantidad deseada de cada platillo.
4.  **Resumen**: Observa cómo se construye el pedido en la sección de resumen. Puedes eliminar platillos si es necesario.
5.  **Pagar**: Selecciona el porcentaje de propina en la sección inferior para ver el desglose final (Subtotal, Propina, Total).

### Validaciones

- **Campos Obligatorios**: No se puede crear una orden sin especificar mesa y hora.
- **Cantidades Válidas**: Solo se agregan platillos con cantidad mayor a 0.
- **Eliminación Automática**: Si la cantidad de un platillo se reduce a 0, se elimina del pedido.
- **Integridad de Datos**: Se verifica que la información provenga de la API correctamente.

## Estructura de archivos

```bash
restaurant-manager-javascript/
├── css/
│   ├── bootstrap.min.css       # Hoja de estilos del framework Bootstrap
│   └── style.css               # Estilos personalizados de la aplicación
├── js/
│   ├── app.js                  # Lógica principal (Eventos, Cálculo de propinas, API)
│   └── bootstrap.bundle.min.js # Funcionalidades JS de Bootstrap (Modales)
├── db.json                     # Base de datos simulada (Menú de platillos)
├── index.html                  # Estructura principal de la interfaz
├── restaurant-app.gif          # Imagen de demostración para el README
├── LICENSE                     # Archivo de licencia del proyecto
└── README.md                   # Documentación oficial
```

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor sigue estos pasos:

1.  Haz un **Fork** del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz **Commit** (`git commit -m 'Agregar nueva funcionalidad'`).
4.  Haz **Push** a la rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un **Pull Request**.

### Sugerencias

- Implementar almacenamiento local (LocalStorage) para preservar la orden al recargar.
- Agregar un módulo para administrar (CRUD) los platillos en `db.json` desde la interfaz.
- Mejorar el diseño visual de las tarjetas de platillos.

## Créditos

- **Juan Pablo De la Torre Valdez** - Instructor y autor del contenido del curso - [Codigo Con Juan](https://codigoconjuan.com/).
- **Mario Karajallo** - Implementación del proyecto y mantenimiento - [Mario Karajallo](https://karajallo.com).

## Licencia

Este proyecto está bajo la licencia MIT. Véase `LICENSE` para más detalles.

---

⌨️ con ❤️ por [Mario Karajallo](https://karajallo.com)
