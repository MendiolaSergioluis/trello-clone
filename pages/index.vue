<script setup lang="ts">
useHead({
  title: 'Tableros',
  meta: [
    {
      name: 'description',
      content: 'Página Principal: Tableros de Tareas'
    }
  ]
})
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
    <h1 class="text-2xl md:text-4xl font-bold text-white uppercase font-serif p-4">Tableros</h1>
    <main class="board">
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
            placeholder="Crear Nueva Columna"
            icon="i-heroicons-plus-circle-solid"
            @keyup.enter="addColumn"
            aria-label="Nombre de Columna"
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
