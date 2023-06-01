import Link from "next/link";
import { Auth } from "../../hooks/useAuth";
import AdminBar from "../../components/AdminBar";

export default function Admin() {
    return (
        <Auth>
            <AdminBar />
            <main>
                <Link href="/admin/tokens">Tokens</Link>
            </main>
        </Auth>
    )
}