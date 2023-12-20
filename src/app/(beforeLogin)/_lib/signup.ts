"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (prevState: any, formData: FormData) => {
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include", //이게 있어야 쿠키가 전달 된다.
      }
    );
    console.log(response.status);
    if (response.status === 403) {
      return { message: "user_exists" };
    }
    console.log(await response.json());
    shouldRedirect = true;
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    console.error(err);
    return;
  }
  if (shouldRedirect) {
    redirect("/home"); // 절대로 try..catch 문에서 redirect 사용하면 안된다.
  }
};
