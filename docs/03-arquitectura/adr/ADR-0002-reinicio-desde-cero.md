---
id: ADR-0002
titulo: Reinicio desde cero con el legacy como evidencia
version: 1.0.0
estado: aceptado
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# ADR-0002: Reinicio desde cero con el legacy como evidencia

> **Definición:** Registra que Rexeat se reconstruye desde cero y que el intento legacy se usa como evidencia, no como base de código ni de modelo.

## 1. Estado

`aceptado`

## 2. Contexto

El intento legacy dejó dos modelos de dominio incompatibles (menú compuesto frente a contenedor de categorías), dos stacks sin consolidar (Astro estático frente a monorepo pnpm/Turborepo/Drizzle) y documentación normativa fuera del repositorio. El tag `archive/pre-restart-2026-11-25` no contiene el código: solo documentación. El producto sigue siendo el mismo: carta digital multi-tenant con traducción y alérgenos.

## 3. Decisión

El proyecto se reconstruye desde cero. El legacy —tag, historia y ramas `feat/*`— se trata como evidencia: catálogo de decisiones previas, errores conocidos y vocabulario de negocio. Ninguna entidad, esquema, stack ni decisión legacy se hereda sin un ADR propio que la justifique.

## 4. Alternativas consideradas

| Alternativa | Ventajas | Inconvenientes | Descartada por |
|---|---|---|---|
| Continuar el monorepo legacy | Trabajo previo reutilizable | Arrastra dos modelos y dos stacks; sin baseline consolidado | Coste de reconciliación mayor que reconstruir |
| Recuperar solo el MVP de `feat/*` | Código existente | Dependencias y decisiones no auditadas; ramas sin consolidar | Hereda decisiones sin trazabilidad |
| Reinicio desde cero con legacy como evidencia | Modelo y stack decididos explícitamente | Se pierde código reutilizable | — |

## 5. Consecuencias

| Tipo | Descripción |
|---|---|
| Positivas | Un único modelo canónico, un stack decidido por ADR y documentación versionada desde el día uno |
| Negativas | Reimplementación de onboarding, traducción y alérgenos |
| Riesgos | El tag no conserva el código; la recuperación depende de `7e05d3f` y ramas no consolidadas |

## 6. Referencias

| ID | Documento |
|---|---|
| DOC-ARQ-006 | [Modelo de datos](../modelo-datos.md) |
| — | `docs/00-audit-baseline.md` |
| — | `git tag archive/pre-restart-2026-11-25` |
