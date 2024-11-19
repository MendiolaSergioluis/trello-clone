import {defineStore} from 'pinia'
import {v4 as uuid} from 'uuid'
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

  // Tasks
  const getTask = computed(() => {
    return (taskId: string) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find(task => task.id === taskId)
        if (task) return task
      }
    }
  })

  function addTask({taskName, columnIndex}: { taskName: string, columnIndex: number }) {
    board.value.columns[columnIndex].tasks.push({
      id: uuid(),
      name: taskName,
      description: ''
    })
  }

  function deleteTask(taskId: string){
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1)
        return
      }
    }
  }

  // Columns
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
    addTask,
    deleteTask,
    addColumn,
    deleteColumn
  }
})