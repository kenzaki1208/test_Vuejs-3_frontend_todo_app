<template>
  <div class="container w-100">
    <div class="d-flex justify-content-between">
      <img src="/src/assets/book-with-pen_10993962.png" alt="logo-left" width="100px" height="100px"/>
      <h1 class="p-4 text-uppercase font-weight-bold currentColor">
        <i class="bi bi-book"></i>
        Công việc hằng ngày
        <i class="bi bi-feather"></i>
      </h1>
      <img src="/src/assets/download.png" alt="logo-right" width="100px" height="100px"/>
    </div>
    <div v-if="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>
    <div class="d-flex justify-content-around mb-4">
      <VueDatePicker v-model="date" class="w-25" />
      <button class="btn btn-warning text-white" @click="filter(formatDate(date))">
        <i class="bi bi-trash me-1"></i> filter
      </button>
      <!--<router-link :to = "{name: 'createAPI'}"></router-link>-->
      <button :key="itemTask.id" @click="openCreateConfirmation(itemTask.id)" class="btn btn-success">
        <i class="bi bi-plus-lg"></i> Create
      </button>
    </div>

    <div class="table-responsive d-flex gap-5 p-5">
      <div class="table" v-if="itemTask.length > 0">
        <div class="table-white text-white border border-primary">
          <div class="d-flex bg-primary justify-content-between">
            <!-- <th scope="col">ID</th> -->
            <div class="bg-primary text-white">Những việc cần làm </div>
            <div class="bg-primary"></div>
            <div class="bg-primary text-white"><i class="bi bi-bookmark"></i></div>
          </div>
        </div>
        <transition-group name="fade">
          <div v-for="item in itemTask" :key="item.id" class="d-flex justify-content-between bg-white border border-primary m-4 p-2">
            <!-- <td>{{ item.id }}</td> -->
            <div class="align-content-center"><input @change="ChangeStatus_1(item.id)" type="checkbox" aria-label="Checkbox for following text input"/></div>
            <div class="align-content-center">{{ item.congviechangngay }}</div>
            <div>
              <router-link :to="{name: 'editAPI', params: {id: item.id}}"
                class="btn btn-sm btn-outline-primary me-2 text-center">
                <i class="bi bi-pencil-square"></i>
              </router-link>
              <button class="btn btn-sm btn-outline-danger" @click="openDeleteConfirmation(item.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </transition-group>
        <div class="text-primary font-weight-bold">
          <p class="font-weight-bold">UnChecked: <b class="bg-transparent text-primary">{{ itemTask.length }}</b> / <b class="bg-transparent text-primary">{{ itemTask.length }}</b></p>
        </div>
      </div>

      <div class="d-flex justify-content-between gap-3" v-else>
          Hoàn thành nhiệm vụ:
          <button @click="returnDefault"  type="return" class="btn btn-outline-info text-center">
            Return
          </button>
      </div>

      <div class="table table-hover" v-if="itemTaskCompleted.length > 0">
        <div class="table-dark border border-dark">
          <div class="d-flex bg-dark justify-content-between">
            <div class="bg-dark">Những việc đã hoàn thành</div>
            <div class="bg-dark"></div>
            <div class="bg-dark"><i class="bi bi-bookmark-check-fill"></i></div>
          </div>
        </div>
        <transition-group name="fade">
          <div v-for="item in itemTaskCompleted" :key="item.id" class="d-flex justify-content-between bg-white border border-secondary m-4 p-2">
            <div class="align-content-center"><input :checked="item.trangThai === true"  @change="() => ChangeStatus_2 (item.id)" type="checkbox" class="hover-blue"/></div>
            <div class="align-content-center" :style="{ textDecoration: item.trangThai ? 'line-through' : 'none' }">{{ item.congviechangngay }}</div>
            <div>
              <button class="btn btn-sm btn-outline-danger" @click="openDeleteConfirmation(item.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </transition-group>
        <div class="font-weight-bold text-dark" :style="{textAlign: 'end'}">
          <p class="font-weight-bold">Checked: <b class="bg-transparent font-weight-bold text-dark">{{ itemTaskCompleted.length }}</b> / <b class="bg-transparent font-weight-bold text-dark">{{ itemTaskCompleted.length }}</b></p>
        </div>
        <!-- <div class="d-flex justify-content-end">
          <button @click="returnDefault"  type="return" class="btn btn-outline-info text-center">
            Return
          </button>
        </div> -->
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
  <div class="modal fade" id="CreateConfirmationModal" tabindex="-1" aria-labelledby="CreateConfirmationModalLabel"
    aria-hidden="true" ref="CreateModal" style="align-content: center;">
    <div class="modal-dialog">
      <div class="modal-content" @submit.prevent="addItem">
        <div class="modal-header">
          <h5 class="modal-title" id="CreateConfirmationModalLabel">Confirm</h5>
          <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex flex-row justify-items-center gap-3">
            <input type="text" class="form-control" id="Congviechangngay" v-model="itemTask.congviechangngay" placeholder="type here" required/>
            <VueDatePicker v-model="date"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="close">Cancel</button>
          <button type="button" class="btn btn-success" @click="confirmCreate">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import { onMounted, ref} from 'vue';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useRouter } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { nextTick } from 'vue';

export default {
  name: 'IndexAPI',
  components: {
    VueDatePicker
  },
  setup() {
    const router = useRouter();
    const items = ref([])
    const itemStatus = ref([]);
    const itemTask = ref([]);
    const itemTaskCompleted = ref([]);
    const updateItemSt = ref([]);
    const itemIdToDelete = ref(null);
    const itemIdToCreate= ref(null);
    const deleteModal = ref(null);
    const CreateModal = ref(null);
    const successMessage = ref('');
    const date = ref(new Date());

    const returnDefault = () => {
      itemTask.value = [];
      itemTaskCompleted.value = [];
      successMessage.value = '';
      fetchItems();
      date.value = new Date();
      router.push({ name: 'Home' });
      return items.value;
    };

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:7096/api/DailyWork');
        // items.value = response.data.map(item => reactive(item));
        // itemStatus.value = response.data.map(item => item.completed ? 'Completed' : 'Not Completed');
        itemTask.value = response.data.filter(item => item.trangThai === false);
        itemTaskCompleted.value = response.data.filter(item => item.trangThai === true);
        await nextTick();
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    async function ChangeStatus_1(id) {
      try {
        const item = itemTask.value.find(item => item.id === id);
        if (item) {
          item.trangThai = item.trangThai === true ? false : true;
          axios.put(`http://localhost:7096/api/DailyWork/${id}`, item).finally(() => {
            fetchItems();
          });
        }
      } catch (error) {
        console.error('Error updating item status:', error);
      }
    };

    async function ChangeStatus_2(id) {
      try {
        const item = itemTaskCompleted.value.find(item => item.id === id);
        if (item) {
          item.trangThai = item.trangThai === true ? false : true;
          await axios.put(`http://localhost:7096/api/DailyWork/${id}`, item);
          await fetchItems();
        }
      } catch (error) {
        console.error('Error updating item status:', error);
      }
    };


    const Itemstatus = (id) => {
      const item = items.value.find(item => item.id === id);
      return item ? (item.completed ? 'Completed' : 'Not Completed') : '';
    }

    const ItemLength = (id) => {
      const item = items.value.filter(item => item.id !== id);
      items.value.length = 0;
      items.value.push(...item);
      return item;
    }

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
        await axios.delete(`http://localhost:7096/api/DailyWork/${id}`);
        itemTask.value = itemTask.value.filter(item => item.id !== id);
        itemTaskCompleted.value = itemTaskCompleted.value.filter(item => item.id !== id);
        successMessage.value = 'Item deleted successfully!';
        setTimeout(() => {
          successMessage.value = '';
          router.push({ name: 'Home' });
        }, 2000);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    const openCreateConfirmation = (id) => {
      itemIdToCreate.value = id;
      const modalInstance = new window.bootstrap.Modal(CreateModal.value);
      modalInstance.show();
    };

    const close = () => {
      const modalInstance = window.bootstrap.Modal.getInstance(CreateModal.value);
      if (modalInstance) {
        modalInstance.hide();
      }
    };

    const confirmCreate = async () => {
      if (itemIdToCreate.value !== null) {
        await addItem(itemIdToCreate.value);
        close();
      }
      console.log(itemIdToCreate)
    };


    const addItem = async () => {
      try {
        const CreateTask = {
          congviechangngay: itemTask.value.congviechangngay || '',
          dateandTime: formatDate(date.value),
          trangThai: false
        };
        console.log('Data being sent:', CreateTask);
        await axios.post(`http://localhost:7096/api/DailyWork`, CreateTask);
        successMessage.value = 'Item created successfully!';
        setTimeout(() => {
          successMessage.value = '';
          router.push({ name: 'Home' });
        }, 1000);
        console.log('Item created successfully:', CreateTask);
        await fetchItems();
      } catch (error) {
        console.error(error);
        successMessage.value = 'Failed to create item.';
      }
    };

    const filter = (date) => {
      axios.get(`http://localhost:7096/api/DailyWork/time/${date}`)
        .then(response => {
          itemTask.value = response.data.filter(item => item.trangThai === false);
          itemTaskCompleted.value = response.data.filter(item => item.trangThai == true);
          if (itemTask.value.length === 0 && itemTaskCompleted.value.length === 0) {
            successMessage.value = 'No items found for the selected date.';
          } else {
            successMessage.value = '';
          }
        })
        .catch(error => {
          console.error('Error fetching items by date:', error);
        });
    };

    const colors = [
      'text-primary',
      'text-secondary',
      'text-success',
      'text-danger',
      'text-warning',
      'text-info',
      'text-light',
      'text-dark',
    ];

    const currentColor= ref('text-primary');
    const changeColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      currentColor.value = colors[randomIndex];
      document.querySelector('h1').className = `p-4 text-center text-uppercase font-weight-bold ${currentColor.value}`;
      document.querySelector('h1').style.transition = 'color 0.5s ease';
    };

    onMounted(() => {
      setInterval(() => {
        changeColor();
      }, 1000)
      fetchItems();
    });
    // onMounted(fetchItems);

    return {
      items,
      itemStatus,
      itemIdToDelete,
      itemTask,
      itemTaskCompleted,
      updateItemSt,
      date,
      ChangeStatus_1,
      ChangeStatus_2,
      ItemLength,
      deleteModal,
      successMessage,
      fetchItems,
      openDeleteConfirmation,
      closeModal,
      Itemstatus,
      confirmDelete,
      formatDate,
      filter,
      returnDefault,
      currentColor,
      openCreateConfirmation,
      confirmCreate,
      close,
      CreateModal,
      addItem,
    };
  },
};
</script>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
.fade-leave-active {
  position: absolute;
}
</style>
