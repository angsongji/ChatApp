import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { IoIosReverseCamera } from "react-icons/io";

const titles = [
  {
    title: "Full name",
    field: "fullName",
  },
  {
    title: "Email address",
    field: "email",
  },
  {
    title: "Member since",
    field: "createdAt",
  },
];

const AvatarAndUpdate = ({ authUser, uploadProfile }) => {
  const avatarRef = useRef();
  const [base64_url, setBase64_url] = useState("");
  const [blob_url, setBlob_url] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleUploadAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (blob_url) URL.revokeObjectURL(blob_url);

    const url = URL.createObjectURL(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      setBase64_url(reader.result);
      setBlob_url(url);
    };
  };

  const handleCancel = () => {
    if (blob_url) URL.revokeObjectURL(blob_url);

    setBase64_url("");
    setBlob_url("");
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await uploadProfile({ profilePic: base64_url });
      handleCancel();
    } catch (error) {
      console.log("Sign in error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full  py-10 gap-5">
      <div className="flex justify-evenly md:justify-center">
        <div className="avatar w-30 h-30 lg:w-45 lg:h-auto square relative p-1 ">
          <img
            ref={avatarRef}
            src={blob_url == "" ? authUser.profilePic : blob_url}
            className="rounded-full shadow-md aspect-square"
          />
          <button className="btn btn-circle absolute right-0 bottom-2 z-1">
            <IoIosReverseCamera className="text-2xl md:text-3xl " />
            <input
              type="file"
              accept="image/*"
              className={`absolute top-0 left-0 w-full h-full z-2 text-transparent !cursor-pointer   rounded-full`}
              onChange={handleUploadAvatar}
            />
          </button>
        </div>
        <div className={`${blob_url ? "flex flex-col gap-2" : "hidden"} `}>
          <p>Save changes?</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleSave()}
              disabled={isLoading}
              className={`btn btn-info ${
                isLoading ? "cursor-no-drop" : "cursor-pointer"
              }`}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Save"
              )}
            </button>
            <button
              disabled={isLoading}
              className={`btn ${
                isLoading ? "cursor-no-drop" : "cursor-pointer"
              }`}
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="font-bold flex flex-col items-center justify-center">
        <span className="text-base md:text-xl">{authUser.fullName}</span>
      </div>
    </div>
  );
};

const PrivateProfilePage = () => {
  const { authUser, uploadProfile } = useAuthStore();
  return (
    <div className="w-full h-full flex flex-col items-center gap-10 ">
      <AvatarAndUpdate authUser={authUser} uploadProfile={uploadProfile} />

      <div className="min-w-fit md:w-1/3  flex flex-col gap-3 lg:gap-5 items-center">
        {titles.map((item, index) => (
          <label key={index} className="input w-full">
            <span className="label">{item.title}</span>
            <input
              type="text"
              disabled
              placeholder={
                item.field != "createdAt"
                  ? authUser[item.field]
                  : authUser.createdAt
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")
              }
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default PrivateProfilePage;
