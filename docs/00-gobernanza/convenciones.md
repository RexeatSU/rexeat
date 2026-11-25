---
id: DOC-GOB-003
titulo: Convenciones documentales
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: ""
clasificacion: interno
---

# Convenciones documentales

> **Definición:** Reglas de formato, idioma, nomenclatura y diagramación aplicables a toda la documentación del proyecto.

## 1. Idioma y estilo

| Regla         | Valor                         |
| ------------- | ----------------------------- |
| Idioma        | Español                       |
| Tono          | Técnico, directo, sin relleno |
| Tiempo verbal | Presente                      |
| Unidades      | Sistema Internacional         |

## 2. Archivos y enlaces

| Elemento        | Convención                               |
| --------------- | ---------------------------------------- |
| Carpetas        | `NN-area/` en minúsculas                 |
| Archivos        | `kebab-case.md`                          |
| Identificadores | `DOC-AREA-NNN`                           |
| Enlaces         | Relativos al repositorio                 |
| Imágenes | `assets/` junto al documento que las usa |
| Marcadores reemplazables | `{elemento}` |

## 3. Tablas y listas

| Regla                 | Valor                         |
| --------------------- | ----------------------------- |
| Encabezados           | Obligatorios                  |
| Celdas vacías         | Permitidas solo en plantillas |
| Anidamiento de listas | Máximo dos niveles            |

## 4. Diagramas

| Necesidad                           | Notación            |
| ----------------------------------- | ------------------- |
| Contexto, contenedores, componentes | PlantUML C4         |
| Flujos e interacciones              | PlantUML secuencia  |
| Estados                             | PlantUML estados    |
| Entidades y relaciones              | PlantUML clases     |
| Despliegue                          | PlantUML despliegue |

## 5. Commits y cambios documentales

| Tipo             | Prefijo                     |
| ---------------- | --------------------------- |
| Documento nuevo  | `docs({área}):`             |
| Corrección       | `docs({área}): fix`         |
| Reestructuración | `docs({área}): restructure` |
