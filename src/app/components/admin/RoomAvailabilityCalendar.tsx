"use client"

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { AvailabilityData } from '@/app/admin/availability/page';

interface RoomAvailabilityCalendarProps {
    currentDate: Date;
    availability: AvailabilityData;
    roomCounts: Record<string, number>;
    onAvailabilityChange: (date: string, roomType: string, value: number) => void;
}

export const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
                                                                                      currentDate,
                                                                                      availability,
                                                                                      roomCounts,
                                                                                      onAvailabilityChange
                                                                                  }) => {
    const [expandedDate, setExpandedDate] = useState<string | null>(null);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add all days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isPastDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const getTotalAvailable = (date: string) => {
        if (!availability[date]) return null;
        return Object.values(availability[date]).reduce((sum, count) => sum + count, 0);
    };

    const getTotalRooms = () => {
        return Object.values(roomCounts).reduce((sum, count) => sum + count, 0);
    };

    const getOccupancyColor = (available: number | null, total: number) => {
        if (available === null) return 'bg-gray-100';
        const occupancyRate = ((total - available) / total) * 100;

        if (occupancyRate >= 90) return 'bg-red-100 text-red-800';
        if (occupancyRate >= 70) return 'bg-yellow-100 text-yellow-800';
        if (occupancyRate >= 50) return 'bg-blue-100 text-blue-800';
        return 'bg-green-100 text-green-800';
    };

    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const roomTypes = Object.keys(roomCounts);

    return (
        <div>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} className="h-24" />;
                    }

                    const dateStr = formatDate(date);
                    const totalAvailable = getTotalAvailable(dateStr);
                    const totalRooms = getTotalRooms();
                    const isExpanded = expandedDate === dateStr;
                    const isPast = isPastDate(date);

                    return (
                        <div
                            key={dateStr}
                            className={`border rounded-lg p-2 min-h-[96px] ${
                                isPast ? 'bg-gray-50 opacity-60' : 'bg-white hover:shadow-md'
                            } ${isToday(date) ? 'ring-2 ring-blue-500' : ''} transition-all`}
                        >
                            <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-medium ${
                    isToday(date) ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {date.getDate()}
                </span>
                                {!isPast && (
                                    <button
                                        onClick={() => setExpandedDate(isExpanded ? null : dateStr)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                    </button>
                                )}
                            </div>

                            <div className={`text-xs ${
                                totalAvailable !== null ? getOccupancyColor(totalAvailable, totalRooms) : ''
                            } px-2 py-1 rounded text-center`}>
                                {totalAvailable !== null ? (
                                    <>
                                        <div className="font-semibold">{totalAvailable}/{totalRooms}</div>
                                        <div className="text-[10px]">available</div>
                                    </>
                                ) : (
                                    <div className="text-gray-400">No data</div>
                                )}
                            </div>

                            {isExpanded && !isPast && (
                                <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-xl border w-64">
                                    <h4 className="font-semibold mb-3">Set Availability</h4>
                                    <div className="space-y-2">
                                        {roomTypes.map(type => {
                                            const currentValue = availability[dateStr]?.[type] || 0;
                                            const maxValue = roomCounts[type];

                                            return (
                                                <div key={type} className="flex items-center justify-between">
                                                    <span className="text-sm capitalize">{type}</span>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                if (currentValue > 0) {
                                                                    onAvailabilityChange(dateStr, type, currentValue - 1);
                                                                }
                                                            }}
                                                            className="w-6 h-6 border rounded hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max={maxValue}
                                                            value={currentValue}
                                                            onChange={(e) => {
                                                                const value = Math.min(Math.max(0, parseInt(e.target.value) || 0), maxValue);
                                                                onAvailabilityChange(dateStr, type, value);
                                                            }}
                                                            className="w-12 text-center border rounded px-1"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                if (currentValue < maxValue) {
                                                                    onAvailabilityChange(dateStr, type, currentValue + 1);
                                                                }
                                                            }}
                                                            className="w-6 h-6 border rounded hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                        <span className="text-xs text-gray-500">/{maxValue}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <button
                                        onClick={() => setExpandedDate(null)}
                                        className="mt-3 w-full py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
