import Link from "next/link";

export default function NotFound() {
  return (
    <hgroup className="fixed inset-0 flex flex-col items-center justify-center gap-4">
      <h1>404 - Page Not Found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Return Home</Link>
    </hgroup>
  );
}
