// import { useState } from "react";
// import Search from "../../components/Search";
// import Profile from "../../components/Profile";

// const ProfilePage: React.FC = () => {
//   const [profileInfo, setProfileInfo] = useState<{
//     name: string | null;
//     bio: string | null;
//     avatarUrl: string;
//     location: string | null;
//     website: string | null;
//     repositories: any[];
//     contributions: any;
//   } | null>(null);

//   const [searching, setSearching] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleUsernameSelect = async (username: string) => {
//     try {
//       const response = await fetch(`/api/profile/${username}`);
//       if (!response.ok) throw new Error("Profile not found");
//       const data = await response.json();
//       setProfileInfo(data);
//     } catch (e) {
//       if (e instanceof Error) {
//         setError(e.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     } finally {
//       setSearching(false);
//     }
//   };
//   const handleError = (message: string) => {
//     setError(message);
//     setSearching(false);
//   };

//   const handleSearching = (searching: boolean) => {
//     setSearching(searching);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       {profileInfo ? (
//         <Profile
//           profileInfo={profileInfo}
//           onBackToSearch={() => setProfileInfo(null)}
//         />
//       ) : (
//         <Search
//           onUsernameSelect={handleUsernameSelect}
//           onError={handleError}
//           onSearching={handleSearching}
//         />
//       )}
//       {searching && <p className="text-blue-500">Searching...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//     </div>
//   );
// };

// export default ProfilePage;
