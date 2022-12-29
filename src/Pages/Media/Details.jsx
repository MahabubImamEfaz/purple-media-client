import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Details = () => {
  const { _id, status, image, email, name } = useLoaderData();
  const { user } = useContext(AuthContext);

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
    fetch("http://localhost:5000/comments", {
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

  const url = `http://localhost:5000/comment?post_id=${_id}`;

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
  // if (isLoading) {
  //   return (
  //     <div className="text-center flex justify-center items-center w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#e9c46a]"></div>
  //   );
  // }
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
              <button
                type="button"
                title="Like post"
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5  text-red-900"
                >
                  <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center pt-3 pb-1"></div>
          <div className="space-y-3">
            <p className="font-semibold">Caption: {status}</p>

            {comments.map((comment) => (
              <p className="text-sm">
                <span
                  key={comment.key}
                  className="text-base font-semibold mr-1 text-yellow-400"
                >
                  {comment.name}
                </span>
                {comment.comment}
              </p>
            ))}

            <div>
              <form onSubmit={handleSubmit}>
                {/* <input
                name="commentss"
                type="text"
                className="w-3/4 py-0.5 bg-white border-none rounded text-sm pl-0 mr-4 text-black input"
              />
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                className=" w-3/4 py-0.5 bg-white border-none rounded text-sm pl-0 text-gray-100 mr-4 text-black"
              />
              <input
                className="  w-[100px] btn  border bg-[#c77dff] text-white hover:bg-[#e0aaff]"
                type="submit"
              /> */}
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
