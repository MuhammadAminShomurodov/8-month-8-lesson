import React from "react";

interface ContributionInfo {
  totalCommits: number;
  recentActivity: { type: string; repo: string; date: string }[];
}

interface ContributionsProps {
  contributions: ContributionInfo;
}

const Contributions: React.FC<ContributionsProps> = ({ contributions }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Contributions:</h3>
      <p className="text-gray-600 mb-4">
        Total Commits: {contributions.totalCommits}
      </p>
      <h4 className="text-md font-semibold">Recent Activity:</h4>
      <ul className="list-disc list-inside">
        {contributions.recentActivity.map((activity, index) => (
          <li key={index} className="mb-2">
            {activity.type} in <strong>{activity.repo}</strong> on{" "}
            {new Date(activity.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contributions;
