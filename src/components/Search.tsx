"use client";
import { useState } from "react";

interface SearchProps {
  onUsernameSelect: (username: string) => void;
  onError: (message: string) => void;
  onSearching: (searching: boolean) => void;
}

const Search: React.FC<SearchProps> = ({
  onUsernameSelect,
  onError,
  onSearching,
}) => {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    if (username.trim()) {
      onSearching(true);
      onUsernameSelect(username.trim());
      setUsername("");
    } else {
      onError("Please enter a username.");
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border border-gray-300 rounded-l-lg p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
