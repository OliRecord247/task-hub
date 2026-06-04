import { format, formatISO } from "date-fns"
import { twMerge } from "tailwind-merge";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import { closestCenter } from "@dnd-kit/collision"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useTasks, type Status, type Task } from "../context/useTasks";
import { Button } from "./Button";

type TaskListProps = {
    name: string,
    status: Status
}

export function TaskList({ name, status }: TaskListProps) {
    const { tasks } = useTasks()
    const { ref } = useDroppable({
        id: status.toString(),
        collisionDetector: closestCenter
    })
    const visibleTasks = tasks.filter(task => task.status === status)

    return (
        <div
            ref={ref}
            className={twMerge(
                "flex flex-col gap-3 rounded-xl p-4 text-zinc-100",
                "bg-blue-950/40 backdrop-blur-sm border-2",
                getStatustyling(status),
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
    const { deleteTask } = useTasks();
    const { ref } = useDraggable({ id: task.id });

    return (
        <div
            ref={ref}
            className="cursor-pointer flex items-center justify-between rounded-lg bg-blue-900/20 border border-blue-900/40 px-4 py-3 shadow-sm hover:border-blue-800/60 transition-colors">
            <div className="flex flex-col gap-1 ">
                <h3 className="font-medium text-zinc-200 text-sm">{task.name}</h3>
                <div className="text-xs text-zinc-500 flex gap-1">
                    Created:
                    <time dateTime={formatISO(task.createdAt)}>
                        {format(task.createdAt, "dd/MM/yyyy hh:mm")}
                    </time>
                </div>
            </div>
            <Button variant="danger" className="text-xs p-1.5 rounded-full" onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
    )
}

function getStatustyling(status: Status) {
    switch (status) {
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
