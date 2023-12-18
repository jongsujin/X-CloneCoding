"use client";
import { faker } from "@faker-js/faker";
import style from "@/app/(afterLogin)/messages/message.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";

dayjs.locale("ko");
dayjs.extend(relativeTime);
export default function Room() {
  const router = useRouter();
  const user = {
    id: "hero",
    nickname: "영웅",
    Messages: [
      {
        messageId: 1,
        roomId: 123,
        id: "jongsujin",
        content: "안녕하세요",
        createdAt: new Date(),
      },
      {
        messageId: 2,
        roomId: 123,
        id: "hero",
        content: "안녕히가세요",
        createdAt: new Date(),
      },
    ],
  };
  const onClick = () => {
    router.push(`/messages/${user.Messages.at(-1)?.roomId}`);
  };
  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={faker.image.avatar()} alt="" />
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{user.nickname}</b>
          &nbsp;
          <span>@{user.id}</span>. &nbsp;
          <span className={style.postDate}>
            {dayjs(user.Messages?.at(-1)?.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>
          {user.Messages?.at(-1)?.content}
        </div>
      </div>
    </div>
  );
}
