<template>
  <div class="test">
    <div class="header">
      <h1>Test CRUD</h1>
      <button @click="onClickNew">New</button>
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
            <a href="#" @click="onDelete(object.id)" class="delete">Delete</a>
          </td>
        </tr>
      </table>

      <new-test-object
        v-if="showNewDataForm"
        @cancel="onCloseForm"
        @save="onSaveNewObject"
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
      showNewDataForm: false,
    };
  },
  methods: {
    formatTime(datetime) {
      if (!datetime) {
        return "None";
      }
      return FormatUtil.formatDateTime(datetime);
    },
    onClickNew() {
      this.showNewDataForm = true;
    },
    onCloseForm() {
      this.showNewDataForm = false;
    },
    async onSaveNewObject(obj) {
      const { data } = await ApiService.createTestObject(obj);
      console.log(JSON.stringify(data, null, 2));
      this.objects.push(data);
      this.onCloseForm();
    },
    async loadObjects() {
      const { data } = await ApiService.getTestObjects();
      this.objects = data;
    },
    async onDelete(id) {
      await ApiService.deleteTestObject(id);
      this.objects = this.objects.filter((o) => o.id !== id);
    },
  },
  async mounted() {
    await this.loadObjects();
  },
};
</script>

<style lang="scss" scoped>
.test {
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 20px;
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
    }
  }
}
</style>
