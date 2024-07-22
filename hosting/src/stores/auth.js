import { defineStore } from "pinia";
import { auth } from "@/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const error = ref(null);

  async function register({ email, password, name }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;

      await updateProfile(user.value, { displayName: name });

      return user.value;
    } catch (err) {
      error.value = err;
      throw err;
    }
  }

  async function login({ email, password }) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      return user.value;
    } catch (err) {
      error.value = err;
      throw err;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      user.value = null;
    } catch (err) {
      error.value = err;
      throw err;
    }
  }

  return {
    user,
    error,
    register,
    login,
    logout,
  };
});
