"use client"

import React, { useState } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Room } from '@/app/types/hotel.types';

interface AddEditRoomModalProps {
    room?: Room | null;
    onSave: (roomData: Partial<Room>) => void;
    onClose: () => void;
}

export const AddEditRoomModal: React.FC<AddEditRoomModalProps> = ({ room, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: room?.name || '',
        type: room?.type || 'standard',
        price: room?.price || 0,
        capacity: room?.capacity || 2,
        size: room?.size || 0,
        amenities: room?.amenities || [],
        available: room?.available ?? true,
        image: room?.image || '',
    });

    const [newAmenity, setNewAmenity] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Room name is required';
        }
        if (formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }
        if (formData.size <= 0) {
            newErrors.size = 'Size must be greater than 0';
        }
        if (formData.capacity < 1 || formData.capacity > 10) {
            newErrors.capacity = 'Capacity must be between 1 and 10';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onSave(formData);
            onClose();
        }
    };

    const handleAddAmenity = () => {
        if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
            setFormData({
                ...formData,
                amenities: [...formData.amenities, newAmenity.trim()]
            });
            setNewAmenity('');
        }
    };

    const handleRemoveAmenity = (index: number) => {
        setFormData({
            ...formData,
            amenities: formData.amenities.filter((_, i) => i !== index)
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you would upload the image to a server
            // For now, we'll use a placeholder
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="sticky top-0 bg-white border-b px-8 py-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {room ? 'Edit Room' : 'Add New Room'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Room Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Room Image
                        </label>
                        {formData.image ? (
                            <div className="relative w-full h-64 rounded-xl overflow-hidden">
                                <img
                                    src={formData.image}
                                    alt="Room preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, image: '' })}
                                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="block">
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                                    <p className="text-sm text-gray-600">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG up to 10MB
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Room Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({...formData, name: e.target.value});
                                    if (errors.name) setErrors({...errors, name: ''});
                                }}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                    errors.name ? 'border-red-500' : 'border-gray-200'
                                }`}
                                placeholder="e.g., Deluxe Ocean View"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Room Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="standard">Standard</option>
                                <option value="deluxe">Deluxe</option>
                                <option value="suite">Suite</option>
                                <option value="family">Family</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price per Night ($) *
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => {
                                    setFormData({...formData, price: parseInt(e.target.value) || 0});
                                    if (errors.price) setErrors({...errors, price: ''});
                                }}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                    errors.price ? 'border-red-500' : 'border-gray-200'
                                }`}
                                placeholder="299"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                            )}
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Maximum Guests *
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={formData.capacity}
                                onChange={(e) => {
                                    setFormData({...formData, capacity: parseInt(e.target.value) || 1});
                                    if (errors.capacity) setErrors({...errors, capacity: ''});
                                }}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                    errors.capacity ? 'border-red-500' : 'border-gray-200'
                                }`}
                            />
                            {errors.capacity && (
                                <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
                            )}
                        </div>

                        {/* Size */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Room Size (m²) *
                            </label>
                            <input
                                type="number"
                                value={formData.size}
                                onChange={(e) => {
                                    setFormData({...formData, size: parseInt(e.target.value) || 0});
                                    if (errors.size) setErrors({...errors, size: ''});
                                }}
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                                    errors.size ? 'border-red-500' : 'border-gray-200'
                                }`}
                                placeholder="45"
                            />
                            {errors.size && (
                                <p className="text-red-500 text-sm mt-1">{errors.size}</p>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={formData.available ? 'available' : 'unavailable'}
                                onChange={(e) => setFormData({...formData, available: e.target.value === 'available'})}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amenities
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAmenity())}
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Add amenity..."
                            />
                            <button
                                type="button"
                                onClick={handleAddAmenity}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.amenities.map((amenity, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                  {amenity}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAmenity(index)}
                                        className="ml-2 text-gray-500 hover:text-red-500"
                                    >
                    <X size={14} />
                  </button>
                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-6">
                        <Button type="button" onClick={onClose} variant="outline" fullWidth>
                            Cancel
                        </Button>
                        <Button type="submit" fullWidth>
                            {room ? 'Update Room' : 'Add Room'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
