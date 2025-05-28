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
                    <label for="Congviechangngay" class="form-label">Công việc hằng ngày:</label>
                    <input type="text" class="form-control" id="Congviechangngay" v-model="item.congviechangngay" placeholder="type here" required/>
                  </div>
                    </div>
                    <div class="d-flex justify-content-end text-center mt-4">
                        <button type="submit" class="btn btn-primary m-1">Update</button>
                        <router-link :to="{ name: 'Home' }" class="btn btn-outline-secondary m-1">
                            <i class="bi bi-arrow-left-circle"></i> Return
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const item = {
          Congviechangngay: '',
        };
        const route = useRoute();
        const router = useRouter();
        const successMessage = ref('');

        const getItem = async () => {
            try {
                const response = await axios.get(`http://localhost:7096/api/DailyWork/${route.params.id}`);
                Object.assign(item, response.data);
            }
            catch (error) {
                console.error("Failed to fetch item:", error);
            }
        };

        const updateItem = async () => {
            const uri = `http://localhost:7096/api/DailyWork/${route.params.id}`;
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
