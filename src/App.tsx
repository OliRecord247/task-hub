import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";
import { TaskProvider } from "./context/TaskProvider";

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <TaskProvider>
        <Header />
        <TaskList name="Open" status="open" />
        <TaskList name="Progress" status="progress" />
        <TaskList name="Closed" status="closed" />
      </TaskProvider>
    </div>
  )
}