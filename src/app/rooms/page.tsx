import AllRoomsClient from "@/app/rooms/AllRoomsClient";

export const metadata = {
    title: 'All Rooms - LuxStay Hotels',
    description: 'Browse our complete collection of luxury hotel rooms',
};

export default function AllRoomsPage() {
    return <AllRoomsClient />;
}
