<template>
  <div class="home">
    <h1>{{ heading }}</h1>
    <h3>{{ subheading }}</h3>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { formatDateTime } from "@/utils/FormatUtil";

export default {
  name: "Home",
  data: () => {
    return {
      name: null,
      time: null,
    };
  },
  async mounted() {
    this.time = DateTime.now();
  },
  computed: {
    heading() {
      return "Welcome to my Demo Application";
    },
    subheading() {
      return `It is ${this.timeFormatted}`;
    },
    timeFormatted() {
      if (!this.time) {
        return null;
      }
      return formatDateTime(this.time);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: #42b983;
}
</style>
