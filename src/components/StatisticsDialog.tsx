import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTasks, type Status } from "../context/useTasks";
import { Button } from "./Button";

type StatisticsDialogProps = {
    isOpen: boolean
    onClose: () => void
}

const statusses: Status[] = ["open", "closed", "progress"]
const colors: Record<Status, string> = {
    open: "rgba(16, 185, 129, 0.6)",
    progress: "rgba(245, 158, 11, 0.6)",
    closed: "rgba(59, 130, 246, 0.6)"
}
const labels: Record<Status, string> = {
    open: "Open",
    closed: "Closed",
    progress: "In progress"
}

export function StatisticsDialog({ isOpen, onClose }: StatisticsDialogProps) {
    const { tasks } = useTasks();
    const dialogRef = useRef<HTMLDialogElement>(null)

    const data = statusses.map(status => {
        const amount = tasks.filter(t => t.status === status).length;
        return ({
            name: labels[status],
            fill: colors[status],
            amt: amount,
            value: Number((amount / tasks.length * 100).toFixed(2)),
        })
    });

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return

        if (isOpen) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [isOpen, onClose])

    return createPortal(
        (
            <dialog
                ref={dialogRef}
                onClose={onClose}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/60 backdrop:backdrop-blur-sm bg-blue-950/80 border border-blue-900/60 text-zinc-100 p-6 rounded-2xl max-w-md w-full shadow-2xl shadow-black/80">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Task Distribution
                    </h2>
                    <Button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 text-sm">
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </div>

                <div className="w-full h-72">
                    {isOpen && (
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    dataKey="value"
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "rgba(9, 9, 11, 0.9)",
                                        borderColor: "rgba(30, 58, 138, 0.5)",
                                        borderRadius: "8px",
                                        color: "#f4f4f5",
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </dialog>
        ),
        document.body
    )
}
