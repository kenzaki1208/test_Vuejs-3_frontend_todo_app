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
      </div>
      <form @submit.prevent="addItem">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="FirstName" class="form-label">FirstName:</label>
            <input type="text" class="form-control" id="FirstName" v-model="item.first_Name" placeholder="type here" required/>
          </div>
          <div class="col-md-6">
            <label for="LastName" class="form-label">LastName:</label>
            <input type="text" class="form-control" id="LastName" v-model="item.last_Name" placeholder="type here" required/>
          </div>
          <div class="col-md-6">
            <label for="Email" class="form-label">Email:</label>
            <input type="text" class="form-control" id="Email" v-model="item.email" placeholder="type here" required/>
          </div>
          <div class="col-md-6">
            <label for="Address" class="form-label">Address:</label>
            <input type="text" class="form-control" id="Address" v-model="item.address_" placeholder="type here" required/>
          </div>
          <div class="mt-4 text-center">
            <button type="submit" class="btn btn-primary px-4">
              <i class="bi bi-plus-lg"></i>Add
            </button>
          </div>
        </div>
      </form>
      <div class="mt-4 d-flex justify-content-start">
        <router-link :to="{name: 'Home'}" class="btn btn-outline-secondary">
          <i class="bi bi-arrow-left-circle"></i> Return
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CreateAPI',
  setup() {
    const item = reactive({
      first_Name: '',
      last_Name: '',
      email: '',
      address_: ''
    });

    const router = useRouter();

    const successMessage = ref('');

    const addItem = async () => {
      try {
        await axios.post('http://localhost:7096/api/Test', item);
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
      item,
      successMessage,
      addItem
    };
  }
}
</script>

<style>
.bg-gradient-primary {
    background: linear-gradient(45deg, #007bff, #6610f2);
}
</style>
