<script setup lang="ts">

import { useBoardStore} from "~/stores/boardStore";

const boardStore = useBoardStore()
const route = useRoute()
const toast = useToast()
const task = computed(() => {
  return boardStore.getTask(route.params.id as string)
})
function deleteTask(){
  toast.add({title: `${task.value?.name} has been deleted`, color: 'red', icon: 'i-heroicons-trash'})
  boardStore.deleteTask(route.params.id as string)
  navigateTo('/')
}
useHead({
  title: `Tarea: ${task.value?.name}`,
  meta: [
    {
      name: 'description',
      content: `Tarjeta de la tarea:${task.value?.name}`
    },
  ]
})
</script>

<template>
  <div class="task-wrapper">
    <div class="task-view">
      <template v-if="task">
        <UFormGroup label="Name" class="w-full mb-4">
          <UInput type="text" v-model="task.name"/>
        </UFormGroup>
        <UFormGroup label="Description" class="w-full mb-4">
          <UTextarea v-model="task.description"/>
        </UFormGroup>
        <UButton
            icon="i-heroicons-trash"
            color="red"
            @click="deleteTask"
        >Delete Task</UButton>
      </template>
      <template v-else>Task not found</template>
    </div>
  </div>
</template>

<style scoped>

</style>