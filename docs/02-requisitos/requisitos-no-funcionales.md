---
id: DOC-REQ-002
titulo: Requisitos no funcionales
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# Requisitos no funcionales

> **Definición:** Documento que registra las restricciones de calidad del sistema con métricas y criterios de verificación.

## 1. Categorías

| Categoría | Descripción |
| --- | --- |
| Seguridad | Firma, integridad, no repudio y control de acceso |
| Privacidad | RGPD, minimización y `Diner` anónimo |
| Legal | Información alimentaria y firma electrónica |
| Internacionalización | Origen por `Catalog`, traducción y visualización bilingüe |
| Accesibilidad | Uso desde móvil y lectores de pantalla |
| Disponibilidad | Carta pública consultable en servicio |
| Rendimiento | Carga rápida en móvil y generación de borradores |
| Auditabilidad | Evidencia conservada y exportable |

## 2. Registro

| ID | Categoría | Requisito | Métrica | Objetivo | Verificación |
| --- | --- | --- | --- | --- | --- |
| RNF-001 | Seguridad | Toda declaración de alérgenos publicada tiene firma AES o QES, identidad verificada, sello de tiempo, audit trail y evidencia no repudiable conservada por Rexeat | Declaraciones sin evidencia completa | 0 | Consulta de auditoría |
| RNF-002 | Legal | La información de alérgenos está disponible antes de la compra y en idioma comprensible | Cobertura de cartas | 100 % | Revisión de carta pública |
| RNF-003 | Privacidad | El `Diner` no necesita cuenta ni cede datos personales para leer la carta | Datos personales recogidos | 0 | Revisión de flujo |
| RNF-004 | Internacionalización | El origen se declara por `Catalog`; los alérgenos se muestran en inglés fijo con traducción entre paréntesis | Campos con formato correcto | 100 % | Pruebas de renderizado |
| RNF-005 | Accesibilidad | La carta pública cumple WCAG 2.2 AA | Auditoría | AA | Auditoría automática y manual |
| RNF-006 | Disponibilidad | La carta pública sigue disponible ante fallo de traducción o IA | Degradación | Contenido original | Prueba de fallo |
| RNF-007 | Rendimiento | La carta pública carga en móvil en un tiempo aceptable | LCP | {} | Medición real |
| RNF-008 | Auditabilidad | La evidencia de firma y delegación es inmutable y exportable | Exportaciones verificables | 100 % | Prueba de exportación |
| RNF-009 | Seguridad | El acceso de personal usa Clerk con passkeys; la firma AES/QES la gestiona Yousign | Método de acceso | Passkey + Yousign | Revisión técnica |
| RNF-010 | IA | La IA no declara alérgenos ni altera el producto real de una foto | Campos inferidos | 0 | Revisión de pipeline |
| RNF-011 | Legal | DPA, términos, privacidad y lista de subencargados publicados antes del primer cobro | Documentos publicados | 100 % | Revisión legal |
| RNF-012 | Legal | Transferencias internacionales cubiertas con SCC/TIA cuando el proveedor no esté en la UE | Proveedores cubiertos | 100 % | Auditoría de proveedores |
| RNF-013 | Disponibilidad | PostgreSQL con PITR 7 días y snapshot diario 30 días; RPO 5 min, RTO 4 h | Restauración | Trimestral | Prueba documentada |
| RNF-014 | Auditabilidad | Evidencia firmada e historial de publicaciones en almacenamiento inmutable con hash | Objetos verificables | 100 % | Prueba de Object Lock |
| RNF-015 | Seguridad | Todo acceso a datos filtra por `organizationId` en un único repositorio | Fugas cross-tenant | 0 | Tests cross-tenant |

## 3. Restricciones técnicas

- La traducción y la IA no pueden ser un punto único de fallo para la carta pública.
- La evidencia firmada se conserva aunque el `Venue` cancele la suscripción, según la política de retención.
- Los datos y ficheros se alojan en la UE.

## 4. Referencias

| ID | Documento | Relación |
| --- | --- | --- |
