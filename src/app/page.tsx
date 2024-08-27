"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface RepoInfo {
  name: string;
  description: string;
  language: string | null;
  stars: number;
}

interface ContributionInfo {
  totalCommits: number;
  recentActivity: { type: string; repo: string; date: string }[];
}

interface ProfileInfo {
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  location: string | null;
  website: string | null;
  repositories: RepoInfo[];
  contributions: ContributionInfo;
}

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileInfo");
    if (storedProfile) {
      setProfileInfo(JSON.parse(storedProfile));
    }
  }, []);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const fetchUsernames = async () => {
    setError(null);
    setUsernames([]);
    setSearching(true);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );
      setUsernames([username]);
    } catch (err: any) {
      setError(
        err.response?.status === 404
          ? "User not found"
          : "Failed to fetch user information"
      );
    } finally {
      setSearching(false);
    }
  };

  const fetchProfileInfo = async (username: string) => {
    setError(null);
    setProfileInfo(null);

    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );

      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );

      const contributions = await getContributions(username);

      const profileData: ProfileInfo = {
        name: userResponse.data.name,
        bio: userResponse.data.bio,
        avatarUrl: userResponse.data.avatar_url,
        location: userResponse.data.location,
        website: userResponse.data.blog,
        repositories: reposResponse.data.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
        })),
        contributions: contributions,
      };

      localStorage.setItem("profileInfo", JSON.stringify(profileData));
      setProfileInfo(profileData);
    } catch (err: any) {
      setError(
        err.response?.status === 404
          ? "User not found"
          : "Failed to fetch profile information"
      );
    }
  };

  const getContributions = async (
    username: string
  ): Promise<ContributionInfo> => {
    try {
      const eventsResponse = await axios.get(
        `https://api.github.com/users/${username}/events`,
        {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
        }
      );

      let totalCommits = 0;
      const recentActivity: ContributionInfo["recentActivity"] = [];
      for (const event of eventsResponse.data) {
        if (event.type === "PushEvent") {
          totalCommits += event.payload.size;
        } else if (
          event.type === "IssuesEvent" ||
          event.type === "PullRequestEvent"
        ) {
          recentActivity.push({
            type: event.type,
            repo: event.repo.name,
            date: event.created_at,
          });
        }
      }

      return { totalCommits, recentActivity };
    } catch (err: any) {
      console.error("Error fetching contributions:", err);
      return { totalCommits: 0, recentActivity: [] };
    }
  };

  const handleBackToSearch = () => {
    setProfileInfo(null);
    setShowAllRepos(false);
  };

  const toggleShowAllRepos = () => {
    setShowAllRepos(!showAllRepos);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <div className="container max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          GitHub Profile Search
        </h1>

        {profileInfo ? (
          <>
            <button
              onClick={handleBackToSearch}
              className="mb-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
            >
              Back to Search
            </button>
            <div className="flex flex-col lg:flex-row">
              <div className="profile-info lg:w-1/3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <img
                    src={profileInfo.avatarUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-2 border-gray-300 mr-6"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                      <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {profileInfo.name || username}
                      </a>
                    </h2>
                    <p className="text-gray-600">{profileInfo.bio}</p>
                    {profileInfo.location && (
                      <p className="text-gray-500 mt-2">
                        <svg
                          className="w-4 h-4 inline-block mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 20s-6-7.58-6-11.5a6 6 0 1112 0C16 12.42 10 20 10 20zM7 8a3 3 0 106 0 3 3 0 00-6 0z" />
                        </svg>
                        {profileInfo.location}
                      </p>
                    )}
                    {profileInfo.website && (
                      <p className="text-gray-500 mt-2">
                        <svg
                          className="w-4 h-4 inline-block mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M12.293 9.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 11.414V15a1 1 0 11-2 0v-4a1 1 0 011-1h4a1 1 0 110 2h-3.586l2.293 2.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 15H11a3 3 0 01-3-3V8a3 3 0 013-3h4a1 1 0 110 2h-4a1 1 0 110-2h3.586l-2.293-2.293a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414L14.586 3H15a3 3 0 013 3v4a3 3 0 01-3 3h-4a1 1 0 010-2h3.586l-2.293-2.293a1 1 0 01-.293-.707V7a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1V7a1 1 0 01.293-.707l3-3a1 1 0 010-1.414L14.586 5H11a3 3 0 01-3 3v4a3 3 0 01-3 3H7a1 1 0 010-2h1.586L5.293 9.707a1 1 0 011.414-1.414L9.414 11H7a1 1 0 010-2H7a1 1 0 01-.293-.707L5 8.586V11a1 1 0 11-2 0V8.586L1.707 11.293a1 1 0 11-1.414-1.414l3-3A1 1 0 014 7.414L5.293 6.293z" />
                        </svg>
                        <a
                          href={profileInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {profileInfo.website}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                <div className="contributions mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Contributions
                  </h3>
                  <p className="text-gray-700">
                    Total Commits: {profileInfo.contributions.totalCommits}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-4">
                    Recent Activity
                  </h4>
                  <ul className="space-y-2 mt-2">
                    {profileInfo.contributions.recentActivity.map(
                      (activity, index) => (
                        <li key={index} className="text-gray-600">
                          {activity.type} in{" "}
                          <a
                            href={`https://github.com/${username}/${activity.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {activity.repo}
                          </a>{" "}
                          - {new Date(activity.date).toLocaleDateString()}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
              <div className="repos lg:w-2/3 lg:pl-6 mt-6 lg:mt-0">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Repositories
                </h3>
                <ul className="space-y-4">
                  {profileInfo.repositories
                    .slice(0, showAllRepos ? undefined : 5)
                    .map((repo, index) => (
                      <li
                        key={index}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                      >
                        <h4 className="text-lg font-semibold text-gray-800">
                          <a
                            href={`https://github.com/${username}/${repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {repo.name}
                          </a>
                        </h4>
                        <p className="text-gray-600">{repo.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {repo.language && (
                            <span className="mr-4">{repo.language}</span>
                          )}
                          <span>{repo.stars} stars</span>
                        </p>
                      </li>
                    ))}
                </ul>
                {profileInfo.repositories.length > 5 && (
                  <button
                    onClick={toggleShowAllRepos}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                  >
                    {showAllRepos ? "Show Less" : "Show All"}
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-4 border border-gray-300 rounded-md mb-4 text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchUsernames}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              disabled={searching}
            >
              {searching ? "Searching..." : "Search"}
            </button>
            {usernames.length > 0 && (
              <ul className="mt-4">
                {usernames.map((username) => (
                  <li
                    key={username}
                    onClick={() => fetchProfileInfo(username)}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {username}
                  </li>
                ))}
              </ul>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
