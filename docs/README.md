---
id: DOC-IDX-000
titulo: Índice de documentación
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: ""
clasificacion: interno
---

# Documentación del proyecto

> **Definición:** Punto de entrada único a la documentación; fija la estructura, los metadatos, el ciclo de vida y los estándares aplicados.

## 1. Estructura

| Carpeta            | Contenido                                                             |
| ------------------ | --------------------------------------------------------------------- |
| `00-gobernanza/`   | Control documental, glosario, convenciones y plantillas               |
| `02-requisitos/`   | Requisitos funcionales y no funcionales, casos de uso y trazabilidad  |
| `03-arquitectura/` | Documento arc42, vistas C4, dominio, datos, integraciones, API y ADR  |
| `04-diseno/`       | Diseño de experiencia de usuario y estándares de código               |
| `05-calidad/`      | Estrategia y plan de pruebas, criterios de aceptación y deuda técnica |
| `08-gestion/`      | Changelog y releases                                                   |
| `09-manuales/`     | Manual de usuario                                                      |

`docs/internal/` es un submódulo privado (`RexeatSU/Documentacion-Rexeat`, rama `main`). Tiene `update = none`: un clon con `--recurse-submodules` no falla si no tienes acceso. Si tienes permisos, inicialízalo con `git submodule update --init --checkout docs/internal`.

## 2. Esquema de metadatos

Todo documento comienza con este bloque YAML:

```yaml
---
id: DOC-AREA-000        # ÁREA: IDX, GOB, NEG, REQ, ARQ, DIS, CAL, SEG, OPS, GES, MAN, REU
titulo: ""
version: 0.1.0          # SemVer: MAYOR cambio estructural, MENOR contenido, PATCH corrección
estado: borrador        # borrador | en-revision | aprobado | obsoleto
propietario: ""
revisores: []
ultima-revision: ""     # ISO 8601: YYYY-MM-DD
clasificacion: interno  # publico | interno | confidencial
---
```

## 3. Ciclo de vida

| Estado        | Criterio de entrada               | Quién transiciona |
| ------------- | --------------------------------- | ----------------- |
| `borrador`    | Documento creado desde plantilla  | Autor             |
| `en-revision` | Contenido completo para revisión  | Autor             |
| `aprobado`    | Revisores y propietario conformes | Propietario       |
| `obsoleto`    | Sustituido o fuera de vigencia    | Propietario       |

## 4. Nomenclatura

- Archivos y carpetas en `kebab-case`, sin acentos ni espacios.
- Fechas en ISO 8601 (`YYYY-MM-DD`).
- Identificadores estables: `DOC-AREA-NNN`, `ADR-NNNN`, `REQ-NNN`, `RSK-NNN`.
- Enlaces internos relativos entre documentos.
- Marcadores reemplazables con llaves: `{elemento}`.
- Diagramas en PlantUML; C4 para arquitectura, secuencia para flujos.

## 5. Estándares de referencia

| Área               | Estándar                  |
| ------------------ | ------------------------- |
| Requisitos         | ISO/IEC/IEEE 29148        |
| Arquitectura       | arc42 + modelo C4         |
| Decisiones         | ADR (formato Nygard)      |
| Ciclo de vida      | ISO/IEC/IEEE 12207        |
| Pruebas            | ISO/IEC/IEEE 29119        |
| Seguridad          | ISO/IEC 27001, STRIDE     |
| Gestión de cambios | Keep a Changelog + SemVer |

## 6. Creación de un documento

1. Copiar la plantilla correspondiente de `00-gobernanza/plantillas/`.
2. Asignar `id`, `titulo` y `propietario`.
3. Registrar el documento en `00-gobernanza/control-documental.md`.
4. Completar secciones y enviar a revisión.
