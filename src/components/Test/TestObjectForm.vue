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
  data: () => {
    return {
      name: null,
      active: false,
      time: null,
    };
  },
  methods: {
    onSave() {
      this.$emit("save", {
        name: this.name,
        active: this.active,
        time: DateTime.fromISO(this.time),
      });
    },
    onCancel() {
      this.$emit("cancel");
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
  margin: 20px 0;

  .field-label {
    font-weight: bold;
  }

  .action {
    margin: 10px 0;
  }
}
</style>
