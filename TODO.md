# Fluent Editor — TODOs

> [!IMPORTANT]
> this file is modified with help of AI, it can contains errors or inacuracies

## Core Editor Structure

- [ ] **App Shell** (`src/app/layout.tsx`)
  - [x] Set up Next.js 16 app router structure
  - [x] Implement ThemeProvider (`src/components/theme-provider.tsx`)
  - [ ] Implement responsive layout (Sidebar + AppBar + StatusBar)
  - [ ] Add `AppSidebar` using shadcn `components/ui/sidebar`
  - [ ] Create modular routes (`/map-editor`, `/event-editor`,
        `/database-editor`)
  - [ ] Add dynamic title updates per editor

- [x] **MenuBar** (`src/components/menu-bar.tsx`,
      `src/components/ui/menubar.tsx`)
  - [x] Implement base MenuBar using shadcn `components/ui/menubar`
  - [x] Add File, Edit, View menu structure
  - [x] Add theme switcher integration (only logic for now)
  - [ ] Add window controls (close / minimize / maximize)
  - [ ] Implement draggable titlebar for future desktop build (electron, tauri?)

- [ ] **StatusBar** (`src/components/status-bar.tsx`)
  - [x] Base container with left/right item alignment
  - [x] `StatusBarItem` component with icon + label (Lucide, 16px)
  - [x] Add keyboard focus styles
  - [ ] Add customizable background themes (light/dark/muted)
  - [ ] Add optional `tooltip` prop to `StatusBarItem` (description / shortcut
        hint)
  - [ ] Add `StatusBarGroup` component for grouped items (e.g. coordinates)
  ```tsx
  <StatusBarGroup label="Coords">
      <StatusBarItem>X: 12</StatusBarItem>
      <StatusBarItem>Y: 8</StatusBarItem>
  </StatusBarGroup>;
  ```
  - [ ] Add plugin API for injecting custom items
        (`registerStatusItem({ side, component })` )

## Event Editor (React Flow-based)

- [x] Decide on node-based event structure (no modal-heavy flows)
- [ ] Implement base React Flow canvas
  - [ ] Zoom / pan controls
  - [ ] Custom nodes (`Show Text`, `Conditional Branch`, `Move`, etc.)
- [ ] Create event library sidebar (drag-to-canvas)
- [ ] Add node context menu (right click)
- [ ] Add mini-map, grid snapping, alignment helpers
- [ ] Add auto-save and version tracking per event

## Map Editor

- TODO: define map editor features and structure
  - Consider: tilemap rendering model, layers (ground, object, collision,
    events), event placement UX, map persistence/migrations (Drizzle)

## Database Editor

- TODO: define database editor features and structure
  - Consider: schemas for Actors / Items / Skills / Weapons / Classes,
    search/filter UI, inline editing with validation, undo/redo

## Developer Notes

### Folder Structure:

A `component` is made of `elements` that are made of `UI` primitives.

```bash
src/
├─ components/
│  ├─ elements/     # Shared UI pieces made of primitives
│  │  ├─ app-bar-controls.tsx
│  │  ├─ app-bar-menu.tsx
│  │  └─ app-bar-title.tsx
│  ├─ ui/           # Atomic UI primitives (shadcn/ui)     
│  ├─ nodes/        # React Flow custom node components
│  └─  app-bar.tsx  # Composed using elements (app-bar-[element].tsx)
├─ app/
│  ├─ layout.tsx    # Imports and uses components
```

### Naming Convention

- `Kebab-case` for all filenames and folders.
- Naming convention: `app-bar` is a component and `app-bar-*` are the elements.
  that compose it.
- TypeScript: strict mode enabled (`"strict": true` in tsconfig.json).
- Linting: Use ultracite with biome, it can be frustrating but ensures code
  consistency.
- Keep code modular and plugin-oriented.

---
