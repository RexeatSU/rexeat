# Rexeat - Actores y casos de uso

## Información del artefacto

- **Proyecto**: Rexeat - Plataforma SaaS de Gestión de Restaurantes
- **Fase RUP**: Inception (Inicio)
- **Versión**: 1.0
- **Fecha**: 2026-07-03
- **Autor**: Equipo de desarrollo

## Introducción

Este documento identifica los actores del sistema y sus casos de uso correspondientes para la plataforma Rexeat, basándose en el modelo del dominio establecido y los requisitos acordados. Se enfoca en definir las interacciones entre los usuarios (tanto personal del restaurante como comensales externos) y la plataforma a través de casos de uso atómicos estructurados de forma CRUD y lógica de negocio.

## Propósito

- Identificar los actores que interactúan con Rexeat.
- Definir los casos de uso atómicos, específicos y claros que soportan las operaciones de restauración.
- Establecer las responsabilidades de cada actor.
- Facilitar el diseño e implementación del sistema.
- Garantizar la trazabilidad con los requisitos de negocio y el modelo de dominio.

## Diagramas de Casos de Uso

El modelo de casos de uso se divide en tres diagramas lógicos para mejorar la legibilidad y modularidad:

1. **Consulta, Acceso y Personalización del Comensal**:
      - Código fuente: [actores_casos_uso_comensal.puml](actores_casos_uso_comensal.puml)
2. **Gestión de Organización y Restaurante (Dueño)**:
      - Código fuente: [actores_casos_uso_organizacion.puml](actores_casos_uso_organizacion.puml)
3. **Administración de Carta, Menús y Productos (Manager)**:
      - Código fuente: [actores_casos_uso_gestion.puml](actores_casos_uso_gestion.puml)

---

## Actores identificados

| Actor        | Descripción                                                                                                 | Responsabilidades principales                                                                                                                                                                                                                    |
| --------------| -------------------------------------------------------------------------------------------------------------| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Dueño**    | Propietario del restaurante o franquicia. Es el suscriptor inicial del SaaS Rexeat. Puede actuar como Manager en sus restaurantes. | - Registrar y actualizar la información del restaurante.<br>- Contratar y gestionar la lista de Managers.<br>- Realizar todas las tareas de gestión de cartas, productos e ingredientes (hereda el rol de Manager).                              |
| **Manager**  | Personal administrativo o de operaciones asignado al restaurante con permisos de edición.                   | - Gestionar cartas, categorías (etiquetas) y productos (platos, bebidas, menús).<br>- Controlar el stock de los productos.<br>- Configurar ingredientes y alérgenos de los platos.                                                               |
| **Comensal** | Cliente final del restaurante que accede a la aplicación web a través de un código QR o tag NFC en su mesa. | - Acceder y consultar la carta interactiva del restaurante.<br>- Seleccionar idioma mediante traducción automática (IA).<br>- Consultar detalles de platos, bebidas y menús. |

---

## Casos de uso por actor

### Dueño

> [!NOTE]
> El actor **Dueño** hereda todos los casos de uso descritos para el actor **Manager**, lo que le permite realizar la gestión operativa de cualquiera de sus restaurantes.

| Entidad                | Casos de uso CRUD                                                                      | Casos de uso especiales |
| ---------------------- | -------------------------------------------------------------------------------------- | ----------------------- |
| **Restaurante**        | crearRestaurante(), editarRestaurante(), eliminarRestaurante(), consultarRestaurante() |                         |
| **Personal (Manager)** | contratarManager(), despedirManager(), listarManagers()                                |                         |

### Manager

| Entidad / Categoría        | Casos de uso CRUD                                                            | Casos de uso especiales      |
| -------------------------- | ---------------------------------------------------------------------------- | ---------------------------- |
| **Carta**                  | crearCarta(), abrirCartas(), editarCarta(), eliminarCarta()                  | activarCarta()               |
| **Categoría**              | crearCategoria(), listarCategorias(), editarCategoria(), eliminarCategoria() |                              |
| **Plato**                  | crearPlato(), abrirPlatos(), editarPlato(), eliminarPlato()                  |                              |
| **Bebida**                 | crearBebida(), abrirBebidas(), editarBebida(), eliminarBebida()              |                              |
| **Menú**                   | crearMenú(), abrirMenús(), editarMenú(), eliminarMenú()                      |                              |
| **Ingrediente / Cantidad** |                                                                              | configurarIngredientePlato() |
| **Alérgeno**               |                                                                              | asociarAlergenoProducto()    |
| **Stock**                  |                                                                              | actualizarStockProducto()    |

### Comensal

| Categoría             | Casos de uso                                                                         |
| --------------------- | ------------------------------------------------------------------------------------ |
| **Acceso y Consulta** | accederCarta(), consultarCarta(), consultarDetalleProducto(), consultarDetalleMenú() |
| **Traducción**        | seleccionarIdioma()                                                                  |

---

## Casos de uso detallados

### 1. Gestión de Organización y Personal (Dueño)

- **crearRestaurante()**: Registra un nuevo restaurante en la plataforma SaaS Rexeat.
- **editarRestaurante()**: Modifica los datos básicos del restaurante (nombre, dirección, teléfono).
- **eliminarRestaurante()**: Da de baja el restaurante de la plataforma.
- **consultarRestaurante()**: Muestra la información de registro del restaurante.
- **contratarManager()**: Registra las credenciales de un empleado con rol de Manager para que tenga permisos de gestión en el restaurante.
- **despedirManager()**: Revoca las credenciales de un Manager existente del restaurante.
- **listarManagers()**: Muestra la lista de Managers activos contratados en el restaurante.

### 2. Gestión de la Carta y Categorías (Manager)

- **crearCarta()**: Crea un nuevo menú digital vacío asignado al restaurante.
- **abrirCartas()**: Lista todas las cartas configuradas en el restaurante.
- **editarCarta()**: Modifica el nombre o configuración de una carta existente.
- **eliminarCarta()**: Elimina permanentemente una carta del sistema.
- **activarCarta()**: Marca una carta como la carta activa del restaurante para que sea la visualizada por los comensales.
- **crearCategoria()**: Crea una nueva categoría que funcionará como etiqueta para clasificar productos (ej: "Apto para veganos", "Segundos Platos").
- **listarCategorias()**: Muestra todas las categorías creadas en el restaurante.
- **editarCategoria()**: Modifica el nombre de una categoría existente.
- **eliminarCategoria()**: Elimina una categoría del sistema (desvinculándola de los productos asignados sin eliminarlos).

### 3. Gestión de Productos y Stock (Manager)

- **crearPlato()**: Registra un nuevo plato en la carta con su nombre, precio, stock (como toggle booleano), descripción e imagen.
- **abrirPlatos()**: Lista todos los platos configurados en el restaurante.
- **editarPlato()**: Modifica la información básica o imagen de un plato.
- **eliminarPlato()**: Elimina un plato del sistema.
- **crearBebida()**: Registra una nueva bebida en el sistema especificando si tiene alcohol, su marca, denominación de origen y stock (como toggle booleano).
- **abrirBebidas()**: Lista todas las bebidas configuradas.
- **editarBebida()**: Modifica la información básica o propiedades de la bebida.
- **eliminarBebida()**: Elimina una bebida del sistema.
- **crearMenú()**: Registra un nuevo Menú (Composite) en el sistema. Permite definir si es un menú simple (productos fijos) o compuesto (que requiere secciones como "Primero", "Segundo").
- **abrirMenús()**: Lista todos los menús configurados en el restaurante.
- **editarMenú()**: Modifica la estructura, precios o secciones de un menú.
- **eliminarMenú()**: Elimina un menú de la carta.
- **actualizarStockProducto()**: Permite activar o desactivar el stock (toggle disponible/agotado) de un producto individual (Plato, Bebida o Menú compuesto).

### 4. Gestión de Ingredientes y Alérgenos (Manager)

- **configurarIngredientePlato()**: Define qué ingredientes componen un plato, asignando su cantidad por defecto, cantidad mínima (si es opcional o no), cantidad máxima (si se puede añadir extra) y el precio del suplemento extra.
- **asociarAlergenoProducto()**: Vincula alérgenos estándar (Lactosa, Gluten, etc.) a un ingrediente de forma que se deriven automáticamente en los platos y menús donde se utilicen.

### 5. Acceso y Consulta (Comensal)

- **accederCarta()**: El comensal accede al menú digital principal del restaurante al leer el código QR o el chip NFC del soporte físico (sin división por mesa).
- **consultarCarta()**: Muestra al comensal el listado de categorías y productos activos de la carta seleccionada.
- **consultarDetalleProducto()**: Abre la ficha detallada de un plato o bebida, mostrando sus ingredientes por defecto, descripción, alérgenos y precio.
- **consultarDetalleMenú()**: Permite abrir un menú compuesto para examinar sus secciones y las opciones de productos disponibles con sus respectivos suplementos de precio.
- **seleccionarIdioma()**: El comensal selecciona su idioma preferido y la plataforma traduce instantáneamente toda la carta y descripciones utilizando Inteligencia Artificial generativa.

---

## Características de los casos de uso

### Atomicidad

Todos los casos de uso aquí definidos son atómicos:

- Representan interacciones completas e indivisibles entre el actor y el sistema.
- Entregan un valor claro y observable para el actor.
- Tienen estados de inicio y fin bien definidos.

### Nomenclatura

Los nombres siguen una convención técnica que "huele a código":

- Empiezan con un verbo de acción en infinitivo (ej: `crear...`, `editar...`, `consultar...`).
- Sugieren la firma de un método en la capa de control o de aplicación del backend, facilitando la transición directa del análisis al diseño de software.

### Trazabilidad al modelo del dominio

Cada caso de uso está directamente trazado con las clases identificadas en [modelo_dominio.puml](modelo_dominio.puml):

- Los CRUDs operan directamente sobre `Restaurante`, `Carta`, `Categoría`, `Plato`, `Bebida` y `Menú`.
- `configurarIngredientePlato()` modifica la relación entre `Plato` e `Ingrediente` (afectando a la clase de valor `Cantidad`).

---

## Consideraciones de diseño

### 1. Simplificación de tarjetas físicas

- Las tarjetas físicas (NFC y códigos QR) **no se guardan en la base de datos** del sistema. Solo contienen un enlace estático hacia el menú web principal del restaurante. Por lo tanto, no existe ningún caso de uso de gestión para tarjetas individuales.

### 2. Categorías dinámicas (Tags)

- El caso de uso `crearCategoria()` y su asignación a productos soporta una relación muchos-a-muchos. Las categorías no encapsulan productos de forma rígida; actúan como etiquetas cruzadas.

### 3. Propagación en cascada de Stock

- En `consultarDetalleMenú()` y `consultarCarta()`, el sistema comprueba dinámicamente si las opciones del menú disponen de stock (toggle activo). Un menú completo se marcará automáticamente como no disponible si alguna de sus secciones se queda sin ninguna opción con stock.

### 4. Value Object Cantidad

- El caso de uso `configurarIngredientePlato()` utiliza el objeto de valor `Cantidad`. Aunque actualmente el comensal no puede personalizar ingredientes desde su interfaz (acceso de solo lectura a la carta), la estructura queda preparada para soportar que `minima = 0` represente un ingrediente opcional y `maxima > defecto` permita ingredientes extra con recargo según `suplementoExtra` en futuras iteraciones.

### 5. Traducciones e Idioma

- El caso de uso `seleccionarIdioma()` no requiere una entidad del dominio de traducciones dedicada. La plataforma traduce dinámicamente los campos utilizando IA generativa, por lo que a nivel de casos de uso se reduce a la llamada a la API de traducción sobre los campos de texto del restaurante.

### 6. Generalización de Actores (Dueño y Manager)

- Se establece una relación de generalización/herencia entre el actor **Dueño** y el actor **Manager**. Esto permite al dueño de un restaurante actuar directamente como manager del mismo sin necesidad de duplicar los casos de uso en el modelo, simplificando la lógica de control de acceso.
