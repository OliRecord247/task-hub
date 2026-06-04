import { createContext, useContext } from "react"

export type Status = "open" | "progress" | "closed"

export type Task = {
  id: number,
  name: string,
  createdAt: Date,
  status: Status,
  closedAt?: Date,
}

type Context = {
    tasks: Task[],
}

export const TaskContext = createContext<null | Context>(null);

export function useTasks() {
    const habitContext = useContext(TaskContext)
    if (habitContext == null) throw new Error("Null context")
    
    return habitContext;
}
