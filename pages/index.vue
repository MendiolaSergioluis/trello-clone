<script setup lang="ts">
import {useBoardStore} from "~/stores/boardStore";

const boardStore = useBoardStore();
</script>

<template>
  <main>
    <h1>Build a Trello Clone Home Page</h1>
    <pre>{{ boardStore.board }}</pre>
  </main>
</template>

<style scoped></style>
