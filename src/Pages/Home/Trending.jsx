import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import TrendingCard from "./TrendingCard";

const Trending = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://purple-media-server.vercel.app/trending")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="mt-20 pb-10 ">
      <h1 className="text-3xl font-bold text-black text-center mt-5 mb-10">
        TRENDING
      </h1>
      <div className="grid grid-cols-1  gap-10">
        {data.map((trendingPost) => (
          <TrendingCard
            key={trendingPost._id}
            trendingPost={trendingPost}
          ></TrendingCard>
        ))}
      </div>
    </div>
  );
};

export default Trending;
