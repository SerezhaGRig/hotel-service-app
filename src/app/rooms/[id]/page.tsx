import { rooms } from '@/app/data/mockData';
import RoomDetailClient from './RoomDetailClient';
import { notFound } from 'next/navigation';

export default function RoomPage({
                                     params
                                 }: {
    params: { id: string }
}) {
    const room = rooms.find(r => r.id === parseInt(params.id));

    if (!room) {
        notFound();
    }

    return <RoomDetailClient room={room} />;
}

// Generate metadata for SEO
export async function generateMetadata({
                                           params
                                       }: {
    params: { id: string }
}) {
    const room = rooms.find(r => r.id === parseInt(params.id));

    return {
        title: room ? `${room.name} - LuxStay Hotels` : 'Room Not Found',
        description: room ? `Book the ${room.name} at LuxStay Hotels. ${room.amenities.join(', ')}` : '',
    };
}
