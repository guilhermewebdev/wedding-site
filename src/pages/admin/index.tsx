import Link from "next/link";
import { Auth, IsAuthenticated } from "../../hooks/useAuth";
import AdminBar from "../../components/AdminBar";

export default function Admin() {
    return (
        <IsAuthenticated>
            <AdminBar />
            <main>
                <Link href="/admin/tokens">Tokens</Link>
            </main>
        </IsAuthenticated>
    )
}