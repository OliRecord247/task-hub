import { twMerge } from "tailwind-merge";
import { useTasks, type Status, type Task } from "../context/useTasks";
import type { ComponentProps } from "react";

type TaskListProps = { 
    name: string,
    status: Status
} & ComponentProps<"div">

export function TaskList({ name, status, className }: TaskListProps) {
    const { tasks } = useTasks()
    const visibleTasks = tasks.filter(task => task.status === status)

    return (
        <div
            className={twMerge(
                "flex flex-col gap-3 rounded-xl p-4 text-zinc-100",
                "bg-blue-950/40 backdrop-blur-sm border-2",
                getStatustyling(status),
                className
            )}
        >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 px-1">
                {name} ({visibleTasks.length})
            </h2>
            <div className="flex flex-col gap-2">
                {visibleTasks.map(task => (
                    <TaskListItem key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

type TaskListItemProps = { task: Task };

function TaskListItem({ task }: TaskListItemProps) {
    return (
        <div className="flex flex-col gap-1 rounded-lg bg-blue-900/20 border border-blue-900/40 px-4 py-3 shadow-sm hover:border-blue-800/60 transition-colors">
            <h3 className="font-medium text-zinc-200 text-sm">{task.name}</h3>
            <div className="text-xs text-zinc-500 flex gap-1">
                Create: 
                <time dateTime={task.createdAt.toISOString()}>
                    {task.createdAt.toLocaleDateString()}
                </time>
            </div>
        </div>
    )
}

function getStatustyling(status: Status) {
    switch(status) {
        case "open":
            return "border-emerald-500/30 shadow-lg shadow-emerald-500/5";
        case "progress":
            return "border-amber-500/30 shadow-lg shadow-amber-500/5";
        case "closed":
            return "border-blue-500/30 shadow-lg shadow-blue-500/5";
        default:
            throw new Error(`Invalid variant: ${status satisfies never}`)
    }
}
