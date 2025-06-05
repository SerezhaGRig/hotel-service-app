"use client"

import React from 'react';
import { Calendar, Users, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
// import { RecentBookings } from '@/app/components/admin/RecentBookings';
import { BookingChart } from '@/app/components/admin/BookingChart';

export default function AdminDashboard() {
    // Mock statistics
    const stats = [
        { title: 'Total Bookings', value: '156', icon: Calendar, change: '+12%', color: 'blue' },
        { title: 'Total Guests', value: '342', icon: Users, change: '+8%', color: 'green' },
        { title: 'Revenue', value: '$45,678', icon: DollarSign, change: '+15%', color: 'purple' },
        { title: 'Occupancy Rate', value: '78%', icon: TrendingUp, change: '+5%', color: 'orange' },
    ];

    const bookingStats = {
        pending: 12,
        confirmed: 89,
        checkedIn: 45,
        cancelled: 10,
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your hotel.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                                    <Icon className={`text-${stat.color}-600`} size={24} />
                                </div>
                                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-gray-600 text-sm">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Booking Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    {<BookingChart />}
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Booking Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Clock className="text-yellow-500 mr-3" size={20} />
                                <span className="text-gray-700">Pending</span>
                            </div>
                            <span className="font-semibold">{bookingStats.pending}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <CheckCircle className="text-green-500 mr-3" size={20} />
                                <span className="text-gray-700">Confirmed</span>
                            </div>
                            <span className="font-semibold">{bookingStats.confirmed}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Users className="text-blue-500 mr-3" size={20} />
                                <span className="text-gray-700">Checked In</span>
                            </div>
                            <span className="font-semibold">{bookingStats.checkedIn}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <XCircle className="text-red-500 mr-3" size={20} />
                                <span className="text-gray-700">Cancelled</span>
                            </div>
                            <span className="font-semibold">{bookingStats.cancelled}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Bookings */}
            {/*<RecentBookings />*/}
        </div>
    );
}
