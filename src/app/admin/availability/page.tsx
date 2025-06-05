"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Save, AlertCircle, Edit, Copy, Settings } from 'lucide-react';
import { RoomAvailabilityCalendar } from '@/app/components/admin/RoomAvailabilityCalendar';
import { AvailabilityStats } from '@/app/components/admin/AvailabilityStats';
import { BulkEditAvailabilityModal } from '@/app/components/admin/BulkEditAvailabilityModal';
import { QuickEditPanel } from '@/app/components/admin/QuickEditPanel';
import { Button } from '@/app/components/ui/Button';
import { rooms } from '@/app/data/mockData';

export interface AvailabilityData {
    [date: string]: {
        [roomType: string]: number;
    };
}

// Mock initial availability data
const initialAvailability: AvailabilityData = {
    '2024-02-15': { standard: 2, deluxe: 1, suite: 0, family: 1 },
    '2024-02-16': { standard: 0, deluxe: 2, suite: 1, family: 1 },
    '2024-02-17': { standard: 3, deluxe: 0, suite: 2, family: 0 },
};

export default function AvailabilityPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [availability, setAvailability] = useState<AvailabilityData>(initialAvailability);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [showBulkEdit, setShowBulkEdit] = useState(false);
    const [showQuickEdit, setShowQuickEdit] = useState(false);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [editMode, setEditMode] = useState<'single' | 'range' | 'pattern'>('single');

    // Get room counts by type
    const roomCounts = rooms.reduce((acc, room) => {
        acc[room.type] = (acc[room.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const handleAvailabilityChange = (date: string, roomType: string, value: number) => {
        setAvailability(prev => ({
            ...prev,
            [date]: {
                ...prev[date],
                [roomType]: value
            }
        }));
        setUnsavedChanges(true);
    };

    const handleBulkEdit = (dates: string[], roomAvailability: Record<string, number>) => {
        const newAvailability = { ...availability };
        dates.forEach(date => {
            newAvailability[date] = { ...roomAvailability };
        });
        setAvailability(newAvailability);
        setUnsavedChanges(true);
    };

    const handleSaveChanges = () => {
        console.log('Saving availability data:', availability);
        setUnsavedChanges(false);
        alert('Availability changes saved successfully!');
    };

    const handleMonthChange = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            if (direction === 'prev') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    const handleCopyMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthData: AvailabilityData = {};

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day).toISOString().split('T')[0];
            if (availability[date]) {
                monthData[date] = { ...availability[date] };
            }
        }

        localStorage.setItem('copiedAvailability', JSON.stringify(monthData));
        alert('Month availability copied!');
    };

    const handlePasteMonth = () => {
        const copiedData = localStorage.getItem('copiedAvailability');
        if (!copiedData) {
            alert('No data to paste!');
            return;
        }

        const monthData = JSON.parse(copiedData) as AvailabilityData;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const newAvailability = { ...availability };

        Object.entries(monthData).forEach(([_, dayAvailability], index) => {
            const newDate = new Date(year, month, index + 1);
            if (newDate.getMonth() === month) {
                const dateStr = newDate.toISOString().split('T')[0];
                newAvailability[dateStr] = { ...dayAvailability };
            }
        });

        setAvailability(newAvailability);
        setUnsavedChanges(true);
    };

    const applyPattern = (pattern: 'weekdays' | 'weekends' | 'all', roomAvailability: Record<string, number>) => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const newAvailability = { ...availability };

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayOfWeek = date.getDay();
            const dateStr = date.toISOString().split('T')[0];

            if (pattern === 'all' ||
                (pattern === 'weekdays' && dayOfWeek >= 1 && dayOfWeek <= 5) ||
                (pattern === 'weekends' && (dayOfWeek === 0 || dayOfWeek === 6))) {
                newAvailability[dateStr] = { ...roomAvailability };
            }
        }

        setAvailability(newAvailability);
        setUnsavedChanges(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Room Availability</h1>
                    <p className="text-gray-600">Manage room availability across all dates</p>
                </div>
                <div className="flex items-center gap-4">
                    {unsavedChanges && (
                        <div className="flex items-center text-yellow-600">
                            <AlertCircle size={20} className="mr-2" />
                            <span className="text-sm">Unsaved changes</span>
                        </div>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => setShowQuickEdit(true)}
                    >
                        <Settings size={20} className="mr-2" />
                        Quick Actions
                    </Button>
                    <Button
                        onClick={handleSaveChanges}
                        disabled={!unsavedChanges}
                        className={!unsavedChanges ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        <Save size={20} className="mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            {/* Availability Stats */}
            <AvailabilityStats
                availability={availability}
                roomCounts={roomCounts}
                currentMonth={currentDate}
            />

            {/* Calendar Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleMonthChange('prev')}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => setCurrentDate(new Date())}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => handleMonthChange('next')}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <ChevronRight size={20} />
                        </button>
                        <div className="ml-4 border-l pl-4 flex gap-2">
                            <button
                                onClick={handleCopyMonth}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                title="Copy month"
                            >
                                <Copy size={20} />
                            </button>
                            <button
                                onClick={handlePasteMonth}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                title="Paste month"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                onClick={() => setShowBulkEdit(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Bulk Edit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit Mode Selector */}
                <div className="mb-4 flex gap-2">
                    <button
                        onClick={() => setEditMode('single')}
                        className={`px-4 py-2 rounded-lg ${
                            editMode === 'single'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Single Date
                    </button>
                    <button
                        onClick={() => setEditMode('range')}
                        className={`px-4 py-2 rounded-lg ${
                            editMode === 'range'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Date Range
                    </button>
                    <button
                        onClick={() => setEditMode('pattern')}
                        className={`px-4 py-2 rounded-lg ${
                            editMode === 'pattern'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Pattern
                    </button>
                </div>

                {/* Calendar Grid */}
                <RoomAvailabilityCalendar
                    currentDate={currentDate}
                    availability={availability}
                    roomCounts={roomCounts}
                    onAvailabilityChange={handleAvailabilityChange}
                    selectedDates={selectedDates}
                    onDateSelect={setSelectedDates}
                    editMode={editMode}
                />
            </div>

            {/* Legend and Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Room Types</h3>
                    <div className="space-y-3">
                        {Object.entries(roomCounts).map(([type, count]) => (
                            <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="capitalize font-medium">{type}</span>
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold">{count}</span> rooms total
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Occupancy Legend</h3>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-100 rounded mr-3"></div>
                            <span className="text-sm">Low Occupancy (0-50%)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-100 rounded mr-3"></div>
                            <span className="text-sm">Medium Occupancy (50-70%)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-100 rounded mr-3"></div>
                            <span className="text-sm">High Occupancy (70-90%)</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-100 rounded mr-3"></div>
                            <span className="text-sm">Full Occupancy (90-100%)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showBulkEdit && (
                <BulkEditAvailabilityModal
                    roomCounts={roomCounts}
                    onApply={(dates, roomAvailability) => {
                        handleBulkEdit(dates, roomAvailability);
                        setShowBulkEdit(false);
                    }}
                    onClose={() => setShowBulkEdit(false)}
                    editMode={editMode}
                    selectedDates={selectedDates}
                />
            )}

            {showQuickEdit && (
                <QuickEditPanel
                    roomCounts={roomCounts}
                    onApplyPattern={applyPattern}
                    onClose={() => setShowQuickEdit(false)}
                />
            )}
        </div>
    );
}
