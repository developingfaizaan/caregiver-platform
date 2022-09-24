import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { fetchJobs } from "../api";
import { PostCard } from "../components";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await fetchJobs();

      setJobs(data.jobs.reverse());
    })();
  }, []);

  return (
    <main className="w-full max-w-4xl m-auto px-5 md:px-12 sm:px-32 py-20">
      {jobs.length === 0 && (
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">
          No jobs to show!
        </h1>
      )}

      {jobs &&
        jobs.map((job) => (
          <Link to={`/job/${job._id}`} key={job._id}>
            <PostCard job={job} />
          </Link>
        ))}
    </main>
  );
};

export default HomePage;
