"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Paperclip } from "../assets/icons/Paperclip";
import { UploadSquareLineDuotone } from "../assets/icons/UploadSquareLineDuotone";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function PostingCard() {
  // Set skeloton for card
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);
  const [newPost, setNewPost] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const supabase = createClientComponentClient<Database>();

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  async function getProfile() {
    const user = await getUser();

    if (user) {
      const response = await supabase
        .from("profiles")
        .select("*")
        .eq("user_connect", user.id);

      if (response.data) {
        setCurrentUser(response.data[0]);
      }
    }
  }

  async function handleInsertReq() {
    if (!currentUser || newPost === "") {
      // TODO: Add error message
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          author_id: currentUser?.id || "",
          post: newPost,
        },
      ])
      .select();

    console.log(data && { data });
    console.log(error && { error });

    setNewPost("");
    setSubmitting(false);
    data && router.refresh();
  }

  useEffect(() => {
    getProfile();

    return () => {
      getProfile();
    };
  });

  return (
    <div className="w-full rounded-2xl bg-secondary flex justify-start items-start gap-8 p-6 pb-2">
      {currentUser ? (
        <>
          <div>
            <Image
              className="w-16 h-16 rounded-2xl"
              width={64}
              height={64}
              src={currentUser.avatar_url}
              alt={currentUser.name}
            />
          </div>
          <div className="flex flex-col justify-start items-start grow gap-1">
            <div className="flex justify-start items-center gap-2">
              <span>{currentUser.name}</span>
              <span className="text-write text-xs opacity-60">
                @{currentUser.username}
              </span>
            </div>
            <textarea
              className="bg-secondary w-full rounded-2xl p-2 hover:bg-neutral focus:bg-neutral focus:ring-0 focus:outline-none"
              name="post"
              id="post"
              rows={4}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="w-full flex justify-between items-center">
              <button className="btn btn-circle text-write bg-secondary border-transparent hover:border-transparent hover:text-primary hover:bg-primary hover:bg-opacity-5 text-lg cursor-not-allowed">
                <Paperclip />
              </button>
              <button
                className="btn text-primary bg-secondary border-transparent hover:bg-primary hover:bg-opacity-5 hover:border-transparent capitalize min-w-[12rem]"
                onClick={handleInsertReq}
              >
                {submitting ? (
                  <>
                    <UploadSquareLineDuotone className="text-2xl animate-ping" />
                    <span>Sharing ...</span>
                  </>
                ) : (
                  <>
                    <UploadSquareLineDuotone className="text-2xl" />
                    <span>Share your thought</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-16 h-16 rounded-2xl bg-neutral"></div>
          <div className="flex flex-col justify-start items-start grow gap-2 pb-4">
            <div className="bg-neutral w-full h-8 rounded"></div>
            <div className="bg-neutral w-full h-32 rounded-lg"></div>
          </div>
        </>
      )}
    </div>
  );
}
