---
id: DOC-REQ-001
titulo: Requisitos funcionales
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# Requisitos funcionales

> **Definición:** Documento que registra y clasifica las capacidades funcionales que el sistema debe proporcionar.

## 1. Convenciones de prioridad

MoSCoW: `must`, `should`, `could`, `won't`. Estado: `propuesto`, `aceptado`, `implementado`, `descartado`.

## 2. Registro de requisitos

| ID | Requisito | Actor | Prioridad | Estado | Origen |
| --- | --- | --- | --- | --- | --- |
| RF-001 | Crear `Organization`, gestionar varios `Venue`s y cambiar entre ellos | `OrganizationAdmin` | must | aceptado | Entrevista 2026-11-25 |
| RF-002 | Asignar `Manager`, `Chef` y `Waiter` por `Venue`, con historial de vigencia | `OrganizationAdmin` | must | aceptado | ADR-0005 |
| RF-003 | Crear y editar `Catalog`s por `Venue`, con exactamente uno por defecto; los items llevan `Tag`s intrínsecas | `Manager`, `Chef` | must | aceptado | Entrevista 2026-11-25 |
| RF-004 | Crear `Product`s con precio fijo o de mercado, etiquetas y disponibilidad | `Manager`, `Chef` | must | aceptado | Entrevista 2026-11-25 |
| RF-005 | Componer `Menu`s dentro de una `Catalog` con precio base mínimo, grupos con mínimo/máximo de selecciones y complementos por opción | `Manager`, `Chef` | must | aceptado | Entrevista 2026-11-25 |
| RF-006 | Publicar la carta de un `Venue` en una URL con QR, idioma del navegador si está soportado y selector de idioma | `Diner` | must | aceptado | Entrevista 2026-11-25 |
| RF-007 | Traducir automáticamente y almacenar; título original con traducción entre paréntesis; alérgenos en inglés con traducción entre paréntesis | Sistema | must | aceptado | Entrevista 2026-11-25 |
| RF-008 | Declarar alérgenos, firmar por `Chef` y permitir firma del `Manager` solo con `Delegation` vigente y doble confirmación; mostrar icono, nombre inglés, traducción y aviso “declarado por el restaurante” | `Chef`, `Manager` | must | aceptado | ADR-0005 |
| RF-009 | Importar carta desde foto o PDF y generar borrador editable; sin sugerir alérgenos | `Manager`, `Chef` | must | aceptado | Entrevista 2026-11-25 |
| RF-010 | Mejorar fotos con IA conservando el original y exigiendo aprobación del `Chef` | `Chef` | must | aceptado | Entrevista 2026-11-25 |
| RF-011 | Cobrar suscripción por `Venue`, con prueba de 14 días y opción mensual o anual | `OrganizationAdmin` | must | aceptado | Entrevista 2026-11-25 |
| RF-012 | Exportar evidencia de firma, delegación, sello de tiempo y versión firmada | `OrganizationAdmin` | must | aceptado | ADR-0005 |
| RF-013 | Servir la carta pública sin cuenta de `Diner` y sin pedir datos personales | `Diner` | must | aceptado | Entrevista 2026-11-25 |
| RF-014 | Re-firmar cualquier declaración de alérgenos cuyo contenido cambie | `Chef`, `Manager` | must | aceptado | ADR-0005 |
| RF-015 | Carrito efímero de comanda: seleccionar `Product`s y `Menu`s, opciones y complementos, calcular el precio final y mostrar un resumen; no se persiste ni se envía | `Diner` | must | aceptado | Entrevista 2026-11-25 |
| RF-016 | Publicar una `Catalog` solo tras validación humana y firma de alérgenos vigente; estado borrador/publicado | `Chef`, `Manager` | must | aceptado | Entrevista 2026-11-25 |
| RF-017 | Permitir al `Waiter` actualizar disponibilidad con registro de autor | `Waiter` | must | aceptado | Entrevista 2026-11-25 |
| RF-018 | Crear una revisión inmutable por publicación y conservar el historial completo consultable | `Chef`, `Manager` | must | aceptado | Entrevista 2026-11-25 |

## 3. Requisitos por módulo

| Módulo | Requisitos |
| --- | --- |
| Organización y acceso | RF-001, RF-002, RF-011 |
| Cartas y productos | RF-003, RF-004, RF-005 |
| Carta pública e idiomas | RF-006, RF-007, RF-013 |
| Comanda | RF-015 |
| Alérgenos y evidencia | RF-008, RF-012, RF-014 |
| Onboarding con IA | RF-009, RF-010 |

## 4. Referencias

| ID | Documento | Relación |
| --- | --- | --- |
| ADR-0005 | [Asignaciones y delegación](../03-arquitectura/adr/ADR-0005-asignaciones-y-delegacion.md) | Roles |
