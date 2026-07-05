# Rexeat - Modelo del dominio

## Información del artefacto

- **Proyecto**: Rexeat - Plataforma SaaS de Gestión de Restaurantes
- **Fase RUP**: Inception (Inicio)
- **Versión**: 1.0
- **Fecha**: 2026-07-03
- **Autor**: Equipo de desarrollo

## Introducción

Este documento describe el modelo conceptual del dominio para la plataforma Rexeat. El modelo establece el vocabulario común y las relaciones fundamentales entre las entidades que representan el funcionamiento de un restaurante moderno y la interacción digital con sus comensales.

## Propósito

- Establecer un vocabulario común y consistente para el proyecto Rexeat.
- Definir las entidades principales del dominio del restaurante (productos, menús, ingredientes y personal).
- Documentar las relaciones y restricciones de negocio acordadas.
- Servir de base para la especificación de casos de uso y la arquitectura de base de datos.
- Facilitar la comunicación y evitar malentendidos entre los desarrolladores y los Product Owners.

## Diagrama

<div align=center>

Código fuente: [modelo_dominio.puml](modelo_dominio.puml)

</div>

## Problema que resuelve

Rexeat soluciona la gestión digital del menú en el sector de la restauración de forma rápida, fácil y fiable, abordando los siguientes puntos:

1. **Gestión de múltiples restaurantes**: Permite a un **Dueño** administrar una red de restaurantes y delegar su control en **Managers**.
2. **Carta digitalizada dinámica**: Ofrece soporte para clasificar productos mediante **Categorías** flexibles que actúan como etiquetas.
3. **Estructura compleja de Menús**: Resuelve la composición de menús (patrón Composite) que contienen secciones y opciones seleccionables con posibles recargos de precio.
4. **Propagación y control de Stock (como Toggle)**: El stock no es una cantidad sino un estado booleano (hay/no hay). Asegura que el estado de stock de los menús compuestos dependa de que sus secciones tengan al menos una opción disponible con stock.
5. **Estructura para personalización avanzada de platos**: Permite configurar ingredientes individuales según límites máximos y mínimos definidos y sus suplementos (preparado para futura personalización por parte del comensal).
6. **Autotraducción integrada**: Resuelve la barrera idiomática de los comensales traduciendo dinámicamente el contenido del menú con Inteligencia Artificial.

## Glosario

| Entidad | Descripción | Características |
|---|---|---|
| **Restaurante** | El establecimiento físico o negocio gastronómico registrado en la plataforma. | - Ofrece una o más cartas activas o históricas.<br>- Emplea personal (Managers) para su gestión. |
| **Dueño** | El propietario o suscriptor de la plataforma SaaS Rexeat. | - Posee uno o más restaurantes.<br>- Contrata a los Managers.<br>- Puede ejercer rol de Manager sobre sus restaurantes. |
| **Manager** | Rol de usuario asignado al personal del restaurante con permisos para administrar el menú. | - Gestiona el catálogo de cartas, categorías y productos.<br>- Controla el stock y los alérgenos. |
| **Carta** | El catálogo oficial de productos y menús que se muestra a los comensales. | - Está asociada a un único restaurante.<br>- Puede estar activa o inactiva. |
| **Categoría** | Etiquetas de clasificación dinámicas para agrupar productos de manera no excluyente. | - Relación muchos-a-muchos con los productos.<br>- Ejemplos: "Sin gluten", "Sugerencias del chef". |
| **Producto** | Abstracción base para cualquier oferta comercializable de la carta. | - Define atributos comunes: nombre, precio, stock (como toggle booleano), y disponibilidad.<br>- Puede ser Plato, Bebida o un Menú compuesto. |
| **Plato** | Tipo de producto de comida elaborada. | - Contiene una lista de ingredientes configurables y descripción.<br>- Deriva sus alérgenos a partir de sus ingredientes. |
| **Bebida** | Tipo de producto bebible. | - Contiene especificaciones adicionales como marca, denominación de origen y si tiene alcohol. |
| **Menú** | Producto compuesto que agrupa otros productos estructurados en secciones (Patrón Composite). | - Contiene secciones y opciones de selección.<br>- Tiene una lógica de stock propagada en cascada. |
| **SecciónMenú** | División organizativa o de selección dentro de un Menú. | - Agrupa un conjunto de opciones (ej: "Primeros", "Bebida"). |
| **OpcionMenú** | Opción elegible dentro de una sección que apunta a un Producto concreto. | - Puede definir un suplemento de precio extra (ej: +2.00€ por entrecot). |
| **Ingrediente** | Componente de un plato que puede estar sujeto a personalización. | - Vinculado a alérgenos específicos.<br>- Contiene una cantidad de referencia. |
| **Cantidad** | Objeto de valor (Value Object) que modela el rango de personalización de un ingrediente. | - Define el valor por defecto, cantidad mínima permitida, cantidad máxima y la unidad de medida. |
| **Alergeno** | Enumerado de alérgenos alimentarios comunes (Gluten, Lactosa, Mariscos, etc.). | - Asociados a ingredientes y productos. |
| **Comensal** | Cliente final que consulta la carta del restaurante (en modo lectura). | - Interactúa a través del enlace del código QR o tarjeta NFC.<br>- Selecciona su idioma de lectura. |

## Relaciones

### Relaciones Organizacionales y de Personal
- **Dueño posee Restaurante**: Un dueño puede poseer múltiples establecimientos bajo su misma cuenta SaaS.
- **Restaurante emplea Manager**: Los managers son asignados a restaurantes concretos para gestionar sus cartas.
- **Comensal accede a Restaurante**: Los comensales acceden al portal web del restaurante de forma anónima para visualizar el menú.

### Estructura de la Carta
- **Carta contiene Menús, Categorías y Productos**: La carta actúa como contenedor de la oferta vigente del restaurante.
- **Categoría clasifica Producto**: Relación muchos-a-muchos que permite clasificar un producto en varias categorías (tags) simultáneamente.

### Composición y Personalización de Productos
- **Menú contiene SecciónMenú y OpcionMenú**: Estructura composite donde el menú delega en secciones y estas en opciones vinculadas a productos individuales (Platos o Bebidas).
- **Plato contiene Ingredientes**: Los platos están compuestos por materias primas personalizables.
- **Ingrediente contiene Cantidad**: Cada ingrediente define sus límites cuantitativos a través del objeto de valor `Cantidad`.
- **Ingrediente contiene Alérgenos**: Los alérgenos están asociados a nivel de ingrediente y se propagan automáticamente al plato.

---

## Cambios en las relaciones del modelo

### Refinamiento aplicado

**Cambio 1: Desacoplamiento de las Tarjetas Físicas**
- **Decisión**: Las tarjetas físicas (NFC y códigos QR) no se modelan como entidades ni se almacenan en base de datos.
- **Justificación**: Solo funcionan como soportes analógicos que contienen una URL común a la web del restaurante. Esto simplifica el modelo y evita persistencia innecesaria de objetos idénticos sin estado.

**Cambio 2: Categorías como Etiquetas Dinámicas**
- **Decisión**: Relación muchos-a-muchos entre `Categoría` y `Producto`.
- **Justificación**: Rompe la jerarquía rígida y permite que un producto (ej: chuletón) pertenezca a categorías como "Carne de vacuno" y "Segundos Platos" a la vez.

**Cambio 3: Menú como Producto (Patrón Composite)**
- **Decisión**: La clase `Menú` hereda de la clase abstracta `Producto`.
- **Justificación**: Permite que un menú se trate como cualquier otro producto en la carta, heredando propiedades de stock, disponibilidad y precio, a la vez que contiene a otros productos a través de secciones y opciones.

**Cambio 4: Cantidad como Objeto de Valor (Value Object)**
- **Decisión**: Se encapsula el rango de personalización en la clase de valor `Cantidad`.
- **Justificación**: Unifica bajo un mismo concepto si un ingrediente es obligatorio (min > 0), opcional (min = 0) o si admite cantidades extra cobrando un suplemento (max > defecto).

---

## Vocabulario

### Conceptos Clave

- **Composite**: Estructura de árbol donde los objetos individuales y compuestos se tratan de manera uniforme. En Rexeat, un Menú es un Producto que a su vez contiene referencias a otros Productos.
- **Stock Propagado**: Regla de negocio en la cual la disponibilidad de un menú se evalúa dinámicamente; si alguna sección se queda sin opciones disponibles con stock (toggle activo), el menú completo se considera agotado (sin stock).
- **Value Object (Objeto de Valor)**: Objeto que no tiene identidad conceptual propia y se define únicamente por sus atributos (ej: `Cantidad`). Es inmutable.
- **Derivación de Alérgenos**: Los alérgenos de un Plato no se editan manualmente, se calculan automáticamente a partir de los ingredientes que contiene. Del mismo modo, los alérgenos de un Menú se derivan en cascada de sus opciones de productos.

---

## Restricciones del dominio

| De Menú | De Plato / Ingrediente | De Tarjeta | De Comensal |
|---|---|---|---|
| Un Menú se considera "Agotado" si alguna de sus secciones no ofrece ninguna opción con stock disponible. | La cantidad configurada de un ingrediente debe respetar el rango `minima <= cantidad <= maxima` (regla de dominio para futura personalización del comensal). | Las tarjetas NFC/QR solo dirigen a la página general del menú del restaurante, sin división por mesas. | No se guardan sesiones persistentes del comensal. Su idioma preferido se aplica de forma dinámica. |
| El precio final del menú se calcula sumando el precio base del menú más los suplementos de las opciones seleccionadas. | Si se supera la cantidad por defecto de un ingrediente, se añade el `suplementoExtra` multiplicado por la diferencia. | No se almacena la tarjeta física en la base de datos de Rexeat. | Los alérgenos de los ingredientes consumidos se propagan de manera obligatoria y transparente en la visualización. |

---

## Consideraciones de Diseño

### Enfoque en la Utilidad y Simplicidad
El modelo evita detalles técnicos de implementación y base de datos (como tablas de idiomas o logs de auditoría), centrándose exclusivamente en los conceptos puros del negocio acordados para facilitar el desarrollo ágil de la interfaz y la lógica de negocio.

### Estabilidad y Robustez
El uso de patrones clásicos de diseño (Composite, Value Object) asegura que la estructura pueda evolucionar con facilidad en el futuro (por ejemplo, permitiendo submenús dentro de menús) sin alterar el comportamiento de las entidades ya existentes.
