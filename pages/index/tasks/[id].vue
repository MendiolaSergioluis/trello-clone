<script setup lang="ts">

import { useBoardStore} from "~/stores/boardStore";

const boardStore = useBoardStore()
const route = useRoute()
const toast = useToast()
const task = computed(() => {
  return boardStore.getTask(route.params.id as string)
})
function deleteTask(){
  toast.add({title: `La tarea '${task.value?.name}' se ha eliminado`, color: 'red', icon: 'i-heroicons-trash'})
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
        <UFormGroup label="Nombre" class="w-full mb-4">
          <UInput type="text" v-model="task.name"/>
        </UFormGroup>
        <UFormGroup label="Descripción" class="w-full mb-4">
          <UTextarea v-model="task.description"/>
        </UFormGroup>
        <UButton
            icon="i-heroicons-trash"
            color="red"
            @click="deleteTask"
        >Eliminar Tarea</UButton>
      </template>
      <template v-else>Tarea No Encontrada</template>
    </div>
  </div>
</template>

<style scoped>

</style>