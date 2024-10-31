import React, { useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleCompletion = (index) => {
    const newTasks = tasks.slice();
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
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
