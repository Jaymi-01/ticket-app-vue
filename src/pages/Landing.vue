<template>
  <section
    class="relative bg-background min-h-screen flex flex-col justify-center items-center text-center overflow-hidden p-4"
  >
    <!-- Wave SVG -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      class="fixed top-0 left-0 w-full h-auto z-0"
    >
      <path
        fill="#2563EB"
        fill-opacity="0.5"
        d="M0,96L80,90.7C160,85,320,75,480,101.3C640,128,800,192,960,208C1120,224,1280,192,1360,176L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>

    <!-- Decorative circles (CSS animation) -->
    <div class="absolute inset-0 z-0 overflow-hidden">
      <div
        class="absolute w-56 h-56 bg-blue-400/40 rounded-full blur-2xl top-20 left-10 animate-bounce-slow"
      ></div>
      <div
        class="absolute w-72 h-72 bg-indigo-500/40 rounded-full blur-2xl bottom-10 right-20 animate-bounce-slow"
      ></div>
      <div
        class="absolute w-32 h-32 bg-sky-400/40 rounded-full blur-xl top-1/2 left-1/3 animate-bounce-slow"
      ></div>
    </div>

    <div class="relative z-10 mt-20 max-w-2xl">
      <h1
        class="text-4xl font-bold md:text-5xl md:font-extrabold font-header text-gray-900"
      >
        Welcome to <span class="text-primary">Afuni’s Tickets App</span>
      </h1>
      <p class="mt-3 text-lg md:text-2xl font-body text-gray-700">
        Manage your support tickets easily: create, track, and resolve requests
        with clarity and speed.
      </p>

      <div class="mt-6 flex justify-center gap-4">
        <router-link
          to="/login"
          class="bg-primary text-white px-6 py-3 rounded-lg shadow border border-white hover:scale-105 transition-transform"
          >Login</router-link
        >
        <router-link
          to="/signup"
          class="bg-white text-primary px-6 py-3 rounded-lg shadow border border-primary hover:bg-primary hover:text-white hover:scale-105 transition-transform"
          >Get Started</router-link
        >
      </div>

      <p class="mt-6 text-sm text-gray-500">
        Empowering teams to stay connected and organized
      </p>
    </div>
  </section>
</template>

<script setup></script>

<style>
.animate-bounce-slow {
  animation: bounce-slow 8s infinite ease-in-out;
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
}
</style>
