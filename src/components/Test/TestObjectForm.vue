<template>
  <div class="new-test-object">
    <span class="field-label">Name </span>
    <input type="text" v-model="name" />
    <span class="field-label">Active</span>
    <input type="checkbox" v-model="active" />
    <span class="field-label">Time</span>
    <input type="datetime-local" v-model="time" />
    <button class="action" @click="onSave">Save</button>
    <button class="action" @click="onCancel">Cancel</button>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: "NewTestObject",
  props: {
    obj: Object,
  },
  data: () => {
    return {
      id: null,
      name: null,
      active: false,
      time: null,
    };
  },
  mounted() {
    this.setObj(this.obj);
  },
  methods: {
    setObj(obj) {
      if (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.active = obj.active;
        this.time = DateTime.fromISO(obj.time).toFormat("yyyy-MM-dd'T'HH:mm");
      }
    },
    onSave() {
      this.$emit("save", {
        id: this.id,
        name: this.name,
        active: this.active,
        time: DateTime.fromISO(this.time),
      });
    },
    onCancel() {
      this.$emit("cancel");
    },
  },
  watch: {
    obj(newVal) {
      this.setObj(newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.new-test-object {
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: start;
  margin: 20px 0 0 20px;
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
  border: 1px solid lightgray;

  .field-label {
    font-weight: bold;
  }

  .action {
    margin: 10px 0;
  }
}
</style>
