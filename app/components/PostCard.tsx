import Image from "next/image";
import { HeartOutline } from "@/app/assets/icons/HeartOutline";
import { HeartBold } from "@/app/assets/icons/HeartBold";
import { ChatRoundOutline } from "@/app/assets/icons/ChatRoundOutline";

export default function PostCard({
  post,
  index,
}: {
  post: any;
  index: number;
}) {
  return (
    <div
      className={`w-full p-6 pb-4 bg-secondary flex flex-col justify-start items-start gap-4 ${
        index === 0 ? "rounded-t-2xl" : ""
      }`}
    >
      <div className="flex justify-start items-start gap-6">
        <Image
          className="w-16 h-16 rounded-2xl"
          width={64}
          height={64}
          src={post.profiles.avatar_url}
          alt={`${post.profiles.name} avatar`}
        />

        <div className="flex flex-col justify-start items-start gap-2">
          <div className="flex justify-start items-baseline gap-2">
            <span>@{post.profiles.name}</span>
            <span className="text-write text-sm opacity-60">
              {post.profiles.username}
            </span>
          </div>
          <p className="text-base font-medium">{post.post}</p>
          <div className="flex justify-start items-center gap-5">
            <button className="btn btn-circle text-write bg-secondary border-transparent hover:border-transparent hover:text-primary hover:bg-primary hover:bg-opacity-5 text-xl">
              <HeartOutline />
            </button>
            <span className="text-write text-sm">128</span>
            <div className="flex justify-start items-center gap-5">
              <button className="btn btn-circle text-write bg-secondary border-transparent hover:border-transparent hover:text-white hover:bg-white hover:bg-opacity-5 text-xl">
                <ChatRoundOutline />
              </button>
              <span className="text-write text-sm">57</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
