---
id: ADR-0003
titulo: Idioma de documentación y código
version: 1.0.0
estado: aceptado
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# ADR-0003: Idioma de documentación y código

> **Definición:** Fija español para la documentación, inglés para el código y el identificador de código como término canónico del glosario.

## 1. Estado

`aceptado`

## 2. Contexto

La documentación se escribe en español, pero el código y los identificadores serán 100 % en inglés. Sin una regla, el glosario y los documentos divergen del código, como ocurrió en el legacy con `Restaurante`/`Carta` frente a `organizations`/`products`.

## 3. Decisión

- La documentación se redacta en español; puede traducirse al inglés sin cambiar identificadores.
- El código, esquema, API y nombres de archivo técnicos se escriben en inglés.
- El término canónico del glosario es el identificador de código (`Organization`, `Venue`, `Product`). La definición puede ser española, pero el término no se traduce en contextos técnicos.
- Cada entrada del glosario declara sinónimos prohibidos en `_Avoid_`, en español y en inglés.

## 4. Alternativas consideradas

| Alternativa | Ventajas | Inconvenientes | Descartada por |
|---|---|---|---|
| Todo en español | Coherencia lectora | Código y documentación divergen | El código será inglés |
| Todo en inglés | Un solo idioma | Peor legibilidad para el equipo actual | La documentación se lee en español |
| Documentación ES, código EN, glosario anclado al código | Trazabilidad doc-código y lectura en español | Exige disciplina terminológica | — |

## 5. Consecuencias

| Tipo | Descripción |
|---|---|
| Positivas | Un término por concepto; el glosario sirve de puente entre negocio y código |
| Negativas | Los documentos mezclan términos ingleses con prosa española |
| Riesgos | Introducir traducciones oficiosas fuera del glosario |

## 6. Referencias

| ID | Documento |
|---|---|
| DOC-GOB-002 | [Glosario](../../00-gobernanza/glosario.md) |
| DOC-GOB-003 | [Convenciones](../../00-gobernanza/convenciones.md) |
