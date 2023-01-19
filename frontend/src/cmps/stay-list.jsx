import { StayPreview } from "./stay-preview";

export function StayList({stays, userLocation, onUpdateStay}) {
    return <section className="stay-list">
        {stays.map(stay => < StayPreview key={stay._id} stay={stay} userLocation={userLocation} onUpdateStay={onUpdateStay} />)}
    </section>
}