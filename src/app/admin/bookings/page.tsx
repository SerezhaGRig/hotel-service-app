"use client"

import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { BookingTable } from '@/app/components/admin/BookingTable';
// import { BookingFilters } from '@/components/admin/BookingFilters';
import { Button } from '@/app/components/ui/Button';

export default function BookingsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-gray-600">Manage all hotel bookings</p>
                </div>
                <Button>
                    <Download size={20} className="mr-2" />
                    Export
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by guest name, email, or booking ID..."
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <select
                        className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="checked-in">Checked In</option>
                        <option value="checked-out">Checked Out</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-gray-50">
                        <Filter size={20} className="mr-2" />
                        More Filters
                    </button>
                </div>
            </div>

            {/* Bookings Table */}
            <BookingTable searchTerm={searchTerm} filterStatus={filterStatus} />
        </div>
    );
}
