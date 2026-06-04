import { Button } from "./Button";

export function Header() {
    return (
        <header className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold">Task Hub</h1>
                <span className="text-zinc-400 text-sm">10 / 20 finished</span>
            </div>
            <div className="flex flex-col gap-1 items-end border-2 rounded-sm px-4 py-2">
                <span className="text-zinc-400 text-sm">Test</span>
                <div className="flex items-center gap-1">
                    <Button>Prev</Button>
                    <Button>Next</Button>
                </div>
            </div>
        </header>
    )
}