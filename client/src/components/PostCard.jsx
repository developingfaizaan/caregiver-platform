import { Link } from "react-router-dom";

import { Avatar } from "./";
import { favoriteIcon } from "../assets";
import { useAuth } from "../context/auth";

const PostCard = ({ job }) => {
  const { title, description, location, postedBy: { name, profilePhoto, _id: userId }} = job;
  const { user } = useAuth();

  return (
    <article className="mb-16 bg-white rounded-lg shadow-sm overflow-hidden">
      <header className="flex justify-between items-center p-10">
        <div className="flex items-center gap-3">
          <Link to={`/user/${userId}`} title="Profile Page">
            <Avatar name={name} profilePhoto={profilePhoto} />
          </Link>
          <small className="text-gray400">• {location}</small>
        </div>
        <div className="flex gap-10 text-white700">
          <button href="/" className="flex items-center gap-1">
            <img src={favoriteIcon} alt="Favorite" />
          </button>
        </div>
      </header>

      <Link to={`/job/${job._id}`}>
        <div className="px-10">
          <h3 className="text-xl mb-3 font-medium text-gray-900">{title}</h3>
          <p className="mb-8 text-gray800 truncate">{description}</p>
        </div>

        <div className="px-10 py-6 bg-primary flex justify-between items-center">
        <h4 className="font-medium text-white text-lg">$23-34k /month</h4>
        { user?.user?.id !== userId && (   
            <button className="bg-white text-primary py-2 px-5 rounded-md">
              Apply Now
            </button>
        )}
          </div>
      </Link>

    </article>
  );
};

export default PostCard;
