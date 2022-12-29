import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

import { AuthContext } from "../../Context/AuthProvider";
import BookingModal from "./BookingModal";

const About = () => {
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/about?email=${user?.email}`;

  const {
    data: about = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["about", user?.email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className="text-center flex justify-center items-center w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#e9c46a]"></div>
    );
  }

  return (
    <div className="h-[1000px] flex justify-center  bg-[#e0aaff]">
      <div className="w-96 p-7">
        <h2 className="text-center text-3xl text-center text-black font-bold mb-5">
          About
        </h2>
        <div className="flex justify-end">
          <label
            htmlFor="my-modal"
            className="btn  w-1/3 bg-[#9d4edd] text-white hover:bg-[#c77dff] mt-5"
          >
            Edit
          </label>
        </div>
        <form>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={about[0]?.name}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              defaultValue={about[0]?.email}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">University</span>
            </label>
            <input
              type="text"
              defaultValue={about[0]?.university}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              defaultValue={about[0]?.address}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </form>

        <BookingModal
          about={about}
          refetch={refetch}
          isLoading={isLoading}
        ></BookingModal>
      </div>
    </div>
  );
};

export default About;
