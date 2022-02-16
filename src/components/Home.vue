<template>
  <div class="home">
    <h1>{{ heading }}</h1>
    <h3>{{ subheading }}</h3>
  </div>
</template>

<script>
import { httpClient } from "@/api";
import { DateTime } from "luxon";
import get from "lodash-es/get";
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
    const { data } = await httpClient.post("hello-world", {
      name: "matt",
      time: DateTime.now(),
    });
    this.name = get(data, "name", "Unknown");
    this.time = get(data, "time", "(unavailable)");
  },
  computed: {
    heading() {
      return `Welcome to my Demo Application, ${this.name}.`;
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
