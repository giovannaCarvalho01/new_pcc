import Link from "next/link";

export default function Menu() {
  return (
    <nav className="menu">
      <Link href="/home">Dashboards</Link>
      <Link href="/download">Downloads</Link>
      <Link href="/analise">Qui-Quadrado</Link>
      <Link href="/comparativo">Comparativos</Link>
    </nav>
  );
}
