# 00 — Audit Baseline (Fase 0)

Estado real del código frente a la especificación v1. Sin cambios de código.

## Fuentes

- Spec v1 (Escritorio, fuera del repo): `prd_y_estrategia_de_producto_v1.md`, `dise_o_t_cnico_arquitectura_y_esquema_de_datos_tdd.md`, `modelo_de_dominio_ciclos_de_vida_y_contratos.md`, `gobernanza_documental_adrs_y_checklist.md`, `plan_maestro_de_ejecuci_n_para_el_agente.md`, `prompt_de_arranque_para_tu_agente.md`.
- Repo: `/Users/midas/Development/rexeat`, rama `develop` (HEAD local `7f403ed`).
- Remotos: `origin` (`fetch --prune` ejecutado en esta fase; solo actualiza refs remotas).

Los documentos `00-AGENT-MASTER-PLAN.md` … `04-DOCS-GOVERNANCE-AND-TEMPLATES.md` citados por el prompt no existen. Se usan los 6 disponibles (ver OQ-10).

## 1. Estado de ramas

| Ref | Commit | Contenido |
|---|---|---|
| `develop` (local) | `7f403ed` | `58646d7` + commit vacío `7f403ed`. Sin `apps/`. Solo `documentation/` y `.gitignore`. |
| `58646d7` (local, **no pusheado**) | `feat: eliminar app y volver a la documentación` | Elimina `apps/carta/` (22 archivos, 1006 líneas: Astro, `types/alergeno.ts`, `menu.ts`, `producto.ts`, `plato.ts`). |
| `origin/develop` | `7e05d3f` | **Conserva `apps/carta/`** (app legacy Astro). Ancestro de `develop` local. |
| `origin/main` | `f1fa9ed` | Solo `.agents/`, `.gitignore`, `.gitmodules`, `GEMINI.md`, `docs/internal`, `skills-lock.json`. |
| `origin/feat/*` | 16 ramas | Código MVP (`apps/`, `packages/db`, `packages/types`). Ninguna consolidada. |

Corrección al plan: la base de develop es `7e05d3f` en origin, no `58646d7`. El código legacy no está "solo en feat/*": también está en `origin/develop` (`apps/carta`).

## 2. Contraste código vs spec v1

| Área | Spec v1 | Código / legacy | Estado | Evidencia |
|---|---|---|---|---|
| Alérgenos (catálogo) | 14 UE canónicos (`allergens_master`, `eu_14_flag`) — TDD §3.1 | `feat/*` `packages/types/src/allergens.ts`: 14 UE en snake_case (`gluten`, `crustaceos`, … `dioxido_azufre`, `altramuces`, `moluscos`) | Conteo conforme; naming distinto | `git show origin/feat/allergen-safety-engine:packages/types/src/allergens.ts` |
| Alérgenos (legacy) | — (no es spec) | Enum 8 MAYÚSCULAS (`GLUTEN`…`SULFITOS`) en `documentation/modelo_de_dominio.puml` (develop) y `apps/carta/src/types/alergeno.ts` (`origin/develop`) | Legacy, contradice TDD | `git show origin/develop:apps/carta/src/types/alergeno.ts` |
| Verificación de alérgenos | `verified_at` + `verified_by` (ID Cliente) obligatorios — TDD §5, dominio §2.2 | Solo `allergensConfirmed: boolean` (`schema.ts`, `index.ts`). Sin timestamp ni autor | **Falta** | `grep verified_at` = 0 hits en todas las ramas |
| Estado de stock | `En Stock` / `Agotado`, transición 1 clic + undo 5 s — dominio §2.4, PRD RF-08 | `AvailabilityStatusSchema`: `in_stock`, `out_of_stock`, `hidden`, `temporarily_unavailable` | Divergente: mezcla stock con visibilidad | `feat/allergen-safety-engine` `allergens.ts` |
| Versionado de stock | `locals.stock_version` — TDD §2.1 | 0 coincidencias en todas las ramas | **Falta** | `git grep stock_version` |
| Telemetría Zero-PII | `anonymous_events` + pipeline — TDD §3.2, PRD RF-10 | 0 coincidencias en `apps/` y `packages/` de las 16 ramas feat. Las hits son `infra/penpot/docker-compose.yaml` y lockfiles `@opentelemetry` | **Falta** (el plan decía "8 de 16 ramas": incorrecto) | `git grep -E 'PII\|telemetr' origin/feat/* -- apps packages` |
| Moneda | `locals.base_currency`, `exchange_rates`, multimoneda — TDD §3.1, PRD | `packages/types/src/money.ts`: `Intl.NumberFormat("es-ES", currency: "EUR")` fijo. Precio `price: integer` sin sufijo `_cents` | Divergente | `money.ts` |
| Entidad Menú | `articles.type [PRODUCT\|MENU]`, `Artículo` como abstracción — TDD §3.1, dominio §1 | Legacy puml: `Menú` subclase de `Producto` (herencia). Legacy `apps/carta/types/menu.ts`: `Menú extends Producto`. Ninguna rama feat tiene entidad Menú en `schema.ts` | Divergente (conflicto legacy vs glosario) | `modelo_de_dominio.puml` líneas de herencia |
| Glosario | Canónico: `Artículo`, `Producto`, `Menú` (agrupación), `Categoría`, `Carta`, `Local` — dominio §1 | Sin `GLOSSARY.md` en el repo | **Falta** | `find docs` vacío |
| Plantilla de esquema | `docs/03-architecture/DATA-SCHEMA.md` — gobernanza | Inexistente | **Falta** | — |
| Docs de arquitectura | `docs/00..04` según gobernanza §árbol | Carpeta `docs/` no existe antes de esta fase | **Falta** | — |

Lectura de conjunto: el código en `feat/*` implementa la capa de alérgenos (14 UE + `allergensConfirmed`) y de disponibilidad, sin trazabilidad legal (`verified_at`/`verified_by`), sin telemetría, sin multimoneda y sin `stock_version`. No hay una rama consolidada que reúna estas piezas.

## 3. Legacy (listado, no tocado)

Estado del árbol de trabajo en `develop` (ya existente antes de Fase 0):

| Ruta | Estado | Acción propuesta |
|---|---|---|
| `documentation/` (completo) | Tracked en develop | Archivar tras decisión OQ-05 |
| `documentation/ModeloDominioRexeat.png` | Borrado (sin commit) | Decisión del usuario; no restaurar |
| `documentation/plato_ingredientes.puml` | Borrado (sin commit) | Decisión del usuario; no restaurar |
| `documentation/README.md` | Modificado (sin commit) | Pendiente del usuario |
| `documentation/modelo_de_dominio.puml` | Modificado (sin commit): quita `skinparam` | Pendiente del usuario |
| `documentation/TODO.md` | Sin trackear, vacío (0 líneas) | Pendiente |
| `documentation/diagrams/` | Sin trackear (`DetallePlato.png`, `plato-ingredientes.puml`) | Pendiente |
| `.DS_Store` | Sin trackear | Añadir a `.gitignore` si el usuario lo aprueba |
| `apps/carta/` | Eliminado en `58646d7` (local, no pusheado); presente en `origin/develop` | Decisión OQ-05 |

## 4. Open questions

| ID | Pregunta | Evidencia | Propuesta |
|---|---|---|---|
| OQ-01 | ¿Catálogo de alérgenos: 14 UE o 8? | TDD §3.1 dice 14; legacy puml y `apps/carta` dicen 8 | 14 UE (TDD). Descartar el enum de 8. |
| OQ-02 | ¿Estados de stock: `En Stock`/`Agotado` o los 4 de código? | Dominio §2.4 vs `AvailabilityStatusSchema` | Separar stock (2 estados) de visibilidad (`hidden` no es stock). |
| OQ-03 | ¿`verified_at`/`verified_by` obligatorios en cada alérgeno? | TDD §5 los exige; TDD §3.1 usa `verified_by_human_bool` (inconsistencia interna de la spec) | Exigir ambos campos; el booleano pasa a derivado. |
| OQ-04 | ¿Moneda: EUR fijo o multimoneda desde el inicio? | PRD y TDD §3.1 piden `base_currency` + `exchange_rates`; `money.ts` fija EUR | Multimoneda según spec; decidir en ADR-002. |
| OQ-05 | ¿Rama base y destino de `apps/carta`? | `origin/develop` = legacy; `58646d7` local sin pushear; 16 feat sin consolidar | Confirmar si `develop` se reconstruye desde `58646d7` (sin app) o si se parte de un feat concreto. |
| OQ-06 | ¿Telemetría Zero-PII entra en Fase 1? | 0 implementación en las 16 ramas | Incluir en el diseño de datos (TDD §3.2) aunque la implementación sea posterior. |
| OQ-07 | ¿`Menú` es `Artículo` tipado o subclase de `Producto`? | Dominio/TDD: tipo en `articles`; legacy puml: herencia | `Artículo` con `type`; el puml legacy se descarta. |
| OQ-08 | ¿Política de fotos IA: publicar `original_image_key`, `enhanced_image_key`, o ambas? | TDD §3.1 define las dos claves; sin regla de publicación explícita | Pendiente de definir; bloquear publicación sin validación humana (dominio §2.2). |
| OQ-09 | ¿Cómo se edita un plato ya publicado? | Dominio §3 (línea 81): edición solo si la Carta está en `Borrador` | Editar en `Borrador` (copia de trabajo); publicar tras revisión. |
| OQ-10 | ¿Mapeo de documentos 00–04 a los 6 disponibles? | Prompt y gobernanza citan 00–04; el Escritorio tiene 6 con otros nombres | Propuesto: `plan_maestro`→00, `prd`→01, `dise_o_tecnico`→02, `modelo_de_dominio`→03, `gobernanza`→04; `prompt` no se versiona. Confirmar. |

## 5. Discrepancias de proceso

- `7f403ed` es un commit vacío (un solo header en `git show --stat`), creado con plan mode activo y autorizado por el usuario. No altera el árbol.
- Los documentos 00–04 que cita el prompt no existen; se usan los 6 disponibles en el Escritorio.
- `auditoria_2026-04-30.md` (citada por el dominio) no existe ni en el repo ni en el Escritorio.
- El plan original tenía tres datos incorrectos, corregidos aquí: base de develop (`7e05d3f`, no `58646d7`), telemetría ("0 de 16", no "8 de 16"), y origen del enum de 8 alérgenos (legacy, no spec).
- `git fetch --all --prune` modificó refs remotas. No tocó el árbol de trabajo.

## 6. Verificación de Fase 0

- `git log -n 1` → `7f403ed`.
- `git status`: solo los cambios legacy de §3 y `docs/00-audit-baseline.md` (nuevo, sin commitear).
- Parada para confirmación del usuario antes de Fase 1.
