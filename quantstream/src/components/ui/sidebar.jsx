import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav className="space-y-2">
        <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
          Dashboard
        </Link>
        <Link to="/analytics" className="block px-4 py-2 rounded hover:bg-gray-700">
          Analytics
        </Link>
        <Link to="/reports" className="block px-4 py-2 rounded hover:bg-gray-700">
          Reports
        </Link>
        <Link to="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
