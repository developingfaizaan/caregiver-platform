import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";

import { Error, PostCard, Loader, Button } from "../components";
import { profilePosts, updateProfilePhoto } from "../api";
import { nameInitialsGenerator } from "../utils";
import { editIcon } from "../assets";
import { useAuth } from "../context/auth";

const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser} = useAuth();
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    profilePosts(id)
      .then(({ data }) => {
        setUser(data.user);

        if (data.user.role === "caregiver") return setLoading(false);

        if (!data.jobs) return setError(data.message);
        
        setJobs(data.jobs.reverse());
        setLoading(false);
      })
      .catch((error) => setError(error.response.data.message));
  }, [id]);

  if (!id) return <h1>No user with that ID</h1>;

  const handleProfileChange = async () => {
    const { data: { newUser } } = await updateProfilePhoto(id, { profilePhoto: image });

    setEdit(false);
    setUser({...user, profilePhoto: newUser.profilePhoto })
  };

  return (
    <main className="w-full max-w-4xl my-20 mx-auto px-5 md:px-12 sm:px-32">
      
      {loading && <Loader />}

      {!loading && user && (
        <figure className="flex flex-col items-center gap-2">
          <div className="inline-flex relative justify-center items-center w-36 h-36 bg-primary rounded-full">
            {user.profilePhoto ? (
              <div>
                <img className="rounded-full object-cover h-36 w-36" src={user.profilePhoto} alt="Profile" />
              </div>
            ) : (
              <span className="font-medium text-white text-4xl">{nameInitialsGenerator(user.name)}</span>
            )}

            { user._id === currentUser?.user?.id && 
              <img onClick={() => setEdit((prev) => !prev)} className="absolute top-0 right-0 cursor-pointer" src={editIcon} title="Edit Profile Photo" alt="Edit Profile" />
            }
          </div>

          { edit && (
            <>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setImage(base64)} />
              <Button onClick={handleProfileChange} styles="w-2/4">Update Photo</Button>
            </>
          )}

          <div className="flex flex-col items-center mb-24">
            <span className="text-xl my-1 font-medium">{user.name}</span>
            <small className="text-white700 text-lg">{user.email}</small>
          </div>
        </figure>
      )}

      {error && <Error message={error} />}

      {loading === false && user.role !== "caregiver" && jobs.length === 0 && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-9 text-center">No job posted by this user!</h2>
        )
      }
      
      {jobs && jobs.map((job) => <PostCard job={job} key={job._id} /> )}
    </main>
  );
};

export default ProfilePage;
