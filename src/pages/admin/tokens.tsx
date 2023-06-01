import AdminBar from "../../components/AdminBar";
import { Auth } from "../../hooks/useAuth";

export default function Tokens() {
    return (
        <Auth>
            <AdminBar />
            <main>
                <h1>Tokens</h1>
                <p>
                    <form>
                        <input type="number" />
                        <button>Gerar Tokens</button>
                    </form>
                </p>
            </main>
        </Auth>
    )
}