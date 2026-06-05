import { type ReactNode } from "react";
import { TaskContext, type Task, type Status } from "./useTasks";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useLocalStorage } from "../hooks/useLocalStorage";


type HabitProviderProps = {
    children: ReactNode
}

export function TaskProvider({ children }: HabitProviderProps) {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", [])

    function addTask(name: string) {
        setTasks(curr => [...curr, {
            id: crypto.randomUUID(),
            name, createdAt: new Date(), 
            history: [{ status: "open", date: new Date() }],
        }]);
    }

    function deleteTask(id: string) {
        setTasks(curr => curr.filter(h => h.id !== id))
    }

    function updateTaskStatus(id: string, status: Status) {
        setTasks(curr => {
            const index = curr.findIndex(task => task.id === id)
            if (index === -1) return curr;

            const updateTask = curr[index];
            updateTask.history = [...updateTask.history, { status, date: new Date() }]
            return curr.toSpliced(index, 1, updateTask)
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