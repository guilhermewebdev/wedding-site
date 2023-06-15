import Link from "next/link";
import { Auth, Private } from "../../hooks/useAuth";
import AdminBar from "../../components/AdminBar";

export default function Admin() {
    return (
        <Private>
            <AdminBar />
            <main>
                <Link href="/admin/tokens">Tokens</Link>
            </main>
        </Private>
    )
}