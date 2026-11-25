---
id: ADR-0010
titulo: Una app Next.js, tRPC y aislamiento por aplicación
version: 1.0.0
estado: aceptado
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# ADR-0010: Una app Next.js, tRPC y aislamiento por aplicación

> **Definición:** Fija una sola app en el monorepo, tRPC para el backoffice, route handlers para webhooks y un único punto de filtrado por organización.

## 1. Estado

`aceptado`

## 2. Contexto

El piloto es de 10 `Venue`s. Separar carta y backoffice en dos apps añade despliegues, dominios y configuración sin resolver un problema actual. La seguridad entre organizaciones sí es un límite real: un filtro olvidado expone personal o facturación.

## 3. Decisión

- Una app `apps/web` con Next.js: carta pública, backoffice y route handlers. Route groups separan superficies; no hay segundo despliegue.
- Paquetes compartidos: `db`, `types`, `ui`, `ai`, `translations`, `config`.
- tRPC para el backoffice. Route handlers solo para QR, webhooks y endpoints públicos mínimos.
- Sin API pública versionada en v1.
- Todo acceso a datos pasa por un repositorio que exige `organizationId`; tests cross-tenant obligatorios. RLS se añade cuando exista API externa o un segundo equipo.
- Traducción, IA y webhooks se ejecutan en una cola gestionada con reintentos e idempotencia.

## 4. Alternativas consideradas

| Alternativa | Ventajas | Inconvenientes | Descartada por |
|---|---|---|---|
| Dos apps | Aísla despliegues y carga | Dos despliegues y configuración duplicada | El piloto no lo necesita |
| REST/OpenAPI | Contrato explícito | Más ceremonia y código | tRPC cubre el backoffice |
| RLS desde v1 | Defensa en profundidad | Más políticas y migraciones | Se pospone con trigger claro |
| Cron + tabla de jobs | Sin proveedor nuevo | Más código y reintentos propios | Menos mantenimiento con cola gestionada |

## 5. Consecuencias

| Tipo | Descripción |
|---|---|
| Positivas | Un despliegue, menos código y un único punto de aislamiento |
| Negativas | Un deploy del backoffice puede afectar a la carta; se mitiga con caché y pruebas |
| Riesgos | Filtro olvidado en el repositorio; los tests cross-tenant son obligatorios |

## 6. Referencias

| ID | Documento |
|---|---|
| DOC-ARQ-003 | [Contenedores](../contenedores.md) |
