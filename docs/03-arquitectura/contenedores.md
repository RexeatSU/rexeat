---
id: DOC-ARQ-003
titulo: Contenedores (C4 nivel 2)
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# Contenedores (C4 nivel 2)

> **Definición:** Vista C4 de nivel 2 que descompone el sistema en contenedores desplegables con su responsabilidad, tecnología y comunicación.

## 1. Contenedores

| ID | Contenedor | Responsabilidad | Tecnología | Despliegue |
| --- | --- | --- | --- | --- |
| WEB | Aplicación web | Carta pública, backoffice, tRPC y webhooks | Next.js + TypeScript | Vercel |
| WORKER | Trabajos | Traducción, IA, webhooks y reintentos | Cola gestionada | Proveedor gestionado |
| DB | Base de datos | Datos de negocio, revisiones y evidencia | PostgreSQL + Drizzle | Proveedor gestionado UE |
| STORAGE | Objetos | Fotos, PDFs y audit trail inmutable | S3-compatible + Object Lock | Proveedor UE |

## 2. Diagrama de contenedores

```plantuml
@startuml
!include <C4/C4_Container>
title Contenedores (C4 nivel 2)

Person(diner, "Diner", "Comensal anónimo")
Person(staff, "Staff", "OrganizationAdmin, Manager, Chef, Waiter")

System_Boundary(rexeat, "Rexeat") {
  Container(web, "Aplicación web", "Next.js + TypeScript", "Carta pública, backoffice, tRPC y webhooks")
  Container(worker, "Worker de trabajos", "Cola gestionada", "Traducción, IA, webhooks y reintentos")
  ContainerDb(db, "PostgreSQL", "PostgreSQL + Drizzle", "Datos de negocio, revisiones y evidencia")
  Container(storage, "Almacenamiento de objetos", "S3-compatible + Object Lock", "Fotos, PDFs y audit trail")
}

System_Ext(clerk, "Clerk", "Autenticación y organizaciones")
System_Ext(paddle, "Paddle", "Suscripciones y facturación")
System_Ext(yousign, "Yousign", "Firma AES/QES")
System_Ext(deepl, "DeepL", "Traducción")
System_Ext(ai, "Proveedores IA", "Visión e imagen")

Rel(diner, web, "Lee carta y carrito", "HTTPS")
Rel(staff, web, "Gestiona cartas y alérgenos", "HTTPS")
Rel(web, db, "Lee y escribe", "SQL")
Rel(web, storage, "Sube y descarga", "S3")
Rel(web, worker, "Encola trabajos", "Job")
Rel(worker, db, "Actualiza", "SQL")
Rel(worker, storage, "Escribe", "S3")
Rel(web, clerk, "Autentica", "OIDC")
Rel(web, paddle, "Cobra", "API/Webhook")
Rel(web, yousign, "Firma", "API/Webhook")
Rel(worker, deepl, "Traduce", "HTTPS")
Rel(worker, ai, "Extrae y mejora", "HTTPS")
@enduml
```

## 3. Comunicación

| Origen | Destino | Protocolo | Datos | Sincronía |
| --- | --- | --- | --- | --- |
| WEB | DB | SQL | Negocio y evidencia | Sí |
| WEB | STORAGE | S3 | Fotos y PDFs | Sí |
| WEB | WORKER | Cola | Jobs de traducción/IA | No |
| WEB | Clerk | OIDC | Sesión y organización | Sí |
| WEB | Paddle | API/Webhook | Suscripción | Mixta |
| WEB | Yousign | API/Webhook | Firma | Mixta |
| WORKER | DeepL | HTTPS | Textos | No |
| WORKER | IA | HTTPS | Cartas y fotos | No |

## 4. Referencias

| ID | Documento |
| --- | --- |
| ADR-0010 | [App única y tRPC](adr/ADR-0010-app-unica-y-trcp.md) |
