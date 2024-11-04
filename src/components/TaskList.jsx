import React from 'react';

const TaskList = ({ tasks, toggleCompletion, deleteTask }) => {
  return (
    <ul className="w-full max-w-md">
      {tasks.map((task, index) => (
        <li key={index} className="flex justify-between items-center p-2 mb-2 border rounded bg-white shadow">
          <div>
            <span
              onClick={() => toggleCompletion(index)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.text}
            </span>
            <span className={`ml-2 text-sm ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
              ({task.priority.charAt(0).toUpperCase() + task.priority.slice(1)})
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : ''}
            </span>
          </div>
          <button onClick={() => deleteTask(index)} className="text-red-500 hover:text-red-700">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
