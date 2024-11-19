<script setup lang="ts">
import {type Column, useBoardStore} from "~/stores/boardStore";

const props = defineProps<{
  column: Column
  columnIndex: number
}>()
const boardStore = useBoardStore();
const editNameState: Ref<boolean> = ref(false)
const newTaskName: Ref<string> = ref('')

function addTask() {
  boardStore.addTask({
    taskName: newTaskName.value,
    columnIndex: props.columnIndex
  })
  newTaskName.value = ''
}

function deleteColumn(columnIndex: number) {
  boardStore.deleteColumn(columnIndex)
}

function goToTask(taskId: string) {
  navigateTo(`/tasks/${taskId}`)
}
</script>

<template>
  <UContainer class="column">
    <div class="column-header mb-4">
      <div>
        <UInput
            type="text"
            v-if="editNameState"
            v-model="column.name"
            @keyup.enter="editNameState = false"
            @blur="editNameState = false"
            aria-label="New column name"
        />
        <h2 v-else>{{ column.name }}</h2>
      </div>
      <div>
        <UButton icon="i-heroicons-pencil-square" class="mr-2" @click="editNameState = !editNameState"
                 aria-label="Edit column name"/>
        <UButton icon="i-heroicons-trash" color="red" @click="deleteColumn(columnIndex)" aria-label="Delete column"/>
      </div>
    </div>
    <ul>
      <li v-for="(task) in column.tasks" :key="task.id">
        <UCard class="mb-4" @click="goToTask(task.id)">
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput
        v-model="newTaskName"
        type="text"
        placeholder="Create new task"
        icon="i-heroicons-plus-circle-solid"
        aria-label="New column name"
        @keyup.enter="addTask"
    >
    </UInput>
  </UContainer>
</template>

<style scoped>

</style>