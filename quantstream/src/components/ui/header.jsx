// src/components/ui/header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { UserNav } from './user-nav';
import { CitySwitcher } from '@/pages/dashboard/components/city-switcher';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between px-4 border-b bg-white shadow">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-semibold">HydroVault</Link>
        <CitySwitcher />
        <nav className="hidden md:flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          <Link to="/analytics" className="hover:text-gray-700">Analytics</Link>
          <Link to="/reports" className="hover:text-gray-700">Reports</Link>
        </nav>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
      </div>
    </header>
  );
}
