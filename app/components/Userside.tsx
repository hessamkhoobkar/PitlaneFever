import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Userside() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_connect", user.id);

  return (
    <div className="w-full flex flex-col justify-start items-start bg-secondary rounded-2xl p-2 relative">
      <img className="w-full rounded-xl" src={profile[0].cover_url} alt="" />
      <img
        className="w-32 h-32 rounded-full  border-4 border-secondary absolute top-20"
        src={profile[0].avatar_url}
        alt=""
      />
      <div className="flex flex-col justify-start items-end w-full mt-2 p-2">
        <span>{profile[0].username}</span>
        <span className="text-xs opacity-40">{profile[0].name}</span>
      </div>
      <span className="text-sm p-2 mt-4">{profile[0].description}</span>
    </div>
  );
}
