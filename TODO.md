# Fluent Editor — Project Plan (updated)

> [!IMPORTANT]
> This file is maintained with AI assistance; it may contain mistakes. Treat as a working plan.

## Recently completed

- [x] Real-time node sync: use built-in `Node["id"]` (no custom id types)
  - Hook: `src/hooks/use-node-sync.ts`
  - Removed legacy `Dimensions/measured` handling in the sync layer
  - Debounced updates with conflict retries and local-state merge before DB write
- [x] Live query wiring for nodes/edges
  - `src/hooks/use-live-query.ts` consumed in `node-canvas-container.tsx`
- [x] Baseline data sanitization on read for canvas payloads
  - `sanitizeNodes` / `sanitizeEdges` exist in `src/components/node-canvas-container.tsx`

## High-impact next steps

### 1) Align types across sync context and hooks

- [ ] Change `NodeSyncContext` to accept `nodeId: Node["id"]` (not `string`)
  - File: `src/hooks/use-update-node-data.ts`
  - Interface today: `scheduleSync: (nodeId: string, changes: Partial<Node>) => void;`
  - Target: `scheduleSync: (nodeId: Node["id"], changes: Partial<Node>) => void;`
- [ ] Ensure all callsites pass `Node["id"]` (React Flow changes already do)

### 2) Remove remaining dimension/measured usages

- [ ] `src/components/node-canvas-container.tsx`: drop the `dimensions` change branch or migrate it to a no-op
  - Today:
    ```ts
    } else if (change.type === "dimensions") {
      scheduleSync(change.id, { measured: change.dimensions });
    }
    ```
  - Target: remove this block (node dimensions are static in DB)

### 3) Sanitize on write (before DB)

- [ ] Add `sanitizeChangesForDb(changes)` and call it at the start of `patchNode`
  - File: `src/hooks/use-node-sync.ts`
  - Validate: `id` present, `position` has numeric x/y, `data` is plain object, strip UI-only fields
  - Optional: introduce a zod schema if `data` becomes complex

### 4) Consolidate node merging

- [ ] Extract a pure helper `mergeNodeWithChanges(node, changes)`
  - New file: `src/lib/utils/merge-node.ts`
  - Use it in both:
    - `src/hooks/use-node-sync.ts` (when building `nextNodes`)
    - `src/hooks/use-update-node-data.ts` (when updating local state)
  - Decide shallow vs deep merge for `data` (start shallow)

### 5) Tighten read-time sanitization (optional but recommended)

- [ ] Keep sanitizers but enforce string ids and valid positions
  - File: `src/components/node-canvas-container.tsx`
  - Keep `satisfies Node` so TS checks shape without runtime cast proliferation
  - Add dev-only warn when discarding malformed items (helps spot bad records)

### 6) Edges sync parity

- [ ] Review `src/hooks/use-edge-sync.ts` to match node sync patterns
  - Debounce, conflict retries, and optional sanitize-on-write for edges

## Canvas and UX

- [ ] Event editor ergonomics
  - [ ] Context menu on nodes (duplicate, delete, convert type)
  - [ ] Grid snapping and alignment helpers
  - [ ] Mini-map and controls toggle via settings
- [ ] Custom nodes
  - [ ] Build initial node set (Show Text, Conditional, Move, etc.) under `src/components/nodes/`

## Persistence and schema

- [ ] SurrealDB schema/validation strategy
  - [ ] Add server-side validation or a gateway to enforce allowed node shape
  - [ ] Plan migrations for future breaking changes (ids remain strings)

## Quality gates and tests

- [ ] Type and lint gate
  - [ ] Ensure `NodeSyncContext` type alignment and no lingering `any`
- [ ] Minimal tests (unit/smoke)
  - [ ] `mergeNodeWithChanges` unit tests (data merge, position merge)
  - [ ] `sanitizeNodes`/`sanitizeEdges` happy-path + malformed cases

## Developer notes

- Filenames: keep kebab-case across the repo
- TypeScript: strict, prefer `Node["id"]` instead of custom aliases
- Avoid UI-only fields in DB writes; sanitize on read and write

---

If you want, I can immediately:

1. Align `NodeSyncContext` to `Node["id"]` and remove the `dimensions` branch in `node-canvas-container.tsx`.
2. Add `sanitizeChangesForDb` and a tiny `mergeNodeWithChanges` helper.

Say “apply 1”, “apply 2”, or “apply both” and I’ll commit the changes.
