# Fluent Editor — TODOs & Roadmap

[!IMPORTANT] this file is generated with ai, it can contains errors or
inacuracies

> Scope: Editor layer only (not engine)\
> Stack: Next.js · Bun · shadcn/ui · React Flow · Drizzle ORM

---

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
  - [x] Implement base MenuBar using Radix UI
  - [x] Add File, Edit, View menu structure
  - [x] Add theme switcher integration
  - [ ] Add window controls (close / minimize / maximize)
  - [ ] Implement draggable titlebar for desktop build

- [ ] **StatusBar** (`src/components/status-bar.tsx`)
  - [x] Base container with left/right item alignment
  - [x] `StatusBarItem` component with icon + label (Lucide, 16px)
  - [x] Add keyboard focus styles
  - [ ] Add customizable background themes (light/dark/muted)

  **Enhancements**
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
        (`registerStatusItem({ side, component })`)
  - [ ] Add persistent indicators (FPS, autosave state, connection status)

---

## Event Editor (React Flow-based)

- [x] Decide on node-based event structure (no modal-heavy flows)
- [ ] Implement base React Flow canvas
  - [ ] Zoom / pan controls
  - [ ] Custom nodes (`Show Text`, `Conditional Branch`, `Move`, etc.)
- [ ] Create event library sidebar (drag-to-canvas)
- [ ] Add node context menu (right click)
- [ ] Add mini-map, grid snapping, alignment helpers
- [ ] Add auto-save and version tracking per event

---

## Map Editor

- TODO: define map editor features and structure
  - Consider: tilemap rendering model, layers (ground, object, collision,
    events), event placement UX, map persistence/migrations (Drizzle)

---

## Database Editor

- TODO: define database editor features and structure
  - Consider: schemas for Actors / Items / Skills / Weapons / Classes,
    search/filter UI, inline editing with validation, undo/redo

---

## Future Components

- [ ] Plugin system for editor extensions
- [ ] Settings modal (theme, autosave interval, localization)
- [ ] Character editor (sprites, portraits, animations)
- [ ] Audio editor (BGM/BGS/ME/SE)

---

## Developer Notes

- Shared UI: `/components/elements`
- Atomic primitives: `/components/ui` (shadcn)
- React Flow nodes: `/components/nodes`
- Naming convention: `AppBarX`, `StatusBarX`, `SidebarX`, `EditorX`
- TypeScript: strict mode enabled (`"strict": true` in tsconfig.json)
- Linting: Biome (preferences: `for...of` over `forEach`, avoid `any`,
  consistent imports)
- Keep code modular and plugin-oriented

---

## Next Steps (short list)

- [ ] Finalize StatusBar plugin injection system
- [ ] Implement first Event Editor prototype (React Flow canvas + one node)
- [ ] Define Drizzle schemas for events and maps; add migrations
- [ ] Prototype autosave and project persistence
