import { StayPreview } from "./stay-preview";

export function StayList({stays}) {
    return <section className="stay-list">
        {stays.map(stay => < StayPreview key={stay._id} stay={stay} />)}
    </section>
}