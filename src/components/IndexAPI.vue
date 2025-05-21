<template>
  <div class="container mt-5">
    <h1 class="mb-4">Items</h1>
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
    <div class="d-flex justify-content-end mb-4">
      <router-link :to = "{name: 'createAPI'}" class="btn btn-success">
        <i class="bi bi-plus-lg"></i> Create
      </router-link>
    </div>

    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.first_Name }}</td>
            <td>{{ item.last_Name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.address_ }}</td>
            <td>
              <router-link :to="{name: 'editAPI', params: {id: item.id}}"
                class="btn btn-sm btn-outline-primary me-2">
                <i class="bi bi-pencil-square me-1"></i> Edit
              </router-link>
              <button class="btn btn-sm btn-outline-danger" @click="openDeleteConfirmation(item.id)">
                <i class="bi bi-trash me-1"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel"
    aria-hidden="true" ref="deleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this item?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel"
    aria-hidden="true" ref="deleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirm Delete</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Are you sure you want to delete this item?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { onMounted, ref } from 'vue';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useRouter } from 'vue-router';

export default {
  name: 'IndexAPI',
  setup() {
    const router = useRouter();
    const items = ref([])
    const itemIdToDelete = ref(null);
    const deleteModal = ref(null);
    const successMessage = ref('');

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:7096/api/Test/');
        items.value = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const openDeleteConfirmation = (id) => {
      itemIdToDelete.value = id;
      const modalInstance = new window.bootstrap.Modal(deleteModal.value);
      modalInstance.show();
    };

    const closeModal = () => {
      const modalInstance = window.bootstrap.Modal.getInstance(deleteModal.value);
      if (modalInstance) {
        modalInstance.hide();
      }
    };

    const confirmDelete = async () => {
      if (itemIdToDelete.value !== null) {
        await deleteItem(itemIdToDelete.value);
        closeModal();
      }
      console.log(itemIdToDelete)
    };

    const deleteItem = async (id) => {
      try {
        await axios.delete(`http://localhost:7096/api/Test/${id}`);
        items.value = items.value.filter(item => item.id !== id);
        successMessage.value = 'Item deleted successfully!';
        setTimeout(() => {
          successMessage.value = '';
          router.push({ name: 'Home' });
        }, 2000);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    onMounted(fetchItems);

    return {
      items,
      itemIdToDelete,
      deleteModal,
      successMessage,
      fetchItems,
      openDeleteConfirmation,
      closeModal,
      confirmDelete
    };
  }
};
</script>

<style>

</style>
