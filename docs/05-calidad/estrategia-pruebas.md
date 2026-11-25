---
id: DOC-CAL-001
titulo: Estrategia de pruebas
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# Estrategia de pruebas

> **Definición:** Define el enfoque, los niveles, los tipos y los criterios de automatización de las pruebas del proyecto.

## 1. Objetivos

Proteger los invariantes que causan daño real: aislamiento entre organizaciones, precio, disponibilidad y firma de alérgenos. No perseguir cobertura.

## 2. Niveles de prueba

| Nivel | Alcance | Responsable | Automatización |
| --- | --- | --- | --- |
| Unitario | Dominio: dinero, menús, delegaciones, revisiones | Desarrollo | Vitest |
| Integración | Repositorio, tRPC, migraciones, tenant | Desarrollo | Vitest + PostgreSQL |
| Contrato | Webhooks Yousign/Paddle, proveedores IA | Desarrollo | Tests de payload |
| E2E | Publicar carta, firmar alérgenos, importar, QR | Desarrollo | Playwright |
| Manual | Accesibilidad y carta en móvil real | Desarrollo | Checklist |

## 3. Tipos de prueba

| Tipo | Objetivo | Cuándo |
| --- | --- | --- |
| Aislamiento | Cero fugas entre organizaciones | Cada PR |
| Dinero | Céntimos, complementos y moneda correctos | Cada PR |
| Firma | Sin firma válida no se publica | Cada PR |
| Idempotencia | Webhooks repetidos no duplican evidencia | Cada PR |
| Migración | Migración aplicable y reversible | Cada PR |
| Accesibilidad | Carta usable con teclado y lector | Release |

## 4. Entornos y datos

- Base de datos efímera por ejecución; nunca producción.
- Factories con datos sintéticos; sin copias de cartas reales.
- Los tests cross-tenant crean dos `Organization` y comprueban que una no ve la otra.

## 5. Herramientas

| Herramienta | Propósito | Versión |
| --- | --- | --- |
| Vitest | Unitario e integración | {} |
| Playwright | E2E | {} |
| PostgreSQL | Integración real | {} |

## 6. Métricas y umbrales

| Métrica | Umbral | Fuente |
| --- | --- | --- |
| Fugas cross-tenant | 0 | Tests |
| Publicaciones sin firma | 0 | Tests de dominio |
| Flujos críticos E2E | 100 % en main | Playwright |

## 7. Referencias

| ID | Documento |
| --- | --- |
| DOC-ARQ-005 | [Modelo de dominio](../03-arquitectura/modelo-dominio.md) |
