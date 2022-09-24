import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { Error, PostCard } from "../components";
import { profilePosts } from "../api";
import { nameInitialsGenerator } from "../utils";

const ProfilePage = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    profilePosts(id)
      .then(({ data }) => {
        setUser(data.user);

        if (!data.jobs) return setError(data.message);

        if (data.jobs.length === 0) return setError("No job posted by this user");

        setJobs(data.jobs.reverse());
      })
      .catch((error) => setError(error.response.data.message));
  }, [id]);

  if (!id) return <h1>No user with that ID</h1>;

  return (
    <main className="w-full max-w-4xl my-20 mx-auto px-5 md:px-12 sm:px-32">
      {user && (
        <figure className="flex flex-col items-center gap-2">
          <div className="inline-flex overflow-hidden relative justify-center items-center w-36 h-36 bg-primary rounded-full">
           
            {user.profilePhoto ? (
              <img className="object-cover h-36 w-36" src={user.profilePhoto} alt="Profile" />
            ) : (
              <span className="font-medium text-white">{nameInitialsGenerator(user.name)}</span>
            )}
          </div>

          <div className="flex flex-col items-center mb-24">
            <span className="text-xl my-1 font-medium">{user.name}</span>
            <small className="text-white700 text-lg">{user.email}</small>
          </div>
        </figure>
      )}

      {error && <Error message={error} />}

      {jobs &&
        jobs.map((job) => (
          <Link to={`/job/${job._id}`} key={job._id}>
            <PostCard job={job} />
          </Link>
        ))}
    </main>
  );
};

export default ProfilePage;
