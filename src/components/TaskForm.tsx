import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { createPortal } from "react-dom";
import { useTasks } from "../context/useTasks";
import { Button } from "./Button";

type TaskFromProps = { 
    isOpen: boolean
    onClose: () => void
}

export function TaskForm({ isOpen, onClose }: TaskFromProps) {
    const [name, setName] = useState("")
    const { addTask } = useTasks()

    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return
    
        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }

        const handleCancel = (e: Event) => {
            e.preventDefault();
            onClose();
        };

        const handleClickOutside = (e: PointerEvent) => {
            const rect = dialog.getBoundingClientRect();
            const isClickOutside = (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            );
            if (isClickOutside) {
                onClose()
            }
        }

        dialog.addEventListener("cancel", handleCancel);
        dialog.addEventListener("click", handleClickOutside);

        return () => {
            dialog.removeEventListener("cancel", handleCancel);
            dialog.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen, onClose])

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault()
        if (name.trim() === "") return
        addTask(name)
        setName("")
        onClose()
    }

    function handleClose() {
        setName("")
        onClose()
    }

    return createPortal(
        (
            <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-blue-950/80 border border-blue-900/60 text-zinc-100 p-6 rounded-2xl max-w-md w-full shadow-2xl shadow-black/80">
            <div className="flex flex-col gap-1 mb-6">
                <h2 className="text-2xl font-bold">
                    Create New Task
                </h2>
                <p className="text-zinc-400 text-xs">Add a new task to your workspace.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g., Create new task board"
                    className="bg-blue-900 border border-blue-900 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />

                <div className="flex items-center justify-end gap-2 mt-2">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={handleClose}
                        className="text-sm font-medium px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="text-sm font-semibold px-5 py-2 rounded-lg"
                    >
                        Create Task
                    </Button>
                </div>
            </form>
        </dialog>
        ),
        document.body
    )
}