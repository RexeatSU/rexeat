---
id: ADR-0005
titulo: Asignaciones por Venue y delegación de firma
version: 1.0.0
estado: aceptado
propietario: ""
revisores: []
ultima-revision: "2026-11-25"
clasificacion: interno
---

# ADR-0005: Asignaciones por Venue y delegación de firma

> **Definición:** Fija que los roles operativos van unidos al puesto de trabajo en un `Venue` y que un `Manager` solo firma alérgenos con una `Delegation` vigente de un `Chef`.

## 1. Estado

`aceptado`

## 2. Contexto

Un restaurante trabaja por local: el chef, el gerente y los camareros pueden cambiar de local o cubrir varios. La firma de alérgenos necesita identificar a una persona real y demostrar que quien firma tiene autoridad. Un rol global por empresa no representa esa realidad y un permiso que sigue a la persona al cambiar de local atribuye responsabilidad donde no corresponde.

## 3. Decisión

- No existe `Owner`. La `Organization` tiene `OrganizationAdmin`: rol de aplicación para facturación, altas de personal y configuración. No implica representación legal.
- `Manager`, `Chef` y `Waiter` son `Assignment`s: `(Account, Venue, Role)` con vigencia. Una persona puede tener varias asignaciones y un `Venue` puede tener varios `Chef` y varios `Manager`.
- La `Delegation` une un `Assignment` de `Chef` con uno de `Manager` del mismo `Venue`. Alcance `allergen:sign`, vigencia máxima de 12 meses y doble confirmación: la solicita cualquiera de las dos partes y ambas firman.
- Recordatorios a 30 y 7 días. La renovación exige nueva doble firma.
- La firma del `Manager` resuelve la delegación por el `Venue` que se está editando. Si hay varias, se desambigua; la firma registra `grantorAssignmentId` y `delegationId`.
- Revocan el `Chef`, el `Manager` o un `OrganizationAdmin`. También se revoca al terminar o cambiar el `Assignment` del `Chef`.
- Sin re-delegación.
- Cualquier alteración del contenido firmado invalida la firma anterior y exige una nueva.

## 4. Alternativas consideradas

| Alternativa | Ventajas | Inconvenientes | Descartada por |
|---|---|---|---|
| Rol global por `Organization` | Menos tablas | Un chef de un local podría firmar otro; responsabilidad difusa | No representa la operación real |
| Delegación a nivel de `Account` | Simple | El permiso sigue a la persona al cambiar de local | Rompe la atribución por puesto |
| Un solo `Chef` por `Venue` | Invariante simple | Ignora turnos, vacaciones y relevos | La realidad admite varios |
| `Owner` con todos los permisos | Figura reconocible | Confunde propiedad con administración de cuenta | Se sustituye por `OrganizationAdmin` |

## 5. Consecuencias

| Tipo | Descripción |
|---|---|
| Positivas | Atribución exacta por puesto, delegación verificable y revocación inmediata |
| Negativas | Más entidades y comprobaciones en cada firma |
| Riesgos | Cambios de plantilla sin revocar asignaciones; se mitiga con expiración y recordatorios |

## 6. Referencias

| ID | Documento |
|---|---|
| DOC-GOB-002 | [Glosario](../../00-gobernanza/glosario.md) |
