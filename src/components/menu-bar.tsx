import { Kbd } from "@/components/ui/kbd";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarRadioGroup,
  // MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function MenubarDemo() {
  return (
    <Menubar>
      {/* FILE MENU */}
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New{" "}
            <MenubarShortcut>
              <Kbd>⌘N</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open{" "}
            <MenubarShortcut>
              <Kbd>⌘O</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save{" "}
            <MenubarShortcut>
              <Kbd>⌘S</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Exit{" "}
            <MenubarShortcut>
              <Kbd>⌘Q</Kbd>
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* EDIT MENU */}
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo{" "}
            <MenubarShortcut>
              <Kbd>⌘Z</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo{" "}
            <MenubarShortcut>
              <Kbd>⇧⌘Z</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Cut{" "}
            <MenubarShortcut>
              <Kbd>⌘X</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy{" "}
            <MenubarShortcut>
              <Kbd>⌘C</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste{" "}
            <MenubarShortcut>
              <Kbd>⌘V</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      {/* SELECTION MENU */}
      <MenubarMenu>
        <MenubarTrigger>Selection</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Select All{" "}
            <MenubarShortcut>
              <Kbd>⌘A</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Cancel Selection{" "}
            <MenubarShortcut>
              <Kbd>Esc</Kbd>
            </MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* VIEW MENU */}
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked>
            Always Show Bookmarks Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem>Always Show Full URLs</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem>
            Reload{" "}
            <MenubarShortcut>
              <Kbd>⌘R</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>
            Force Reload{" "}
            <MenubarShortcut>
              <Kbd>⇧⌘R</Kbd>
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Toggle Fullscreen</MenubarItem>
          <MenubarItem>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* HELP MENU */}
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Help Center</MenubarItem>
          <MenubarItem>Keyboard Shortcuts</MenubarItem>
          <MenubarItem>About</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
