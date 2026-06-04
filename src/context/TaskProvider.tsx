import { useState, type ReactNode } from "react";
import { TaskContext, type Status, type Task } from "./useTasks";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";


type HabitProviderProps = {
    children: ReactNode
}

export function TaskProvider({ children }: HabitProviderProps) {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, name: "Open task", createdAt: new Date(), status: "open" },
        { id: 2, name: "Closed task", createdAt: new Date(), status: "closed" },
        { id: 3, name: "In progress task", createdAt: new Date(), status: "progress" },
        { id: 4, name: "Second task", createdAt: new Date(), status: "progress" },
    ])

    function updateTaskStatus(id: number, status: Status) {
        setTasks(curr => {
            const index = curr.findIndex(task => task.id === id)
            if (index === -1) return curr;

            const task = { ...curr[index], status }
            return curr.toSpliced(index, 1, task)
        })
    }

    function handleDragEnd(event: DragEndEvent) {
        if (event.canceled) return;
        if (!event.operation.target) return;

        const taskId = Number(event.operation.source?.id);
        const nextStatus = event.operation.target.id as Status

        updateTaskStatus(taskId, nextStatus);
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <TaskContext value={{ tasks, updateTaskStatus }}>
                {children}
            </TaskContext>
        </DragDropProvider>
    )
}