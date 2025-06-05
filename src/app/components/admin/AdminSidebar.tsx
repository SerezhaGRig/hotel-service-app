"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Bed,
    Settings,
    LogOut,
    DollarSign,
    MessageSquare
} from 'lucide-react';

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { href: '/admin/availability', label: 'Availability', icon: Calendar }, // Add this
    { href: '/admin/guests', label: 'Guests', icon: Users },
    { href: '/admin/rooms', label: 'Rooms', icon: Bed },
    { href: '/admin/revenue', label: 'Revenue', icon: DollarSign },
    { href: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export const AdminSidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
            <div className="p-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Admin Panel
                </h2>
            </div>

            <nav className="px-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all ${
                                isActive
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <Icon size={20} className="mr-3" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 w-full p-4">
                <button className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                    <LogOut size={20} className="mr-3" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
