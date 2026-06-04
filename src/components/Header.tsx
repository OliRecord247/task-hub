import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "../context/useTasks";
import { Button } from "./Button";
import { TaskForm } from "./TaskForm";

export function Header() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { tasks } = useTasks();

    const finishedCount = tasks.filter(task => task.status === "closed").length;
    
    return (
        <header className="flex items-center justify-between border-b-2 border-blue-900 pb-6 mb-6">
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
                    Controls
                </span>
                <div className="flex items-center gap-1.5">
                    <Button 
                        onClick={() => setIsFormOpen(true)}
                        className="text-xs px-3 py-1.5 rounded-lg"
                    >
                        <FontAwesomeIcon icon={faPlus} /> Add
                    </Button>
                    <Button variant="secondary" className="text-xs px-3 py-1.5 rounded-lg">
                        <FontAwesomeIcon icon={faChartSimple} />
                    </Button>
                </div>
            </div>

            <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </header>
    )
}