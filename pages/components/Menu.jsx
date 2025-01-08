import Link from "next/link";

export default function Menu() {
  return (
    <nav className="menu">
      <Link href="/home">Dashboards</Link>
      <Link href="/download">Downloads</Link>
      <Link href="/comparativos">Comparativos</Link>
    </nav>
  );
}
