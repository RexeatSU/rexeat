---
id: DOC-GOB-002
titulo: Glosario
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: ""
clasificacion: interno
---

# Glosario

> **Definición:** Vocabulario común del proyecto: términos de negocio, acrónimos y conceptos técnicos con una única definición aceptada.

## 1. Términos de negocio

| Término             | Definición                                                                                                                                  | Sinónimos prohibidos               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `Organization`      | Empresa que contrata el servicio; puede poseer uno o varios **Venue**s. Unidad de facturación y de membresía.                              | Restaurant group, Company, Tenant  |
| `OrganizationAdmin` | Rol de aplicación que gestiona facturación, altas de personal y configuración de la **Organization**; no implica representación legal.     | Owner, Administrator, Dueño        |
| `Venue`             | Establecimiento físico de una **Organization**; unidad operativa con sus propias **Catalog**s.                                              | Local, Restaurant, Location        |
| `Catalog`           | Carta: agrupación completa de todos los items de un **Venue**. Puede haber varias y exactamente una por defecto.                            | Menu, Carta, Menu list             |
| `Menu`              | Menú: item compuesto dentro de una **Catalog** que agrupa otros items bajo una promoción y un precio estable, fijo o variable.             | SetMenu, Combo, Catalog            |
| `Tag`               | Etiqueta intrínseca a un `Product` o `Menu` que describe su naturaleza (vacuno, vegano); no es una sección de la carta.                   | Category, Categoría, Section       |
| `Manager`           | Persona que dirige la operación de un **Venue**; puede solicitar o recibir una **Delegation** para firmar alérgenos.                        | Gerente, Encargado, Staff          |
| `Chef`              | Jefe de cocina: decide productos, recetas y alérgenos; firma declaraciones y puede delegar la firma en un **Manager**.                      | Cook, Kitchen, Responsable         |
| `Waiter`            | Camarero: consulta cartas y traducciones; puede marcar disponibilidad.                                                                     | Staff, Server, Camarero            |
| `Diner`             | Comensal que consulta la carta; no pertenece a la **Organization**.                                                                        | User, Customer, Comensal           |

## 2. Términos técnicos

| Término               | Definición                                                                                                                                 | Referencia |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `Assignment`          | Puesto de trabajo: vínculo entre una `Account` y un `Venue` con un rol `Chef`, `Manager` o `Waiter`, con vigencia.                        | —          |
| `Delegation`          | Delegación de firma entre dos `Assignment`s del mismo `Venue`: un `Chef` autoriza a un `Manager` a firmar alérgenos en su nombre, con doble confirmación y vigencia máxima de 12 meses. | —          |
| `Cart`                | Selección efímera del `Diner` con `Product`s, `Menu`s y opciones; calcula el precio y muestra un resumen, pero no crea pedido ni se envía. | —          |
| `AllergenResponsible` | `Assignment` de `Chef` que responde de las declaraciones que firma. Un `Venue` puede tener varios.                                        | ADR-0005 |

## 3. Acrónimos

| Acrónimo | Expansión |
| -------- | --------- |
|          |           |
