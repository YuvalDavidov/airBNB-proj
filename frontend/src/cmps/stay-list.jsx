import { StayPreview } from "./stay-preview";

export function StayList({stays, userLocation}) {
    return <section className="stay-list">
        {stays.map(stay => < StayPreview key={stay._id} stay={stay} userLocation={userLocation} />)}
    </section>
}