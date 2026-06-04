import { createContext, useContext } from "react"

export type Status = "open" | "progress" | "closed"

export type Task = {
  id: string,
  name: string,
  createdAt: Date,
  status: Status,
  closedAt?: Date,
}

type Context = {
    tasks: Task[],
    addTask: (name: string) => void,
    updateTaskStatus: (id: string, status: Status) => void
}

export const TaskContext = createContext<null | Context>(null);

export function useTasks() {
    const habitContext = useContext(TaskContext)
    if (habitContext == null) throw new Error("Null context")
    
    return habitContext;
}
