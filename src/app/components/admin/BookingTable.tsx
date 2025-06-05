"use client"

import React, { useState } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { BookingDetailsModal } from './BookingDetailsModal';

interface Booking {
    id: string;
    guestName: string;
    email: string;
    phone: string;
    room: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
    createdAt: string;
}

// Mock data
const mockBookings: Booking[] = [
    {
        id: 'BK001',
        guestName: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        room: 'Deluxe Ocean View',
        checkIn: '2024-02-15',
        checkOut: '2024-02-18',
        guests: 2,
        totalAmount: 897,
        status: 'confirmed',
        createdAt: '2024-02-01'
    },
    {
        id: 'BK002',
        guestName: 'Sarah Smith',
        email: 'sarah@example.com',
        phone: '+1 234 567 8901',
        room: 'Executive Suite',
        checkIn: '2024-02-20',
        checkOut: '2024-02-22',
        guests: 4,
        totalAmount: 998,
        status: 'pending',
        createdAt: '2024-02-10'
    },
    // Add more mock bookings
];

interface BookingTableProps {
    searchTerm: string;
    filterStatus: string;
}

export const BookingTable: React.FC<BookingTableProps> = ({ searchTerm, filterStatus }) => {
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string} = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
            'checked-in': 'bg-blue-100 text-blue-800',
            'checked-out': 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const filteredBookings = mockBookings.filter(booking => {
        const matchesSearch =
            booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Booking ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Guest
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Room
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Check In/Out
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {booking.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{booking.guestName}</p>
                                        <p className="text-sm text-gray-500">{booking.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {booking.room}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{booking.checkIn}</div>
                                    <div className="text-sm text-gray-500">{booking.checkOut}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${booking.totalAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setShowDetails(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button className="text-green-600 hover:text-green-800">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showDetails && selectedBooking && (
                <BookingDetailsModal
                    booking={selectedBooking}
                    onClose={() => {
                        setShowDetails(false);
                        setSelectedBooking(null);
                    }}
                />
            )}
        </>
    );
};
