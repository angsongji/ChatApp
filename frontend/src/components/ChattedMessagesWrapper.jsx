import { useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
const ChattedMessagesWrapper = ({
  messagesByChatId,
  authUser,
  selectedChat,
}) => {
  const imageModalRef = useRef();
  const [imageSelected, setImageSelected] = useState({
    image: "",
    currentDate: "",
    time: "",
  });
  if (!messagesByChatId) return null;

  return (
    <div className="relative flex flex-col gap-2 h-0">
      {imageSelected.image != "" && (
        <dialog
          ref={imageModalRef}
          className=" bg-base-100 w-fit h-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-md shadow-md "
          onClick={(e) => {
            const dialog = imageModalRef.current;
            if (e.target === dialog) {
              dialog.close();
            }
          }}
        >
          <div className=" w-[90vw] h-[60vh] md:w-[60vw] md:h-[90vh] p-3 relative flex justify-start cursor-auto ">
            <img
              src={imageSelected.image}
              className=" object-scale-down w-auto h-auto rounded-sm "
            />
            <div className=" text-right absolute bottom-2 right-1 italic px-3  bg-base-100">
              {imageSelected.currentDate} {imageSelected.time}
            </div>
          </div>
        </dialog>
      )}
      {messagesByChatId.map((msg, index) => (
        <ChatBubble
          key={index}
          msg={msg}
          index={index}
          imageModalRef={imageModalRef}
          authUser={authUser}
          selectedChat={selectedChat}
          setImageSelected={setImageSelected}
          messagesByChatId={messagesByChatId}
        />
      ))}
    </div>
  );
};

export default ChattedMessagesWrapper;
