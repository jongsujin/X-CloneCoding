"use client";
import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../../_lib/getTrends";
import style from "../explore.module.css";
import Trend from "../../_component/Trend";
export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 30 * 1000,
  });
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        {data?.map((trend) => (
          <Trend trend={trend} key={trend.tagId} />
        ))}
      </div>
    </div>
  );
}
