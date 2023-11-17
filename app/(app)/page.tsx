import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import IconFavorite from "@/app/assets/icons/Favorite";
import IconFavoriteBorder from "@/app/assets/icons/FavoriteBorder";
import IconComment from "@/app/assets/icons/Comment";

export default async function Home() {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles ( username, name, avatar_url )")
    .order("created_at", { ascending: false });

  return (
    <>
      {/* <form className="w-full">
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-secondary">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-secondary focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span className="sr-only">Set location</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form> */}
      {/* 
      / Feed
      /
      */}
      <div className="flex flex-col justify-start items-start w-full gap-1 -mt-4">
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
    </>
  );
}
