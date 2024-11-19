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

function pickupColumn(event: DragEvent, fromColumnIndex: number) {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('type', 'column')
    event.dataTransfer.setData('from-column-index', fromColumnIndex.toString())
  }
}

function pickupTask(
    event: DragEvent,
    {fromColumnIndex, fromTaskIndex}: { fromColumnIndex: number, fromTaskIndex: number }
) {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'

    event.dataTransfer.setData('type', 'task')
    event.dataTransfer.setData('from-column-index', fromColumnIndex.toString())
    event.dataTransfer.setData('from-task-index', fromTaskIndex.toString())
  }
}

function dropItem(event: DragEvent, {toColumnIndex, toTaskIndex}: { toColumnIndex: number, toTaskIndex?: number }) {
  if (event.dataTransfer) {
    const type = event.dataTransfer.getData('type')
    const fromColumnIndex = event.dataTransfer.getData('from-column-index')

    if (type === 'task') {
      const fromTaskIndex = event.dataTransfer.getData('from-task-index')

      boardStore.moveTask({
        fromTaskIndex: Number(fromTaskIndex),
        toTaskIndex: toTaskIndex!,
        fromColumnIndex: Number(fromColumnIndex),
        toColumnIndex
      })
    } else if (type === 'column') {
      boardStore.moveColumn({
        fromColumnIndex: Number(fromColumnIndex),
        toColumnIndex
      })
    }
  }
}
</script>

<template>
  <UContainer
      class="column"
      draggable="true"
      @dragstart.self="pickupColumn($event, columnIndex)"
      @dragenter.prevent
      @dragover.prevent
      @drop.stop="dropItem($event, {toColumnIndex: columnIndex})"
  >
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
      <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
        <UCard
            class="mb-4"
            @click="goToTask(task.id)"
            draggable="true"
            @dragstart="pickupTask($event, {
              fromColumnIndex: columnIndex,
              fromTaskIndex: taskIndex
            })"
            @drop.stop="dropItem($event, {
              toColumnIndex: columnIndex,
              toTaskIndex: taskIndex
            })"
        >
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