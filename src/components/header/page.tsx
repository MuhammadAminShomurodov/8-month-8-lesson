import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .297c-6.627 0-12 5.373-12 12 0 5.288 3.438 9.8 8.055 11.394.592.109.812-.258.812-.575v-2.003c-3.287.714-3.98-1.585-3.98-1.585-.537-1.36-1.31-1.724-1.31-1.724-1.072-.735.082-.72.082-.72 1.188.083 1.812 1.222 1.812 1.222 1.062 1.815 2.79 1.292 3.475.99.108-.768.416-1.292.757-1.592-2.664-.304-5.466-1.332-5.466-5.928 0-1.31.47-2.379 1.24-3.219-.124-.304-.54-1.527.118-3.175 0 0 1.003-.321 3.29 1.226.955-.266 1.983-.398 3.002-.404 1.02.006 2.046.138 3.002.404 2.288-1.547 3.29-1.226 3.29-1.226.658 1.648.243 2.871.118 3.175.77.84 1.24 1.91 1.24 3.219 0 4.605-2.808 5.624-5.48 5.919.43.371.815 1.102.815 2.223v3.293c0 .319.22.684.822.568C20.563 22.094 24 17.582 24 12.297c0-6.627-5.373-12-12-12z" />
          </svg>
          <h1 className="text-xl font-semibold">GitHub Finder</h1>
        </div>
        <nav>
          <a
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded"
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-300 hover:text-white px-3 py-2 rounded"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-300 hover:text-white px-3 py-2 rounded"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
