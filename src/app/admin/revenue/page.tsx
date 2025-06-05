"use client"

import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
    { month: 'Jan', revenue: 45000, lastYear: 38000 },
    { month: 'Feb', revenue: 52000, lastYear: 42000 },
    { month: 'Mar', revenue: 48000, lastYear: 45000 },
    { month: 'Apr', revenue: 61000, lastYear: 50000 },
    { month: 'May', revenue: 58000, lastYear: 54000 },
    { month: 'Jun', revenue: 67000, lastYear: 59000 },
];

export default function RevenuePage() {
    const stats = [
        {
            title: 'Total Revenue',
            value: '$321,000',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
        },
        {
            title: 'Average Daily Rate',
            value: '$285',
            change: '+5.2%',
            trend: 'up',
            icon: TrendingUp,
        },
        {
            title: 'RevPAR',
            value: '$198',
            change: '-2.1%',
            trend: 'down',
            icon: TrendingDown,
        },
        {
            title: 'Total Bookings',
            value: '1,128',
            change: '+8.7%',
            trend: 'up',
            icon: Calendar,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
                <p className="text-gray-600">Track your hotel's financial performance</p>
            </div>

            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Icon className="text-blue-600" size={24} />
                                </div>
                                <span className={`text-sm font-medium ${
                                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                  {stat.change}
                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-gray-600 text-sm">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">Revenue Comparison</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px'
                                }}
                            />
                            <Area type="monotone" dataKey="lastYear" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorLastYear)" />
                            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center space-x-6 mt-4">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">This Year</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Last Year</span>
                    </div>
                </div>
            </div>

            {/* Revenue by Room Type */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Revenue by Room Type</h3>
                    <div className="space-y-4">
                        {[
                            { type: 'Deluxe', revenue: 125000, percentage: 39 },
                            { type: 'Suite', revenue: 98000, percentage: 30 },
                            { type: 'Standard', revenue: 68000, percentage: 21 },
                            { type: 'Family', revenue: 30000, percentage: 10 },
                        ].map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                                    <span className="text-sm text-gray-600">${item.revenue.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Top Revenue Days</h3>
                    <div className="space-y-3">
                        {[
                            { date: 'Dec 31, 2023', revenue: 8500, occupancy: '100%' },
                            { date: 'Dec 25, 2023', revenue: 7800, occupancy: '95%' },
                            { date: 'Jul 4, 2023', revenue: 7200, occupancy: '92%' },
                            { date: 'Nov 24, 2023', revenue: 6900, occupancy: '88%' },
                            { date: 'Dec 24, 2023', revenue: 6500, occupancy: '85%' },
                        ].map((day, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{day.date}</p>
                                    <p className="text-sm text-gray-500">Occupancy: {day.occupancy}</p>
                                </div>
                                <span className="font-semibold text-gray-900">${day.revenue.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
