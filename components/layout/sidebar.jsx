import React from 'react';

const Sidebar = ({ role, children }) => {
  let links;
  if (role === 'admin') {
    links = (
      <>
        <a href="/dashboard" className="text-blue-600 hover:text-blue-800">Admin Dashboard</a>
        <a href="/manage-courses" className="text-blue-600 hover:text-blue-800">Manage Courses</a>
        <a href="/manage-users" className="text-blue-600 hover:text-blue-800">Manage Users</a>
        <a href="/logout" className="text-blue-600 hover:text-blue-800">Logout</a>
      </>
    );
  } else if (role === 'student') {
    links = (
      <>
        <a href="/courses" className="text-green-600 hover:text-green-800">My Courses</a>
        <a href="/profile" className="text-green-600 hover:text-green-800">Profile</a>
        <a href="/signin" className="text-green-600 hover:text-green-800">Logout</a>
      </>
    );
  } else {
    links = null;
  }

  if (!links) return null;

  return (
    <aside className="w-64 bg-gray-100 h-full p-4 hidden md:block border-r">
      <nav className="flex flex-col gap-4">
        {links}
      </nav>
      {children}
    </aside>
  );
};

export default Sidebar;
