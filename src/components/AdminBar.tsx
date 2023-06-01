import Link from "next/link";

export default function AdminBar() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <button>Voltar</button>
                    </li>
                    <li>
                        <Link href='/admin/tokens'>Tokens</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}