import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Click <Link href="/documents/123">here</Link></h1>
    </div>
  );
}