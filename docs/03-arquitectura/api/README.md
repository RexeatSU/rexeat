---
id: DOC-ARQ-008
titulo: API
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# API

> **Definición:** Contrato interno de la aplicación: routers tRPC, route handlers y webhooks.

## 1. Convenciones

- tRPC para backoffice; tipos compartidos entre cliente y servidor.
- Route handlers solo para carta pública, QR, health y webhooks.
- Sin API pública versionada en v1.
- Errores con código estable y mensaje humano; sin filtrar datos de otra organización.
- Idempotencia en webhooks por identificador del proveedor.

## 2. Autenticación y autorización

- Clerk emite la sesión; el servidor resuelve `Account` y `Organization`.
- Cada router exige `organizationId` y comprueba `Assignment` o `OrganizationAdmin`.
- La firma de alérgenos exige `Delegation` vigente o `Chef`.

## 3. Catálogo de endpoints

| Método | Ruta | Descripción | Estado |
| --- | --- | --- | --- |
| GET | `/q/{venueSlug}` | Carta pública por QR | v1 |
| GET | `/q/{venueSlug}/{catalogSlug}` | Carta concreta | v1 |
| GET | `/api/health` | Estado del servicio | v1 |
| POST | `/api/webhooks/yousign` | Firma completada | v1 |
| POST | `/api/webhooks/paddle` | Suscripción | v1 |
| tRPC | `organization.*` | Empresa y facturación | v1 |
| tRPC | `venue.*` | Locales | v1 |
| tRPC | `catalog.*` | Cartas y publicación | v1 |
| tRPC | `product.*` | Productos, etiquetas y disponibilidad | v1 |
| tRPC | `menu.*` | Menús y grupos de opciones | v1 |
| tRPC | `allergen.*` | Declaración, firma y evidencia | v1 |
| tRPC | `import.*` | Importación IA | v1 |
| tRPC | `billing.*` | Suscripción y portal | v1 |

## 4. Contrato

El contrato interno son los tipos de los routers y el esquema Drizzle. `openapi.yaml` queda reservado para una API pública futura; no se publica en v1.

## 5. Referencias

| ID | Documento |
| --- | --- |
| DOC-ARQ-005 | [Modelo de dominio](../modelo-dominio.md) |
| ADR-0010 | [App única y tRPC](../adr/ADR-0010-app-unica-y-trcp.md) |
