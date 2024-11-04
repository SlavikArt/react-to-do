import React, { useState } from 'react';

const priorities = [
  { level: 'high', color: 'bg-red-500' },
  { level: 'medium', color: 'bg-yellow-500' },
  { level: 'low', color: 'bg-green-500' },
];

const dueDates = [
  { label: '1 Day', days: 1, color: 'bg-red-500' },
  { label: '3 Days', days: 3, color: 'bg-orange-500' },
  { label: '1 Week', days: 7, color: 'bg-green-500' },
];

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [customDateSelected, setCustomDateSelected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask({ text: task, completed: false, priority, dueDate });
      setTask('');
      setPriority('medium');
      setDueDate('');
      setShowCalendar(false);
      setCustomDateSelected(false);
    }
  };

  const handleDueDateSelection = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setDueDate(date.toISOString().split('T')[0]);
    setShowCalendar(false);
    setCustomDateSelected(false);
  };

  const isDateSelected = (days) => {
    if (!dueDate) return false;
    const selectedDate = new Date(dueDate);
    const comparisonDate = new Date();
    comparisonDate.setDate(comparisonDate.getDate() + days);
    return selectedDate.toISOString().split('T')[0] === comparisonDate.toISOString().split('T')[0];
  };

  return (
    <form className="w-full max-w-md mb-4 p-4 border rounded bg-white shadow" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Add a new task"
      />
      <div className="flex mb-4 justify-center space-x-2">
        {priorities.map(p => (
          <button
            key={p.level}
            type="button"
            onClick={() => setPriority(p.level)}
            className={`p-2 rounded text-white ${priority === p.level ? p.color : 'bg-gray-300'}`}
          >
            {p.level.charAt(0).toUpperCase() + p.level.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex mb-4 justify-center space-x-2">
        {dueDates.map(d => (
          <button
            key={d.label}
            type="button"
            onClick={() => handleDueDateSelection(d.days)}
            className={`p-2 rounded text-white ${isDateSelected(d.days) ? d.color : 'bg-gray-300'}`}
          >
            {d.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setCustomDateSelected(true);
            setDueDate('');
          }}
          className={`p-2 rounded text-white ${showCalendar || customDateSelected ? 'bg-blue-500' : 'bg-gray-300'}`}
        >
          Other
        </button>
      </div>
      {showCalendar && (
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
      )}
      <button className="w-full p-2 bg-blue-500 text-white rounded">Add Task</button>
    </form>
  );
};

export default TaskInput;
