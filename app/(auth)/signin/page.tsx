"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "camillafiskvik@rhyta.com",
      password: "123456",
    });

    if (error) {
      console.error("Sign-in error:", error.message);
      // TODO:
      // handle error in UI
    } else {
      console.log("Sign-in successful", data);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full min-h-screen">
      <h1>Sign in Page</h1>
      <button
        className="btn btn-primary btn-wide"
        type="button"
        onClick={handleSignin}
      >
        Sign in
      </button>
    </div>
  );
}
