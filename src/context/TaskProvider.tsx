import { useState, type ReactNode } from "react";
import { TaskContext, type Task } from "./useTasks";


type HabitProviderProps = {
    children: ReactNode
}

export function TaskProvider({ children }: HabitProviderProps) {
    const [tasks] = useState<Task[]>([
        { id: 1, name: "Open task", createdAt: new Date(), status: "open" },
        { id: 2, name: "Closed task", createdAt: new Date(), status: "closed" },
        { id: 3, name: "In progress task", createdAt: new Date(), status: "progress" },
        { id: 4, name: "Second task", createdAt: new Date(), status: "progress" },
    ])

    return (
        <TaskContext value={{ tasks }}>
            {children}
        </TaskContext>
    )
}