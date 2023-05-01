import RSVP from "../../components/rsvp";
import { useRouter } from 'next/router'

export default function RSVPIndex () {
    const router = useRouter()
    const { code } = router.query

    return (
        <RSVP code={code?.toString()} />
    )
}