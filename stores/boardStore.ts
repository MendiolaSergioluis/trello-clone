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

  function moveTask({fromTaskIndex, toTaskIndex, fromColumnIndex, toColumnIndex}:
                    { fromTaskIndex: number, toTaskIndex: number, fromColumnIndex: number, toColumnIndex: number }) {
    // Remueve la tarea de la columna de origen y la guarda en una variable
    const task = board.value.columns[fromColumnIndex].tasks.splice(fromTaskIndex, 1)[0]
    // Agrega la tarea a la columna de destino
    board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task)
  }

  function deleteTask(taskId: string) {
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

  function moveColumn({fromColumnIndex, toColumnIndex}: { fromColumnIndex: number, toColumnIndex: number }) {
    const column = board.value.columns.splice(fromColumnIndex, 1)[0]
    board.value.columns.splice(toColumnIndex, 0, column)
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
    moveTask,
    deleteTask,
    addColumn,
    moveColumn,
    deleteColumn
  }
})