---
id: DOC-GOB-001
titulo: Control documental
version: 0.1.0
estado: borrador
propietario: ""
revisores: []
ultima-revision: ""
clasificacion: interno
---

# Control documental

> **Definición:** Registro maestro de documentos, versiones, estados y responsables; gobierna revisión, aprobación y retención.

## 1. Registro de documentos

| ID  | Título | Versión | Estado | Propietario | Última revisión |
| --- | ------ | ------- | ------ | ----------- | --------------- |
|     |        |         |        |             |                 |

## 2. Roles

| Rol         | Responsabilidad                     |
| ----------- | ----------------------------------- |
| Propietario | Mantiene vigencia y aprueba cambios |
| Autor       | Redacta y actualiza el contenido    |
| Revisor     | Verifica contenido y consistencia   |
| Aprobador   | Autoriza la publicación             |

## 3. Política de versionado

| Cambio                               | Incremento |
| ------------------------------------ | ---------- |
| Reestructuración o cambio de alcance | MAYOR      |
| Nuevo contenido sin ruptura          | MENOR      |
| Corrección editorial                 | PATCH      |

## 4. Revisión y aprobación

Solo ADR, requisitos, SLO y seguridad son normativos: un cambio requiere revisión y puede bloquear el merge. El resto de documentos es descriptivo y se corrige sin gate.

| Tipo de documento | Revisores mínimos | Vigencia de revisión                         |
| ----------------- | ----------------- | -------------------------------------------- |
| ADR               | 1                 | Permanente; se revisa si cambia la decisión  |
| Requisitos        | 1                 | Por release                                  |
| SLO               | 1                 | Trimestral                                   |
| Seguridad         | 1                 | Anual y tras incidente                       |
| Resto             | 0                 | Al modificarse                               |

## 5. Retención y archivo

| Clasificación | Retención | Destino al vencer |
| ------------- | --------- | ----------------- |
|               |           |                   |

## 6. Historial de cambios

| Versión | Fecha | Autor | Descripción |
| ------- | ----- | ----- | ----------- |
|         |       |       |             |
