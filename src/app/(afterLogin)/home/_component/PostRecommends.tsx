"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getPostRecommends } from "../_lib/getPostRecommends";
import Post from "../../_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "@/app/(afterLogin)/home/home.module.css";

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isError } =
    useInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      staleTime: 60 * 1000, // 1분
      gcTime: 300 * 1000,
    });
  const { ref, inView } = useInView({
    threshold: 0, // div가 보이고 몇 px 움직여야 이벤트가 실행 될 것인가?
    delay: 0.5, // 몇 초후에 이벤트를 실행 시킬 것인가?
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg
          className={styles.loader}
          height="100%"
          viewBox="0 0 32 32"
          width={40}
        >
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{
              stroke: "rgb(29, 155, 240)",
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          ></circle>
        </svg>
      </div>
    );
  }

  // if (isError) {
  //   return "에러 처리해줘";
  // }
  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
