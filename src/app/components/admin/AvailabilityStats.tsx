"use client"

import React from 'react';
import { Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { AvailabilityData } from '@/app/admin/availability/page';

interface AvailabilityStatsProps {
    availability: AvailabilityData;
    roomCounts: Record<string, number>;
    currentMonth: Date;
}

export const AvailabilityStats: React.FC<AvailabilityStatsProps> = ({
                                                                        availability,
                                                                        roomCounts,
                                                                        currentMonth
                                                                    }) => {
    const calculateStats = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let totalAvailable = 0;
        let totalCapacity = 0;
        let daysWithFullOccupancy = 0;
        let daysWithHighOccupancy = 0;

        const totalRooms = Object.values(roomCounts).reduce((sum, count) => sum + count, 0);

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day).toISOString().split('T')[0];
            const dayAvailability = availability[date];

            if (dayAvailability) {
                const dayTotal = Object.values(dayAvailability).reduce((sum, count) => sum + count, 0);
                totalAvailable += dayTotal;
                totalCapacity += totalRooms;

                if (dayTotal === 0) {
                    daysWithFullOccupancy++;
                } else if (dayTotal <= totalRooms * 0.2) {
                    daysWithHighOccupancy++;
                }
            }
        }

        const averageOccupancy = totalCapacity > 0
            ? ((totalCapacity - totalAvailable) / totalCapacity) * 100
            : 0;

        return {
            averageOccupancy: averageOccupancy.toFixed(1),
            daysWithFullOccupancy,
            daysWithHighOccupancy,
            totalAvailable,
            totalCapacity
        };
    };

    const stats = calculateStats();

    const statCards = [
        {
            title: 'Average Occupancy',
            value: `${stats.averageOccupancy}%`,
            icon: TrendingUp,
            color: 'blue',
            description: 'This month'
        },
        {
            title: 'Fully Booked Days',
            value: stats.daysWithFullOccupancy,
            icon: AlertTriangle,
            color: 'red',
            description: '100% occupancy'
        },
        {
            title: 'High Demand Days',
            value: stats.daysWithHighOccupancy,
            icon: Calendar,
            color: 'yellow',
            description: '>80% occupancy'
        },
        {
            title: 'Available Rooms',
            value: stats.totalAvailable,
            icon: CheckCircle,
            color: 'green',
            description: 'Total this month'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                                <Icon className={`text-${stat.color}-600`} size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-sm font-medium text-gray-700">{stat.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                    </div>
                );
            })}
        </div>
    );
};
