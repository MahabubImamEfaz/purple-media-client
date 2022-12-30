import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { BsFillSuitHeartFill, BsSuitHeart } from "react-icons/bs";

const Details = () => {
  const { _id, status, image, likes, name } = useLoaderData();
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(likes);
  const [isActive, setIsActive] = useState(false);
  const handleLike = () => {
    setLike(isActive ? like - 1 : like + 1);
    setIsActive(!isActive);
  };
  console.log(like);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const comment = form.comment.value;

    const commentInfo = {
      comment,
      post_id: _id,
      email: user?.email,
      name: user?.displayName,
      status: status,
    };
    fetch("https://purple-media-server.vercel.app/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("comment added");
        form.reset();
        refetch();
      });
  };

  const url = `https://purple-media-server.vercel.app/comment?post_id=${_id}`;

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments", _id],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });

  const likeObject = {
    like,
  };
  fetch(`https://purple-media-server.vercel.app/updatelike/${_id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(likeObject),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        toast(`${user?.displayName} thanks for your reaction`);
      }
    });

  return (
    <div className="h-[1000px] flex justify-center items-center bg-[#e0aaff] ">
      <div className="rounded-md shadow-md sm:w-96 lg:w-2/3 bg-[#9d4edd] text-gray-100 ">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <div className="-space-y-1">
              <h2 className="text-sm font-semibold leading-none">{name}</h2>
            </div>
          </div>
        </div>
        <img
          src={image}
          alt=""
          className="object-cover object-center w-full h-72 dark:bg-gray-500"
        />
        <div className="p-3">
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
          <div className="flex flex-wrap items-center pt-3 pb-1"></div>
          <div className="space-y-3">
            <p className="font-semibold">Caption: {status}</p>

            {comments.map((comment, index) => (
              <p className="text-sm">
                <span
                  key={index}
                  className="text-base font-semibold mr-1 text-yellow-400"
                >
                  {comment.name}
                </span>
                {comment.comment}
              </p>
            ))}

            <div>
              <form onSubmit={handleSubmit}>
                <input
                  name="comment"
                  type="text"
                  className="w-3/4 py-0.5 bg-white border-none rounded text-sm pl-0 mr-4 text-black input"
                />

                <input
                  className="w-[100px] btn  border bg-[#c77dff] text-white hover:bg-[#e0aaff]"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
