import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import IconFavorite from "@/app/assets/icons/Favorite";
import IconFavoriteBorder from "@/app/assets/icons/FavoriteBorder";
import IconComment from "@/app/assets/icons/Comment";
import PostCard from "../components/PostCard";

export default async function Home() {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles ( username, name, avatar_url )")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col justify-start items-start w-full gap-4 -mt-4">
      <PostCard />
      <div className="flex flex-col justify-start items-start w-full gap-1">
        {posts?.map((post, index) => (
          <div
            key={post.id}
            className={`w-full p-6 bg-secondary flex flex-col justify-start items-start gap-4 ${
              index === 0 ? "rounded-t-2xl" : ""
            }`}
          >
            <div className="flex justify-start items-start gap-6">
              <img
                className="w-16 h-16 rounded-2xl"
                src={post.profiles.avatar_url}
                alt={`${post.profiles.name} avatar`}
              />
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="flex justify-start items-end gap-2">
                  <span className="font-bold">@{post.profiles.username}</span>
                  <span className="text-sm opacity-40">
                    {post.profiles.name}
                  </span>
                </div>
                <p className="text-base font-medium">{post.post}</p>
              </div>
            </div>
            <div className="flex justify-start items-center gap-4 w-full ps-16">
              <button className="flex justify-start items-center gap-4 py-2 ps-4 pe-6 btn btn-ghost">
                <IconFavoriteBorder className="w-6 h-6" />
                <span>
                  <span>Like</span>
                  <span className="px-2"> ᛫ </span>
                  <span>8</span>
                </span>
              </button>
              <button className="flex justify-start items-center gap-4 py-2 px-4 btn btn-ghost">
                <IconComment className="w-6 h-6" />
                <span>
                  <span>Comments</span>
                  <span className="px-2"> ᛫ </span>
                  <span>4</span>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// update posting cards || maybe a new name too
// update post cards
// make siderbar sticky
// post new posts
// add the edit and delete option for user's card

// Add likeing option
// Add commenting option

// Add users view (users profile)
// Add user profile view

// Add standing pages
