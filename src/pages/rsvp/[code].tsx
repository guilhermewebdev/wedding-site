import { RSVP } from 'components/Rsvp'
import { useRouter } from 'next/router'

export default function RSVPCode() {
    const router = useRouter()
    const { code } = router.query

    return (
        <RSVP code={code?.toString()} />
    )
}