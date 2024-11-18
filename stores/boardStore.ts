import {defineStore} from "pinia"
import boardData from '~/data/board.json'

type Task = {
  id: string
  name: string
  description: string
}
type Column = {
  name: string
  tasks: Task[]
}
type Board = {
  name: string
  columns: Column[]
}

export const useBoardStore = defineStore('boardStore', () => {
  const board: Ref<Board> = ref(boardData)

  return {
    board
  }
})