import { type ReactNode } from "react";
import { TaskContext, type Status, type Task } from "./useTasks";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useLocalStorage } from "../hooks/useLocalStorage";


type HabitProviderProps = {
    children: ReactNode
}

export function TaskProvider({ children }: HabitProviderProps) {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [
        { id: crypto.randomUUID(), name: "First task", createdAt: new Date(), status: "open" },
        { id: crypto.randomUUID(), name: "Second task", createdAt: new Date(), status: "closed" },
        { id: crypto.randomUUID(), name: "Thrid task", createdAt: new Date(), status: "progress" },
        { id: crypto.randomUUID(), name: "Fourth task", createdAt: new Date(), status: "progress" },
    ])

    function addTask(name: string) {
        setTasks(curr => [...curr, { 
            id: crypto.randomUUID(), name, createdAt: new Date(), status: "open" 
        }]);
    }

    function deleteTask(id: string) {
        setTasks(curr => curr.filter(h => h.id !== id))
    }

    function updateTaskStatus(id: string, status: Status) {
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

        const taskId = event.operation.source?.id?.toString() ?? "";
        const nextStatus = event.operation.target.id as Status

        updateTaskStatus(taskId, nextStatus);
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <TaskContext value={{ tasks, addTask, deleteTask, updateTaskStatus }}>
                {children}
            </TaskContext>
        </DragDropProvider>
    )
}