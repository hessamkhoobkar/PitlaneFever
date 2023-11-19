import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import PostingCard from "@/app/components/PostingCard";
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
      <PostingCard />
      <div className="flex flex-col justify-start items-start w-full gap-1">
        {posts?.map((post, index) => (
          <PostCard post={post} index={index} key={post.id} />
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
