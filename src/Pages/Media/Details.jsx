import React from "react";
import { useLoaderData } from "react-router-dom";

const Details = () => {
  const { _id, status, image, email, name } = useLoaderData();
  return (
    <div className="h-[100vh] flex justify-center items-center bg-[#e0aaff] ">
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
                  className="w-5 h-5 fill-current"
                >
                  <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center pt-3 pb-1"></div>
          <div className="space-y-3">
            <p className="font-semibold">Caption: {status}</p>
            <p className="text-sm">
              <span className="text-base font-semibold">leroy_jenkins72</span>
              Nemo ea quasi debitis impedit!
            </p>

            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full py-0.5 dark:bg-transparent border-none rounded text-sm pl-0 dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
