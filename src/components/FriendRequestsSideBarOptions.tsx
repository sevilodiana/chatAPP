"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface FriendRequestsSideBarOptionProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

const FriendRequestsSideBarOption: FC<FriendRequestsSideBarOptionProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState(
    initialUnseenRequestCount
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:friends`)
    );

    const friendRequestHandler = () => {
     setUnseenRequestCount((prev) => prev + 1)
    }; 

    const addedFriendHandler = () => {
      console.log("booooooooooo213123oo")
      setUnseenRequestCount((prev) => prev - 1)
     }; 

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:friends`)
      );

      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
      pusherClient.unbind("new_friend", addedFriendHandler);  
    };
  }, [sessionId])
  

  return (
    <Link
      href="/dashboard/requests"
      className="sidebar_option_hover group items-center"
    >
      <div className="sidebar_option_hover_group">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests</p>

      {unseenRequestCount > 0 ? (
        <div className="relative notification">
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestsSideBarOption;
