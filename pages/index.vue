<script setup lang="ts">
import {useBoardStore} from "~/stores/boardStore";

const boardStore = useBoardStore();
const route = useRoute()
const isModalOpen = computed(() => {
  return route.name === 'index-tasks-id'
})
const newColumnName: Ref<string> = ref('')

function addColumn() {
  boardStore.addColumn(newColumnName.value)
  newColumnName.value = ''
}


function closeModal() {
  navigateTo('/')
}

</script>

<template>
  <div class="board-wrapper">
    <main class="board">
      <!--      <h1>{{ boardStore.board.name }}</h1>-->
      <BoardColumn
          v-for="(column, columnIndex) in boardStore.board.columns"
          :key="column.id"
          :column="column"
          :columnIndex="columnIndex"
          class="column"
      />

      <UContainer class="column">
        <UInput
            v-model="newColumnName"
            type="text"
            placeholder="Create new column"
            icon="i-heroicons-plus-circle-solid"
            @keyup.enter="addColumn"
            aria-label="New column name"
        >
        </UInput>
      </UContainer>
    </main>
    <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
      <NuxtPage :key="route.fullPath"/>
    </div>
  </div>
</template>

<style scoped></style>
