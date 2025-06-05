"use client"

import React, { useState } from 'react';
import { X, Calendar, TrendingUp, Copy } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';

interface QuickEditPanelProps {
    roomCounts: Record<string, number>;
    onApplyPattern: (pattern: 'weekdays' | 'weekends' | 'all', availability: Record<string, number>) => void;
    onClose: () => void;
}

export const QuickEditPanel: React.FC<QuickEditPanelProps> = ({
                                                                  roomCounts,
                                                                  onApplyPattern,
                                                                  onClose
                                                              }) => {
    const [selectedPattern, setSelectedPattern] = useState<'weekdays' | 'weekends' | 'all'>('weekdays');
    const [availability, setAvailability] = useState<Record<string, number>>(
        Object.keys(roomCounts).reduce((acc, type) => ({ ...acc, [type]: roomCounts[type] }), {})
    );

    const presets = [
        { name: 'High Season', availability: Object.keys(roomCounts).reduce((acc, type) => ({ ...acc, [type]: Math.floor(roomCounts[type] * 0.2) }), {}) },
        { name: 'Low Season', availability: Object.keys(roomCounts).reduce((acc, type) => ({ ...acc, [type]: roomCounts[type] }), {}) },
        { name: 'Holiday', availability: Object.keys(roomCounts).reduce((acc, type) => ({ ...acc, [type]: 0 }), {}) },
        { name: 'Weekend Special', availability: Object.keys(roomCounts).reduce((acc, type) => ({ ...acc, [type]: Math.floor(roomCounts[type] * 0.5) }), {}) },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Pattern Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Apply Pattern to Current Month
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setSelectedPattern('weekdays')}
                                className={`px-4 py-2 rounded-lg ${
                                    selectedPattern === 'weekdays'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                Weekdays
                            </button>
                            <button
                                onClick={() => setSelectedPattern('weekends')}
                                className={`px-4 py-2 rounded-lg ${
                                    selectedPattern === 'weekends'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                Weekends
                            </button>
                            <button
                                onClick={() => setSelectedPattern('all')}
                                className={`px-4 py-2 rounded-lg ${
                                    selectedPattern === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                All Days
                            </button>
                        </div>
                    </div>

                    {/* Presets */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Availability Presets
                        </label>
                        <div className="space-y-2">
                            {presets.map((preset, index) => (
                                <button
                                    key={index}
                                    onClick={() => setAvailability(preset.availability)}
                                    className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{preset.name}</span>
                                        <TrendingUp size={16} className="text-gray-400" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Current Settings */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Room Availability
                        </label>
                        <div className="space-y-2">
                            {Object.entries(availability).map(([type, count]) => (
                                <div key={type} className="flex justify-between items-center">
                                    <span className="capitalize">{type}</span>
                                    <span className="font-medium">{count} / {roomCounts[type]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <Button
                            onClick={() => {
                                onApplyPattern(selectedPattern, availability);
                                onClose();
                            }}
                            fullWidth
                        >
                            Apply to {selectedPattern === 'all' ? 'All Days' : selectedPattern}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
