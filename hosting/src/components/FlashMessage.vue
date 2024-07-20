<template>
  <v-row>
    <v-col cols="12">
      <v-snackbar
        v-model="show"
        :color="flashColor"
        variant="elevated"
        timeout="5000"
      >
        <v-icon :icon="flashIcon" class="mr-1"></v-icon>
        {{ message }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "success",
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    flashColor() {
      if (this.type === "success") return "success";
      if (this.type === "error") return "critical";
    },
    flashIcon() {
      if (this.type === "success") return "mdi-check-circle";
      if (this.type === "error") return "mdi-alert-circle";
    },
  },
  watch: {
    message(val) {
      if (val) {
        console.log("val: ", val);
        this.show = true;
      }
    },
  },
};
</script>
