"use client"
import React, { useState, useEffect } from 'react';
import { AlertCircle, Save, RefreshCw, LogIn, LogOut } from 'lucide-react';

// TypeScript interfaces based on Swagger documentation
interface RoomData {
    id: string;
    price: number;
}

interface HotelData {
    rooms: RoomData[];
}

interface ApiResponse<T> {
    data: T;
}

interface LoginResponse {
    data: {
        token: string;
    }
}

const API_BASE_URL = 'https://qbtrm0eq50.execute-api.us-east-1.amazonaws.com/dev';

// Default room types
const DEFAULT_ROOM_TYPES = ['luxe', 'deluxe', 'econom'];

const HotelAdminPanel: React.FC = () => {
    const [token, setToken] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [selectedPage, setSelectedPage] = useState<string>('main-page');
    const [hotelData, setHotelData] = useState<HotelData>({ rooms: [] });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    // Initialize default room structure
    const initializeRooms = (data: HotelData | null): HotelData => {
        const rooms = DEFAULT_ROOM_TYPES.map(roomType => {
            const existingRoom = data?.rooms?.find(room => room.id === roomType);
            return existingRoom || { id: roomType, price: 0 };
        });
        return { rooms };
    };

    // Check for stored token on component mount
    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    // Handle login
    const handleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { data }: LoginResponse = await response.json();
            setToken(data.token);
            setIsAuthenticated(true);
            sessionStorage.setItem('authToken', data.token);
            setLogin('');
            setPassword('');
            setSuccess('Successfully logged in!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    // Handle logout
    const handleLogout = () => {
        setToken('');
        setIsAuthenticated(false);
        sessionStorage.removeItem('authToken');
        setHotelData({ rooms: [] });
    };

    // Fetch data from API
    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/data?pageId=${selectedPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const result: ApiResponse<HotelData> = await response.json();
            // Initialize rooms with default structure if data is null or missing
            const initializedData = initializeRooms(result.data);
            setHotelData(initializedData);
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
            // Set default room structure on error
            setHotelData(initializeRooms(null));
        } finally {
            setLoading(false);
        }
    };

    // Save data to API
    const saveData = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    pageId: selectedPage,
                    data: hotelData,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save data');
            }

            setSuccess('Data saved successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('Failed to save data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Update room price
    const updateRoomPrice = (roomId: string, price: string) => {
        const updatedRooms = hotelData.rooms.map(room =>
            room.id === roomId ? { ...room, price: Number(price) || 0 } : room
        );
        setHotelData({ rooms: updatedRooms });
    };

    // Get room by ID
    const getRoomById = (roomId: string): RoomData | undefined => {
        return hotelData.rooms.find(room => room.id === roomId);
    };

    // Handle Enter key for login
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && login && password) {
            handleLogin();
        }
    };

    // Load data when page changes or component mounts
    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [selectedPage, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-md mx-auto mt-16">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">Hotel Admin Login</h1>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Login
                                </label>
                                <input
                                    type="text"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={loading || !login || !password}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <LogIn className="w-5 h-5" />
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Hotel Admin Panel</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center gap-2"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                            {success}
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Page
                        </label>
                        <select
                            value={selectedPage}
                            onChange={(e) => setSelectedPage(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="main-page">Main Page</option>
                            <option value="landing">Landing</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-700">Room Prices</h2>
                            <button
                                onClick={fetchData}
                                disabled={loading}
                                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh
                            </button>
                        </div>

                        {loading ? (
                            <div className="text-center py-8 text-gray-500">Loading...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                                            Room Type
                                        </th>
                                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                                            Price
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 font-medium">
                                            Luxe
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            <input
                                                type="number"
                                                value={getRoomById('luxe')?.price || 0}
                                                onChange={(e) => updateRoomPrice('luxe', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter price"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-3 font-medium">
                                            Deluxe
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            <input
                                                type="number"
                                                value={getRoomById('deluxe')?.price || 0}
                                                onChange={(e) => updateRoomPrice('deluxe', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter price"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 font-medium">
                                            Econom
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            <input
                                                type="number"
                                                value={getRoomById('econom')?.price || 0}
                                                onChange={(e) => updateRoomPrice('econom', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter price"
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={saveData}
                            disabled={loading || !isAuthenticated}
                            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelAdminPanel;
