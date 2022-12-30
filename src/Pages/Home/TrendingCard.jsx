import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { AuthContext } from "../../Context/AuthProvider";

const TrendingCard = ({ trendingPost }) => {
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(trendingPost.likes);
  const [isActive, setIsActive] = useState(false);
  const handleLike = () => {
    setLike(isActive ? like - 1 : like + 1);
    setIsActive(!isActive);
  };
  const url = `https://purple-media-server.vercel.app/comment?post_id=${trendingPost._id}`;

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments", trendingPost._id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const likeObject = {
    like,
  };
  fetch(
    `https://purple-media-server.vercel.app/updatelike/${trendingPost._id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(likeObject),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        toast(`${user?.displayName} thanks for your reaction`);
      }
    });
  return (
    <div className="max-w-xs rounded-md shadow-md bg-gray-900 text-gray-100 mx-auto">
      <img
        src={trendingPost.image}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="curser-pointer text-2xl select-none">
              {isActive ? (
                <BsFillSuitHeartFill onClick={handleLike} />
              ) : (
                <BsSuitHeart onClick={handleLike} />
              )}
            </div>
            <span>{like} </span>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="font-thin ">
            Uploader: <span className="font-semibold">{trendingPost.name}</span>
          </h2>

          <p className="text-gray-100  font-semibold">
            <span className="text-yellow-400">Caption:</span>{" "}
            {trendingPost.status}
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
        <Link to={`/details/${trendingPost._id}`}>
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

export default TrendingCard;
