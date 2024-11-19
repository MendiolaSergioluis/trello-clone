import {defineStore} from "pinia"
import boardData from '~/data/board.json'
import {useStorage} from '@vueuse/core'

export type Task = {
  id: string
  name: string
  description: string
}
export type Column = {
  id: string,
  name: string
  tasks: Task[]
}
export type Board = {
  name: string
  columns: Column[]
}

export const useBoardStore = defineStore('boardStore', () => {
  const board: Ref<Board> = useStorage('board', boardData)

  const getTask = computed(() => {
    return (taskId: string) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find(task => task.id === taskId)
        if (task) return task
      }
    }
  })

  function addColumn(columnName: string) {
    board.value.columns.push({
      id: String(Date.now()),
      name: columnName,
      tasks: []
    })
  }
  function deleteColumn(columnIndex: number) {
    board.value.columns.splice(columnIndex, 1)
  }

  return {
    // State
    board,
    // Getters
    getTask,
    // Actions
    addColumn,
    deleteColumn
  }
})