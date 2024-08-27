import React from "react";

interface SearchFormProps {
  username: string;
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  searching: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  username,
  onUsernameChange,
  onSearch,
  searching,
}) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={onUsernameChange}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full"
      />
      <button
        onClick={onSearch}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        disabled={searching}
      >
        Search
      </button>
    </div>
  );
};

export default SearchForm;
