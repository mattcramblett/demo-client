<template>
  <div class="test">
    <div class="header">
      <h1>Test CRUD</h1>
      <div class="header-buttons">
        <button @click="onClickNew">New</button>
        <button @click="onClickRefresh">Refresh</button>
      </div>
    </div>

    <div class="content">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Time</th>
          </tr>
        </thead>
        <tr v-for="object in objects" :key="object.id">
          <td>{{ object.name }}</td>
          <td>{{ object.active }}</td>
          <td>{{ formatTime(object.time) }}</td>
          <td>
            <a href="#" @click="onEdit(object)" class="edit">Edit</a>
          </td>
          <td>
            <a href="#" @click="onDelete(object.id)" class="delete">Delete</a>
          </td>
        </tr>
      </table>

      <new-test-object
        v-if="showDataForm"
        :obj="editingObject"
        @cancel="onCloseForm"
        @save="onSaveObject"
      ></new-test-object>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/ApiService";
import FormatUtil from "@/utils/FormatUtil";
import NewTestObject from "@/components/Test/TestObjectForm";

export default {
  name: "Test",
  components: { NewTestObject },
  data: () => {
    return {
      objects: [],
      showDataForm: false,
      editingObject: null,
    };
  },
  methods: {
    formatTime(datetime) {
      if (!datetime) {
        return "None";
      }
      return FormatUtil.formatDateTime(datetime);
    },
    onClickRefresh() {
      this.$store.dispatch("app/REFRESH");
    },
    onClickNew() {
      this.editingObject = null;
      this.showDataForm = true;
    },
    onCloseForm() {
      this.showDataForm = false;
    },
    onEdit(obj) {
      this.editingObject = obj;
      this.showDataForm = true;
    },
    async onSaveObject(obj) {
      if (obj.id) {
        await this.updateObject(obj);
      } else {
        await this.createObj(obj);
      }
      this.onCloseForm();
    },
    async createObj(obj) {
      const { data } = await ApiService.createTestObject(obj);
      this.objects.push(data);
    },
    async updateObject(obj) {
      const { data } = await ApiService.updateTestObject(obj);
      const oldObj = this.objects.find((o) => o.id === data.id);
      const index = this.objects.indexOf(oldObj);
      this.objects[index] = data;
    },
    async loadObjects() {
      const { data } = await ApiService.getTestObjects();
      this.objects = data;
    },
    async onDelete(id) {
      await ApiService.deleteTestObject(id);
      this.objects = this.objects.filter((o) => o.id !== id);
      this.onCloseForm();
    },
  },
  async mounted() {
    await this.loadObjects();
  },
};
</script>

<style lang="scss" scoped>
.test {
  margin: 20px;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 20px;

    .header-buttons {
      display: flex;
      align-items: center;

      button {
        margin-right: 10px;
      }
    }
  }

  .content {
    display: flex;

    .new-test-object {
      border-left: 1px solid lightgray;
    }
  }

  .data-table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid lightgray;

      .delete {
        color: darkred;
        text-decoration: none;
      }

      .edit {
        color: dodgerblue;
        text-decoration: none;
      }
    }
  }
}
</style>
