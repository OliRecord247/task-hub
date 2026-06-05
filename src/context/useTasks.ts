import { createContext, useContext } from "react"

export type Status = "open" | "progress" | "closed"

export type TaskHistory = {
    status: Status,
    date: Date,
}

export type Task = {
    id: string
    name: string
    createdAt: Date
    history: TaskHistory[]
}

export function getLatestStatus(task: Task): Status | null {
    if (!task.history || task.history.length === 0) return null;

    const latest = task.history.reduce<TaskHistory>((acc, next) => {
        return next.date > acc.date ? next : acc;
    }, task.history[0]);

    return latest.status;
}

type Context = {
    tasks: Task[],
    addTask: (name: string) => void,
    deleteTask: (id: string) => void,
    updateTaskStatus: (id: string, status: Status) => void
}

export const TaskContext = createContext<null | Context>(null);

export function useTasks() {
    const habitContext = useContext(TaskContext)
    if (habitContext == null) throw new Error("Null context")

    return habitContext;
}
