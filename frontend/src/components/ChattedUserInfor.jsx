import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useChatRealtimeStore } from "../store/useChatRealtimeStore";
const ChattedUserInfor = () => {
  const { selectedChat } = useChatStore();
  const { onlineUsers } = useChatRealtimeStore();
  const memOnline = selectedChat?.users.filter((user) =>
    onlineUsers.some((userId) => userId == user._id)
  );
  return (
    <>
      {selectedChat != null && (
        <div className="w-full h-[7vh] md:h-full flex px-4 bg-base-300">
          <div className="flex justify-center md:justify-between gap-2 items-center w-full">
            <div
              className={`avatar ${
                selectedChat.users.some((user) =>
                  onlineUsers.some((userId) => userId == user._id)
                ) && "avatar-online"
              } h-[80%] aspect-square max-w-13`}
            >
              <div className=" rounded-full">
                <img
                  className=""
                  src={
                    selectedChat.users.length == 1
                      ? selectedChat.users[0].profilePic
                      : "https://api.dicebear.com/9.x/thumbs/svg?seed=78"
                  }
                />
              </div>
            </div>
            <div className="block flex-1 w-full">
              <div className=" w-full flex items-start gap-2 text-sm md:text-base lg:text-lg justify-between">
                <div className="font-bold line-clamp-1 ">
                  {selectedChat.name.length == 0
                    ? selectedChat.users[0].fullName
                    : selectedChat.name}
                </div>
                {selectedChat.users.length > 1 && (
                  <div className="text-xs md:text-sm ">
                    {selectedChat.users.length + 1} members
                  </div>
                )}
              </div>
              {memOnline?.length != 0 && (
                <div className="text-xs opacity-60 flex justify-between">
                  <span className="text-base-100 bg-green-700 px-1 rounded-md">
                    Online
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChattedUserInfor;
