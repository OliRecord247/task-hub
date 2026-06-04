import { useTasks } from "../context/useTasks";
import { Button } from "./Button";

export function Header() {
    const { tasks } = useTasks();

    const finishedCount = tasks.filter(task => task.status === "closed").length;

    return (
        <header className="flex items-center justify-between border-b border-blue-900/30 pb-6 mb-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">
                    Task Hub
                </h1>
                <span className="text-zinc-400 text-sm font-medium">
                    {finishedCount} <span className="text-zinc-600">/</span> {tasks.length} finished
                </span>
            </div>

            <div className="flex flex-col gap-2 items-end bg-blue-950/30 border border-blue-900/50 rounded-xl p-3 shadow-md shadow-black/20 backdrop-blur-sm">
                <span className="text-zinc-500 text-xs font-semibold uppercase px-1">
                    Navigation
                </span>
                <div className="flex items-center gap-1.5">
                    <Button className="bg-blue-900/40 border border-blue-800/60 hover:bg-blue-900/80 text-zinc-200 text-xs px-3 py-1.5 rounded-lg transition-colors">
                        Prev
                    </Button>
                    <Button className="bg-blue-900/40 border border-blue-800/60 hover:bg-blue-900/80 text-zinc-200 text-xs px-3 py-1.5 rounded-lg transition-colors">
                        Next
                    </Button>
                </div>
            </div>
        </header>
    )
}