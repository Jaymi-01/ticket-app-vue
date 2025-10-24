<template>
  <section
    class="relative bg-background min-h-screen flex flex-col justify-center items-center overflow-hidden p-4"
  >
    <div
      class="relative z-10 bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto p-8 text-center"
    >
      <h1 class="text-3xl font-bold text-primary mb-4">Sign Up</h1>

      <form
        @submit.prevent="handleSignup"
        class="flex flex-col gap-4 text-left"
      >
        <input
          v-model="name"
          type="text"
          placeholder="Full Name"
          class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
        />

        <button
          type="submit"
          class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p class="mt-4 text-gray-600 text-sm">
        Already have an account?
        <router-link to="/login" class="text-primary hover:underline"
          >Login</router-link
        >
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { signupUser, isAuthenticated } from "../utils/authentication.js";

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

// Redirect if already logged in
if (isAuthenticated()) {
  router.push("/dashboard");
}

const handleSignup = () => {
  try {
    signupUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    toast.success("Signup successful! Please login.");
    router.push("/login");
  } catch (err) {
    toast.error(err.message);
  }
};
</script>
