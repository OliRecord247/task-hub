import { useTasks, type Status, type Task } from "../context/useTasks";

type TaskListProps = { 
    name: string,
    status: Status
}

export function TaskList({ name, status }: TaskListProps) {
    const { tasks } = useTasks()
    const visibleTasks = tasks.filter(task => task.status === status)

    return (
        <div className="flex flex-col gap-1">
            <h2>{name}</h2>
            {visibleTasks.map(task => (
                <TaskListItem key={task.id} task={task} />
            ))}
        </div>
    );
}

type TaskListItemProps = { task: Task };

function TaskListItem({ task }: TaskListItemProps) {
    return (
        <div className="flex flex-col flex-1 border rounded-lg px-4 py-2">
            <h3>{task.name}</h3>
            <div className="text-zinc-400">
                Create: 
                <time dateTime={task.createdAt.toISOString()}>
                    {task.createdAt.toLocaleDateString()}
                </time>
            </div>
        </div>
    )
}