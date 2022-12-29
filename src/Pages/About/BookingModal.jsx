import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ about, refetch, isLoading }) => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const university = form.university.value;
    const address = form.address.value;

    const update = {
      name: name,
      email: email,
      university: university,
      address: address,
    };

    fetch(`http://localhost:5000/aboutupdate/${about[0]?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          navigate("/updated");
          toast.success("Personal information updated");
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              name="name"
              defaultValue={about[0]?.name}
              type="text"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              defaultValue={about[0]?.email}
              type="text"
              className="input w-full input-bordered"
            />
            <input
              name="university"
              defaultValue={about[0]?.university}
              type="text"
              className="input w-full input-bordered"
            />
            <input
              name="address"
              defaultValue={about[0]?.address}
              type="text"
              className="input w-full input-bordered"
            />

            <input
              className="btn bg-[#9d4edd]  w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
