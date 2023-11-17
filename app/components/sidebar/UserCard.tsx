import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function UserCard() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="w-full flex flex-col justify-start items-start bg-neutral rounded-2xl p-2 relative">
        <div className="w-full flex flex-col justify-center items-center">
          <span>Profile not found</span>
        </div>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_connect", user.id);

  const currentUser = profile && profile[0];

  return (
    <div className="w-full flex flex-col justify-start items-start bg-neutral rounded-2xl p-2 relative">
      {currentUser ? (
        <>
          <div className="w-full h-32 relative">
            <Image
              fill
              className="w-full rounded-xl"
              src={currentUser.cover_url}
              alt={`${currentUser.name} cover image`}
            />
          </div>

          <Image
            className="w-28 h-28 rounded-2xl ms-4 border-4 border-neutral absolute top-24"
            width={128}
            height={128}
            src={currentUser.avatar_url}
            alt={currentUser.name}
          />
          <div className="flex flex-col justify-start items-start gap-1 py-3 ms-36">
            <span>{currentUser.name}</span>
            <span className="text-write text-xs opacity-60">
              @{currentUser.username}
            </span>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <span>Profile not found</span>
        </div>
      )}
    </div>
  );
}
