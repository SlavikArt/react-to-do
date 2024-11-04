import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState(localStorage.getItem("tasks") ?
    JSON.parse(localStorage.getItem("tasks")) : []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleCompletion = (index) => {
    const newTasks = tasks.map((task, i) => ({
      ...task,
      completed: i === index ? !task.completed : task.completed,
    }));
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleCompletion={toggleCompletion} deleteTask={deleteTask} />
      <Footer />
    </div>
  );
}

export default App;
