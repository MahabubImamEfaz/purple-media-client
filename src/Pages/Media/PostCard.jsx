import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { _id, status, image, email } = post;
  return (
    <div className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100 mx-auto">
      <img
        src={image}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="font-thin tracking-wide">{post?.name}</h2>
          <h2 className="font-thin tracking-wide">{email}</h2>
          <p className="text-gray-100 text-xl font-semibold">{status}</p>
        </div>
        <Link to={`/details/${_id}`}>
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
          >
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
