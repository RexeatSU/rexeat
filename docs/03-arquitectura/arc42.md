---
id: DOC-ARQ-001
titulo: Arquitectura del sistema (arc42)
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# Arquitectura del sistema (arc42)

> **Definición:** Documento maestro de arquitectura que describe el sistema según la estructura arc42, desde objetivos y restricciones hasta conceptos transversales, calidad y riesgos.

## 1. Introducción y objetivos

Rexeat es una carta digital multi-idioma con alérgenos firmados y onboarding IA para restaurantes pequeños. El objetivo de v1 es validar 10 `Venue`s en Cantabria..

## 2. Restricciones

- Información alimentaria: Reglamento (UE) 1169/2011 y Real Decreto 126/2015.
- Firma: eIDAS; AES por defecto, QES opt-in.
- RGPD; cliente responsable del contenido, Rexeat encargado.
- Datos y proveedores con residencia UE cuando exista.
- Equipo pequeño: servicios gestionados y una sola app.

## 3. Contexto y alcance

Actores y sistemas externos en [contexto.md](contexto.md). El `Diner` es anónimo; el comprador es la `Organization`.

## 4. Estrategia de solución

Monolito modular Next.js en un monorepo TypeScript, tRPC para backoffice y servicios gestionados para identidad, cobro, firma, traducción e IA. Puertos para proveedores sustituibles. Aislamiento por `organizationId` en un único repositorio.

## 5. Vista de bloques

- [Contenedores](contenedores.md)
- [Componentes](componentes.md)
- [Modelo de dominio](modelo-dominio.md)
- [Modelo de datos](modelo-datos.md)

## 6. Vista de ejecución

- Carta pública: render en servidor y caché; nunca depende de IA ni traducción en vivo.
- Backoffice: tRPC con sesión Clerk y filtro por organización.
- Onboarding: subida a object storage, job de IA, borrador revisado y firma.
- Webhooks: Yousign y Paddle se guardan antes de procesar, con idempotencia.

## 7. Vista de despliegue

Una app en Vercel, PostgreSQL gestionado en la UE, object storage con Object Lock, cola gestionada y proveedores externos. Ver [contenedores.md](contenedores.md).

## 8. Conceptos transversales

| Concepto | Regla |
| --- | --- |
| Tenancy | Filtro por `organizationId` en repositorio; tests cross-tenant |
| Idioma | Origen por `Catalog`; original + traducción entre paréntesis; alérgenos en inglés |
| Dinero | Enteros de céntimos + moneda; EUR en v1 |
| Firma | AES gestionada; QES opt-in; re-firma al cambiar contenido |
| Historial | Revisión inmutable por publicación |
| Evidencia | Copia propia con Object Lock; retención 6 años |

## 9. Decisiones arquitectónicas

[Índice de ADR](adr/README.md).

## 10. Requisitos de calidad

[Requisitos no funcionales](../02-requisitos/requisitos-no-funcionales.md).

## 11. Riesgos y deuda técnica

- Dependencia de proveedores gestionados y sus precios.
- Filtro de tenant olvidado; se cubre con tests.
- IA que alucina datos; no publica sin revisión humana.
- Deploy único puede afectar carta y backoffice a la vez.

## 12. Glosario

[Glosario](../00-gobernanza/glosario.md).
