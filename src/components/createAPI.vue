<template>
  <div class="container mt-5">
    <div class="card shadow-lg">
      <div class="card-header bg-gradient-primary text-white">
        <h1 class="card-title">
          Create Items
        </h1>
      </div>
      <div class="card-body">
        <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
        </div>
        <form @submit.prevent="addItem">
          <div class="row g-3 p-3">
            <label for="Congviechangngay" class="form-label">Công việc hằng ngày:</label>
            <div class="d-flex flex-row justify-items-center">
              <input type="text" class="form-control" id="Congviechangngay" v-model="itemTask.congviechangngay" placeholder="type here" required/>
              <VueDatePicker v-model="date"/>
            </div>
            <div class="mt-4 d-flex justify-content-end text-center">
              <button type="submit" class="btn btn-primary px-4 m-1">
                <i class="bi bi-plus-lg"></i>Add
              </button>
              <router-link :to="{name: 'Home'}" class="btn btn-outline-secondary m-1">
                <i class="bi bi-arrow-left-circle"></i> Return
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'CreateAPI',
  components: {
    VueDatePicker
  },
  setup() {
    const date = ref(new Date());

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const itemTask = {
      congviechangngay: '',
      dateandTime: formatDate(date.value),
      trangThai: false
    };

    const router = useRouter();

    const successMessage = ref('');

    const addItem = async () => {
      try {
        console.log('Data being sent:', itemTask);
        await axios.post('http://localhost:7096/api/DailyWork', itemTask);
        console.log('Item created successfully:', itemTask);
        successMessage.value = 'Item created successfully!';
        setTimeout(() => {
          successMessage.value = '';
          router.push({ name: 'Home' });
        }, 1000);
      } catch (error) {
        console.error(error);
        successMessage.value = 'Failed to create item.';
      }
    };

    return {
      itemTask,
      successMessage,
      addItem,
      date,
      formatDate
    };
  }
}
</script>

<style>
.bg-gradient-primary {
    background: linear-gradient(45deg, #007bff, #6610f2);
}
</style>
