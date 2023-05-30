import RSVP from "../../components/RSVP";
import { useRouter } from 'next/router'

export default function RSVPIndex () {
    const router = useRouter()
    const { code } = router.query

    return (
        <RSVP code={code?.toString()} />
    )
}