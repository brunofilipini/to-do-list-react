import React, { useState } from 'react';
import './App.css';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [tasksToDelete, setTasksToDelete] = useState(new Set());

    function adicionar() {
        if (newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), text: newTask }]);
            setNewTask('');
        }
    }

    function handleTaskChange(event) {
        const taskId = parseInt(event.target.value, 10);
        const isChecked = event.target.checked;

        setTasksToDelete(prevTasksToDelete => {
            const updated = new Set(prevTasksToDelete);
            if (isChecked) {
                updated.add(taskId);
            } else {
                updated.delete(taskId);
            }
            return updated;
        });
    }

    function excluir() {
        setTasks(tasks.filter(task => !tasksToDelete.has(task.id)));
        setTasksToDelete(new Set());
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            adicionar();
        }
    }

    return (
        <section className="app-container">
            <div className="header-container">
                <h1 className="header-text">To Do List</h1>
            </div>

            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new task"
                />
                <button className="add-button" onClick={adicionar}>Add Task</button>
            </div>

            <div className="task-container">
                <ul className="task-list">
                    {tasks.map((task, index) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={tasksToDelete.has(task.id)}
                                onChange={handleTaskChange}
                                value={task.id}
                            />
                            <span className="task-number">{index + 1}. </span>{task.text}
                        </li>
                    ))}
                </ul>
            </div>

            <button className="delete-button" onClick={excluir}>Delete Selected Tasks</button>
        </section>
    );
}
