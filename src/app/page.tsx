import { MenubarDemo } from "@/components/menu-bar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <header className="">
        <MenubarDemo />
      </header>
    </div>
  );
}
