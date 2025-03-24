"use client";

import { useRouter } from "next/navigation";
import UserSelection from "../components/UserSelection";

export default function SelectUserPage() {
  const router = useRouter();

  const handleUserSelection = (gender: string, region: string) => {
    // Store user information and redirect to home
    localStorage.setItem("userGender", gender);
    localStorage.setItem("userRegion", region);
    router.push("/");
  };

  return <UserSelection onComplete={handleUserSelection} />;
}
