import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import { Input, Textarea, Button, Error } from "../components";
import { createJob, updateJob } from "../api";
import { useAuth } from "../context/auth";

const CreatePage = () => {
  const { user } = useAuth();
  const [job, setJob] = useState({ title: "", description: "", location: "", phoneNo: "", facebookId: "", postedBy: JSON.parse(localStorage.getItem("auth")).user.id });
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const locationUrl = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationUrl.state) {
      setIsUpdating(true);

      const { title, description, location, phoneNo, facebookId } = locationUrl.state;

      setJob({ title,description,location,phoneNo,facebookId,postedBy: JSON.parse(localStorage.getItem("auth")).user.id });
    }
  }, [locationUrl.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isUpdating) {
        const { data } = await updateJob(locationUrl.state._id, job);

        if (data.error) return setError(data.message);
      } else {
        const { data } = await createJob(job);

        if (data.error) return setError(data.message);
      }

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  if (user.user.role === "caregiver") {
    return (
      <div className="w-8/12 sm:w-9/12 m-auto my-24">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-9 text-center">Your account is a caregiver type! You cannot post a job</h1>
        <Link to="/"><Button>Go to Homepage</Button></Link>
      </div>
    );
  }

  return (
    <main className={`w-full max-w-4xl m-auto px-5 md:px-12 sm:px-32 py-20`}>
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-14">
        Create a Job Listing in seconds.
      </h1>
      {error && <Error message={error} />}

      <form onSubmit={handleSubmit}>
        <Input label="Title" type="text" value={job.title} onChange={(e) => setJob({ ...job, title: e.target.value })} />
        <Textarea label="Description" type="text" value={job.description} onChange={(e) => setJob({ ...job, description: e.target.value })} />
        <Input label="Location" type="text" value={job.location} onChange={(e) => setJob({ ...job, location: e.target.value })} />
        <Input label="Contact - Phone Number" type="text" value={job.phoneNo} onChange={(e) => setJob({ ...job, phoneNo: e.target.value })} />
        <Input label="Contact - Facebook Id" type="text" value={job.facebookId} onChange={(e) => setJob({ ...job, facebookId: e.target.value })} />
        <Button type="submit">Create a Job Listing</Button>
      </form>
    </main>
  );
};

export default CreatePage;
