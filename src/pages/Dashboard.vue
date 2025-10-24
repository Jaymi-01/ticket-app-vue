<template>
  <section class="relative bg-background min-h-screen flex flex-col items-center overflow-hidden px-4 py-8">
    <!-- Wave -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="fixed top-0 left-0 w-full h-auto z-0">
      <path fill="#2563EB" fill-opacity="0.5" d="M0,96L80,90.7C160,85,320,75,480,101.3C640,128,800,192,960,208C1120,224,1280,192,1360,176L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
    </svg>

    <div class="relative z-10 bg-white rounded-2xl shadow-xl max-w-[1440px] w-full mx-auto p-8 md:p-16 text-center mt-16">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-primary">Dashboard</h1>
        <button @click="handleLogout" class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      <h2 class="text-2xl font-semibold text-gray-700 mb-6 flex flex-col md:flex-row items-center justify-center gap-2">
        Welcome back,
        <span class="text-primary font-bold flex items-center gap-2">
          {{ user?.name || "User" }}
          <span class="inline-block animate-wave">👋</span>
        </span>
      </h2>

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-12">
        <div class="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-md">
          <h3 class="text-lg font-medium text-gray-600">Total Tickets</h3>
          <p class="text-3xl font-bold text-blue-600 mt-2">{{ stats.total }}</p>
        </div>

        <div class="bg-green-100 border border-green-200 rounded-xl p-6 shadow-md">
          <h3 class="text-lg font-medium text-gray-600">Open Tickets</h3>
          <p class="text-3xl font-bold text-green-700 mt-2">{{ stats.open }}</p>
        </div>

        <div class="bg-amber-100 border border-amber-200 rounded-xl p-6 shadow-md">
          <h3 class="text-lg font-medium text-gray-600">In Progress</h3>
          <p class="text-3xl font-bold text-amber-700 mt-2">{{ stats.inProgress }}</p>
        </div>

        <div class="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow-md">
          <h3 class="text-lg font-medium text-gray-600">Resolved Tickets</h3>
          <p class="text-3xl font-bold text-gray-800 mt-2">{{ stats.resolved }}</p>
        </div>
      </div>

      <router-link to="/tickets" class="bg-primary text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform">
        Go to Ticket Management
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCurrentUser, logoutUser, isAuthenticated } from "../utils/authentication.js";

const router = useRouter();
const user = ref(null);
const stats = ref({ total: 0, open: 0, inProgress: 0, resolved: 0 });

const updateStats = () => {
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  stats.value.total = tickets.length;
  stats.value.open = tickets.filter(t => t.status === "open").length;
  stats.value.inProgress = tickets.filter(t => t.status === "in-progress").length;
  stats.value.resolved = tickets.filter(t => t.status === "resolved").length;
};

onMounted(() => {
  if (!isAuthenticated()) router.push("/login");
  user.value = getCurrentUser();
  updateStats();

  window.addEventListener("storage", updateStats);
});
const handleLogout = () => {
  logoutUser();
  router.push("/login");
};
</script>

<style>
.animate-wave {
  display: inline-block;
  animation: wave 1.5s infinite;
  transform-origin: 70% 70%;
}
@keyframes wave {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(20deg); }
  30% { transform: rotate(-10deg); }
  45% { transform: rotate(20deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style>
