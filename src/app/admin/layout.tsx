import { AdminSidebar } from '@/app/components/admin/AdminSidebar';
import { AdminHeader } from '@/app/components/admin/AdminHeader';

export const metadata = {
    title: 'Admin Panel - LuxStay Hotels',
    description: 'Manage your hotel bookings and operations',
};

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminHeader />
            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
