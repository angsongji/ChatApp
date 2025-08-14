import { create } from "zustand";
import { check, logIn, logOut } from "../services/authService";
import toast from "react-hot-toast";
import { uploadProfile } from "../services/userService";
import { useChatRealtimeStore } from "./useChatRealtimeStore";
export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true, // This variable is used to show a skeleton when the user reloads the page.

  checkAuth: async () => {
    try {
      const result = await check();
      set({ authUser: result.data });
      useChatRealtimeStore.getState().connectSocket();
    } catch (error) {
      console.log("Check auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logIn: async (FormData) => {
    try {
      const result = await logIn(FormData);
      toast.success("Log in successfully!");
      set({ authUser: result.data });
    } catch (error) {
      console.log("Error log in ", error);
      toast.error(error.response.data.message);
    }
  },

  logOut: async () => {
    try {
      await logOut();
      toast.success("Log out successfully!");
      set({ authUser: null });
      useChatRealtimeStore.getState().disconnectSocket();
    } catch (error) {
      console.log("Error log out ", error);
      toast.error(error.response.data.message);
    }
  },

  uploadProfile: async (object) => {
    try {
      const result = await uploadProfile(object);
      set({ authUser: result.data });
      toast.success("Upload profile successfully!");
    } catch (error) {
      console.log("Error upload profile ", error);
      toast.error(error.response.data.message);
    }
  },
}));
