import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GrFormNextLink } from "react-icons/gr";
import toast from "react-hot-toast";
import { signUp } from "../services/authService";

const validateForm = (formData) => {
  if (!formData.fullName.trim()) return toast.error("Full name is required");

  if (!formData.email.trim()) return toast.error("Email is required");

  if (!formData.password.trim()) return toast.error("Password is required");

  if (formData.password !== formData.confirmPassword)
    return toast.error("Passwords do not match!");
  return 0; //Not show any toast = not have error
};

const FormSignUp = ({ isLoading, setIsLoading, navigate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
    profilePicURL: "",
  });
  const avatarRef = useRef();
  const [showPass, setShowPass] = useState(false);
  const handleUploadAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => {
      // Nếu đã có blob URL cũ thì revoke nó
      if (prev.profilePicURL) {
        URL.revokeObjectURL(prev.profilePicURL);
      }
      return prev;
    });

    const url = URL.createObjectURL(file); // Tạo URL tạm thời để hiển thị ảnh
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () =>
      setFormData((prev) => ({
        ...prev,
        profilePic: reader.result,
        profilePicURL: url,
      }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData) != 0) return;

    setIsLoading(true);
    try {
      const standardData = {
        ...formData,
        profilePic:
          formData.profilePic == ""
            ? `https://ui-avatars.com/api/?name=${formData.fullName}`
            : formData.profilePic,
      };
      console.log("Data before send ", standardData);
      const response = await signUp(standardData);
      console.log("Response:", response);
      toast.success("Sign up successfully!");
      if (formData.profilePicURL) URL.revokeObjectURL(formData.profilePicURL);
      navigate("/stranger/sign-in");
    } catch (error) {
      console.log("Sign in error", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("rerender form");
  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full  flex flex-col justify-center gap-7 md:gap-10 items-center"
    >
      <label className="input ">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          name="fullName"
          type="text"
          placeholder="fullname"
          value={formData.fullName}
          onChange={handleChange}
          disabled={isLoading}
        />
      </label>
      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        <input
          name="email"
          type="email"
          placeholder="mail@site.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
      </label>

      <label className="input ">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          name="password"
          placeholder="password"
          type={showPass ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        <button
          type="button"
          className=" text-xl flex items-center cursor-pointer text-gray-400"
          onClick={() => setShowPass((prev) => !prev)}
        >
          {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </label>

      <label className="input ">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          name="confirmPassword"
          placeholder="confirm password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
      </label>

      <div className="avatar flex flex-col gap-1 items-center">
        <p className="text-xs lg:text-sm text-gray-500">
          Update profile avatar
        </p>
        <div className="w-24 rounded-full  relative">
          <img
            ref={avatarRef}
            src={
              formData.profilePic == ""
                ? `https://ui-avatars.com/api/?name=${formData.fullName}`
                : formData.profilePicURL
            }
          />
          <input
            type="file"
            accept="image/*"
            className={`absolute top-0 left-0  h-full ${
              !isLoading ? "cursor-pointer" : "cursor-no-drop"
            } text-transparent`}
            onChange={handleUploadAvatar}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-neutral btn-outline rounded-xl text-lg hover:bg-blue-900 hover:border-0"
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <GrFormNextLink />
          )}
        </button>
      </div>
    </form>
  );
};

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log("rerender all page ");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
      <div className="absolute flex gap-2 left-1/2 -translate-x-1/2 top-[5vw] md:top-[3vw] md:translate-x-0  md:left-[3vw]  items-center text-blue-900">
        <FaPlayCircle className=" text-2xl sm:text-3xl md:text-4xl " />
        <div className="text-3xl font-bold ">FunTogether</div>
      </div>
      <div className="w-fit absolute flex gap-2 bottom-5 right-5 items-center">
        <div className="flex w-[50vw] md:w-[35vw] flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="skeleton h-15 w-2/3"></div>
            <div className="skeleton h-5 w-28"></div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="skeleton h-5 w-3/5 "></div>
            <div className="skeleton h-5 w-2/5 "></div>
          </div>
        </div>
      </div>
      <div className="overflow-auto w-full max-w-[90vw] md:max-w-[45vw] xl:max-w-[30vw] h-4/5 bg-blue-100/80 rounded-lg shadow-lg px-5 md:px-10 relative">
        <div className="flex flex-col items-center mt-10 mb-15 text-blue-900">
          <div className="text-2xl font-bold">SIGN UP</div>
        </div>

        <FormSignUp
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          navigate={navigate}
        />

        <div className=" text-center text-sm mt-10 mb-5">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => navigate("/stranger/sign-in")}
              className={` text-blue-900  font-medium ${
                !isLoading ? "hover:underline cursor-pointer" : "cursor-no-drop"
              }`}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
