<template>
  <section class="relative bg-background min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-10">
    <div class="relative z-10 bg-white rounded-2xl shadow-xl max-w-[1440px] w-full mx-auto p-8 md:p-16 text-center">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-primary">Ticket Management</h1>
        <router-link to="/dashboard" class="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition">Back to Dashboard</router-link>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-8">
        <input v-model="form.title" type="text" placeholder="Ticket Title" class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
        <input v-model="form.description" type="text" placeholder="Description" class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
        <select v-model="form.status" class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <button type="submit" class="col-span-1 md:col-span-3 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition">
          {{ editingIndex !== null ? "Update Ticket" : "Create Ticket" }}
        </button>
      </form>

      <!-- Tickets -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p v-if="tickets.length === 0" class="text-gray-500 col-span-full">
          No tickets found. Create your first ticket above!
        </p>

        <div v-for="(ticket, index) in tickets" :key="ticket.id" class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md text-left">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ ticket.title }}</h3>
          <p class="text-gray-600 mb-4">{{ ticket.description }}</p>
          <span :class="statusClass(ticket.status)" class="inline-block px-3 py-1 rounded-full text-sm font-medium">{{ ticket.status }}</span>

          <div class="flex justify-end gap-3 mt-4">
            <button @click="handleEdit(index)" class="text-blue-500 hover:underline">Edit</button>
            <button @click="handleDelete(index)" class="text-red-500 hover:underline">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { isAuthenticated } from "../utils/authentication.js";

const router = useRouter();
const tickets = ref([]);
const editingIndex = ref(null);

const form = reactive({
  title: "",
  description: "",
  status: "open",
});

// Redirect if not authenticated
onMounted(() => {
  if (!isAuthenticated()) router.push("/login");
  tickets.value = JSON.parse(localStorage.getItem("tickets")) || [];

  window.addEventListener("storage", () => {
    tickets.value = JSON.parse(localStorage.getItem("tickets")) || [];
  });
});

const saveTickets = (updated) => {
  localStorage.setItem("tickets", JSON.stringify(updated));
  tickets.value = updated;
};

const handleSubmit = () => {
  if (!form.title.trim() || !form.description.trim()) {
    toast.error("Please fill in all fields!");
    return;
  }

  let updated;
  if (editingIndex.value !== null) {
    updated = tickets.value.map((t, i) => i === editingIndex.value ? { ...t, ...form } : t);
    toast.success("Ticket updated!");
    editingIndex.value = null;
  } else {
    updated = [...tickets.value, { ...form, id: Date.now() }];
    toast.success("Ticket created!");
  }

  saveTickets(updated);
  form.title = "";
  form.description = "";
  form.status = "open";
};

const handleDelete = (index) => {
  if (confirm("Are you sure you want to delete this ticket?")) {
    const updated = tickets.value.filter((_, i) => i !== index);
    saveTickets(updated);
    toast.success("Ticket deleted!");
  }
};

const handleEdit = (index) => {
  editingIndex.value = index;
  const t = tickets.value[index];
  form.title = t.title;
  form.description = t.description;
  form.status = t.status;
};

const statusClass = (status) => {
  if (status === "open") return "bg-green-100 text-green-800";
  if (status === "in-progress") return "bg-amber-100 text-amber-800";
  return "bg-blue-100 text-blue-800";
};
</script>
