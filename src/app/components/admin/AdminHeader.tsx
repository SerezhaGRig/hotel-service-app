"use client"

import React from 'react';
import { Bell, User, Search } from 'lucide-react';

export const AdminHeader: React.FC = () => {
    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center flex-1">
                    <div className="max-w-md w-full">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-600 hover:text-gray-900">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            A
                        </div>
                        <span className="text-sm font-medium text-gray-700">Admin User</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
