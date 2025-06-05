"use client"

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Room } from '@/app/types/hotel.types';
import { rooms as initialRooms } from '@/app/data/mockData';
import { AddEditRoomModal } from '@/app/components/admin/AddEditRoomModal';
import { ViewRoomModal } from '@/app/components/admin/ViewRoomModal';

export default function AdminRoomsPage() {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [viewingRoom, setViewingRoom] = useState<Room | null>(null);

    const handleAddRoom = (roomData: Partial<Room>) => {
        const newRoom: Room = {
            id: Math.max(...rooms.map(r => r.id)) + 1,
            name: roomData.name || '',
            type: roomData.type || 'standard',
            price: roomData.price || 0,
            capacity: roomData.capacity || 2,
            size: roomData.size || 0,
            image: roomData.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
            amenities: roomData.amenities || [],
            available: roomData.available !== undefined ? roomData.available : true,
        };
        setRooms([...rooms, newRoom]);
    };

    const handleEditRoom = (roomData: Partial<Room>) => {
        if (!editingRoom) return;

        setRooms(rooms.map(room =>
            room.id === editingRoom.id
                ? { ...room, ...roomData }
                : room
        ));
    };

    const handleDeleteRoom = (roomId: number) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            setRooms(rooms.filter(room => room.id !== roomId));
        }
    };

    const handleToggleAvailability = (roomId: number) => {
        setRooms(rooms.map(room =>
            room.id === roomId
                ? { ...room, available: !room.available }
                : room
        ));
    };

    const openEditModal = (room: Room) => {
        setEditingRoom(room);
        setShowModal(true);
    };

    const openViewModal = (room: Room) => {
        setViewingRoom(room);
        setShowViewModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingRoom(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
                    <p className="text-gray-600">Manage your hotel rooms and availability</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} className="mr-2" />
                    Add Room
                </Button>
            </div>

            {/* Room Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-medium text-gray-500">Total Rooms</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{rooms.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-medium text-gray-500">Available</h3>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                        {rooms.filter(r => r.available).length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-medium text-gray-500">Occupied</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        {rooms.filter(r => !r.available).length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-sm font-medium text-gray-500">Avg. Price</h3>
                    <p className="text-2xl font-bold text-purple-600 mt-2">
                        ${Math.round(rooms.reduce((sum, r) => sum + r.price, 0) / rooms.length)}
                    </p>
                </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48">
                            <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-full object-cover"
                            />
                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                                room.available
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {room.available ? 'Available' : 'Occupied'}
                            </div>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                <span className="text-xs font-semibold text-gray-900">#{room.id}</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex justify-between">
                                    <span>Type:</span>
                                    <span className="font-medium capitalize">{room.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Capacity:</span>
                                    <span className="font-medium">{room.capacity} guests</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Size:</span>
                                    <span className="font-medium">{room.size} m²</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Price:</span>
                                    <span className="font-bold text-gray-900">${room.price}/night</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-4">
                                {room.amenities.slice(0, 3).map((amenity, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                    >
                    {amenity}
                  </span>
                                ))}
                                {room.amenities.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{room.amenities.length - 3} more
                  </span>
                                )}
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openViewModal(room)}
                                    className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Eye size={16} className="mr-1" />
                                    View
                                </button>
                                <button
                                    onClick={() => openEditModal(room)}
                                    className="flex-1 flex items-center justify-center py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Edit size={16} className="mr-1" />
                                    Edit
                                </button>
                                <div className="relative group">
                                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                                        <button
                                            onClick={() => handleToggleAvailability(room.id)}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg"
                                        >
                                            Mark as {room.available ? 'Unavailable' : 'Available'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRoom(room.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                                        >
                                            Delete Room
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <AddEditRoomModal
                    room={editingRoom}
                    onSave={editingRoom ? handleEditRoom : handleAddRoom}
                    onClose={closeModal}
                />
            )}

            {showViewModal && viewingRoom && (
                <ViewRoomModal
                    room={viewingRoom}
                    onEdit={() => {
                        setShowViewModal(false);
                        openEditModal(viewingRoom);
                    }}
                    onClose={() => {
                        setShowViewModal(false);
                        setViewingRoom(null);
                    }}
                />
            )}
        </div>
    );
}
