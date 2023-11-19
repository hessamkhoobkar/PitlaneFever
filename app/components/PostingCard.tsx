import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { Paperclip } from "../assets/icons/Paperclip";

export default async function PostingCard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
    // TODO: I should redirect to login page
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_connect", user.id);

  if (!profile) {
    return null;
    // TODO: I should write error for failed user fetch
  }

  const currentUser = profile && profile[0];

  return (
    <div className="w-full rounded-2xl bg-secondary flex justify-start items-start gap-8 p-6 pb-2">
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
        />
        <div className="w-full flex justify-between items-center">
          <button className="btn btn-circle btn-ghost text-lg -ms-6">
            <Paperclip />
          </button>
          <button className="btn text-primary bg-secondary border-secondary">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
