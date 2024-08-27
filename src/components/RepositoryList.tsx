import React from "react";

interface RepoInfo {
  name: string;
  description: string;
  language: string | null;
  stars: number;
}

interface RepositoryListProps {
  repositories: RepoInfo[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Repositories:</h3>
      <ul className="list-disc list-inside mb-6">
        {repositories.map((repo) => (
          <li key={repo.name} className="mb-4">
            <h4 className="text-md font-semibold">{repo.name}</h4>
            <p className="text-gray-600">{repo.description}</p>
            <p className="text-gray-600">Language: {repo.language || "N/A"}</p>
            <p className="text-gray-600">Stars: {repo.stars}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
