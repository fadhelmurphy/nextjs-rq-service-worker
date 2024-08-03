import React from 'react';
import Link from 'next/link';

const Navigation = () => (
  <nav className="bg-gray-800 p-4">
    <ul className="flex gap-4 list-none p-0 m-0">
      <li>
        <Link href="/" className="text-white px-4 py-2 rounded hover:bg-gray-600">
          Home
        </Link>
      </li>
      <li>
        <Link href="/watched" className="text-white px-4 py-2 rounded hover:bg-gray-600">
        Watched Movies
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
