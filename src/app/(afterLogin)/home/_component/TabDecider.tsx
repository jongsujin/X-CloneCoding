"use client";
import FollowingPosts from "./FollowingPosts";
import PostRecommends from "./PostRecommends";
import { TabContext } from "./TabProvider";
import { useContext } from "react";
export default function TabDecider() {
  const { tab } = useContext(TabContext);
  if (tab === "rec") {
    return <PostRecommends />;
  }
  return <FollowingPosts />;
}
