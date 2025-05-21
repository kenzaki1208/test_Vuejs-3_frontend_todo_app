<template>
    <div class="container mt-5">
        <div class="card shadow-lg">
            <div class="card-header bg-gradient-primary text-white">
                <h1 class="card-title text-center">Edit</h1>
            </div>
            <div class="card-body">
                <div v-if="successMessage" class="alert alert-success">
                    {{ successMessage }}
                </div>
                <form @submit.prevent="updateItem">
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
                    </div>
                    <div class="text-center mt-4">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
                <div class="mt-4 d-flex justify-content-start">
                    <router-link :to="{ name: 'Home' }" class="btn btn-outline-secondary">
                        <i class="bi bi-arrow-left-circle"></i> Return
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const item = reactive({
          first_Name: '',
          last_Name: '',
          email: '',
          address_: ''
        });
        const route = useRoute();
        const router = useRouter();
        const successMessage = ref('');

        const getItem = async () => {
            try {
                const response = await axios.get(`http://localhost:7096/api/Test/${route.params.id}`);
                Object.assign(item, response.data);
            }
            catch (error) {
                console.error("Failed to fetch item:", error);
            }
        };

        const updateItem = async () => {
            const uri = `http://localhost:7096/api/Test/${route.params.id}`;
            console.log(uri)
            await axios.put(uri, item);
            successMessage.value = 'Item Updated Successfully!';
            setTimeout(() => {
                successMessage.value = '';
                router.push({ name: 'Home' });
            }, 1000);
        };

        onMounted(getItem);

        return {
            item,
            updateItem,
            successMessage
        };
    }
}
</script>
