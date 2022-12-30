import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { _id, status, image } = post;
  const url = `https://purple-media-server.vercel.app/comment?post_id=${_id}`;

  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100 mx-auto">
      <img
        src={image}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="font-thin ">
            Uploader: <span className="font-semibold">{post?.name}</span>
          </h2>

          <p className="text-gray-100  font-semibold">
            <span className="text-yellow-400">Caption:</span> {status}
          </p>
          {comments.map((comment, index) => (
            <p className="text-sm">
              <span key={index} className="text-base  mr-1 text-yellow-400">
                {comment.name}:
              </span>
              {comment.comment}
            </p>
          ))}
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
