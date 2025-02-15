import Link from "next/link";

export default function Menu() {
  return (
    <nav className="menu">
      <Link href="/home">Dashboards</Link>
      <Link href="/download">Downloads</Link>
      <Link href="/analise">Análise</Link>
      <Link href="/">Home</Link>
    </nav>
  );
}
