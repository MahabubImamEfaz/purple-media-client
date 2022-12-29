import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Media = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("http://localhost:5000/allposts").then((res) => res.json()),
  });
  return (
    <div className="bg-[#e0aaff]">
      <h1 className="text-4xl pt-5 pb-10 font-bold text-center">
        See all the {posts.length} Posts here
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Media;
