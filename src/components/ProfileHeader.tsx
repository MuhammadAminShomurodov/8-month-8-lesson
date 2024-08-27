import React from 'react';

interface ProfileHeaderProps {
  avatarUrl: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarUrl,
  name,
  bio,
  location,
  website
}) => {
  return (
    <div className="flex items-center mb-6">
      <img
        src={avatarUrl}
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-gray-300 mr-6"
      />
      <div>
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{bio}</p>
        {location && <p className="text-gray-600">Location: {location}</p>}
        {website && (
          <p className="text-gray-600">
            Website:{" "}
            <a href={website} className="text-blue-500 hover:underline">
              {website}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
