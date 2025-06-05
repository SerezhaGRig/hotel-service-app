"use client"

import React, { useState } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface BulkEditAvailabilityModalProps {
    roomCounts: Record<string, number>;
    onApply: (dates: string[], availability: Record<string, number>) => void;
    onClose: () => void;
    editMode: 'single' | 'range' | 'pattern';
    selectedDates: string[];
}

export const BulkEditAvailabilityModal: React.FC<BulkEditAvailabilityModalProps> = ({
                                                                                        roomCounts,
                                                                                        onApply,
                                                                                        onClose,
                                                                                        editMode,
                                                                                        selectedDates
                                                                                    }) => {
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [roomAvailability, setRoomAvailability] = useState<Record<string, number>>(
        Object.keys(roomCounts).reduce((acc, type) => ({ ...acc, [type]: roomCounts[type] }), {})
    );
    const [pattern, setPattern] = useState<'weekdays' | 'weekends' | 'custom'>('weekdays');
    const [customDays, setCustomDays] = useState<number[]>([1, 2, 3, 4, 5]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let datesToUpdate: string[] = [];

        if (editMode === 'single' || editMode === 'range') {
            if (selectedDates.length > 0) {
                datesToUpdate = selectedDates;
            } else if (dateRange.start && dateRange.end) {
                // Generate date range
                const start = new Date(dateRange.start);
                const end = new Date(dateRange.end);

                while (start <= end) {
                    datesToUpdate.push(start.toISOString().split('T')[0]);
                    start.setDate(start.getDate() + 1);
                }
            }
        } else if (editMode === 'pattern' && dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);

            while (start <= end) {
                const dayOfWeek = start.getDay();

                if (pattern === 'weekdays' && dayOfWeek >= 1 && dayOfWeek <= 5) {
                    datesToUpdate.push(start.toISOString().split('T')[0]);
                } else if (pattern === 'weekends' && (dayOfWeek === 0 || dayOfWeek === 6)) {
                    datesToUpdate.push(start.toISOString().split('T')[0]);
                } else if (pattern === 'custom' && customDays.includes(dayOfWeek)) {
                    datesToUpdate.push(start.toISOString().split('T')[0]);
                }

                start.setDate(start.getDate() + 1);
            }
        }

        if (datesToUpdate.length > 0) {
            onApply(datesToUpdate, roomAvailability);
        }
    };

    const toggleCustomDay = (day: number) => {
        setCustomDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day].sort()
        );
    };

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Bulk Edit Availability</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date Selection */}
                    {editMode !== 'single' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Range
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        required={selectedDates.length === 0}
                                        value={dateRange.start}
                                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                                    <input
                                        type="date"
                                        required={selectedDates.length === 0}
                                        value={dateRange.end}
                                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                        min={dateRange.start}
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pattern Selection for Pattern Mode */}
                    {editMode === 'pattern' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Apply to Pattern
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="weekdays"
                                        checked={pattern === 'weekdays'}
                                        onChange={(e) => setPattern(e.target.value as any)}
                                        className="mr-2"
                                    />
                                    <span>Weekdays (Mon-Fri)</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="weekends"
                                        checked={pattern === 'weekends'}
                                        onChange={(e) => setPattern(e.target.value as any)}
                                        className="mr-2"
                                    />
                                    <span>Weekends (Sat-Sun)</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="custom"
                                        checked={pattern === 'custom'}
                                        onChange={(e) => setPattern(e.target.value as any)}
                                        className="mr-2"
                                    />
                                    <span>Custom Days</span>
                                </label>
                            </div>

                            {pattern === 'custom' && (
                                <div className="mt-3 flex gap-2">
                                    {weekDays.map((day, index) => (
                                        <button
                                            key={day}
                                            type="button"
                                            onClick={() => toggleCustomDay(index)}
                                            className={`px-3 py-1 rounded-lg ${
                                                customDays.includes(index)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Selected Dates Info */}
                    {selectedDates.length > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-start">
                                <AlertCircle className="text-blue-600 mr-2 mt-0.5" size={20} />
                                <div>
                                    <p className="text-sm font-medium text-blue-900">
                                        {selectedDates.length} dates selected
                                    </p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Changes will be applied to the selected dates
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Room Availability Settings */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">
                            Set Available Rooms
                        </label>
                        <div className="space-y-4">
                            {Object.entries(roomCounts).map(([type, maxCount]) => (
                                <div key={type}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="capitalize font-medium">{type}</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setRoomAvailability({
                                                    ...roomAvailability,
                                                    [type]: Math.max(0, roomAvailability[type] - 1)
                                                })}
                                                className="w-8 h-8 border rounded hover:bg-gray-100"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                min="0"
                                                max={maxCount}
                                                value={roomAvailability[type]}
                                                onChange={(e) => setRoomAvailability({
                                                    ...roomAvailability,
                                                    [type]: Math.min(Math.max(0, parseInt(e.target.value) || 0), maxCount)
                                                })}
                                                className="w-20 px-2 py-1 border rounded text-center"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setRoomAvailability({
                                                    ...roomAvailability,
                                                    [type]: Math.min(maxCount, roomAvailability[type] + 1)
                                                })}
                                                className="w-8 h-8 border rounded hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                            <span className="text-sm text-gray-500">/ {maxCount}</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${(roomAvailability[type] / maxCount) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions</p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    const newAvailability = Object.keys(roomCounts).reduce(
                                        (acc, type) => ({ ...acc, [type]: roomCounts[type] }),
                                        {}
                                    );
                                    setRoomAvailability(newAvailability);
                                }}
                                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                            >
                                Set All Available
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const newAvailability = Object.keys(roomCounts).reduce(
                                        (acc, type) => ({ ...acc, [type]: 0 }),
                                        {}
                                    );
                                    setRoomAvailability(newAvailability);
                                }}
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                            >
                                Set All Booked
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    const newAvailability = Object.keys(roomCounts).reduce(
                                        (acc, type) => ({ ...acc, [type]: Math.floor(roomCounts[type] / 2) }),
                                        {}
                                    );
                                    setRoomAvailability(newAvailability);
                                }}
                                className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                            >
                                Set 50% Available
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <Button type="button" onClick={onClose} variant="outline" fullWidth>
                            Cancel
                        </Button>
                        <Button type="submit" fullWidth>
                            Apply Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
