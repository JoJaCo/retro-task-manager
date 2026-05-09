import React, { useState, useEffect } from 'react';
import './App.css';

// These components don't exist yet - we'll create them next
// For now, we'll comment them out and use placeholder JSX
// import TaskInput from './components/TaskInput';
// import TaskList from './components/TaskList';

function App() {
  // ========== STATE MANAGEMENT ==========
  // useState returns an array with 2 things:
  // 1. Current value (tasks)
  // 2. Function to update it (setTasks)
  const [tasks, setTasks] = useState([
    { id: 1, text: "Add retro glow effects", completed: false },
    { id: 2, text: "Implement task deletion", completed: true },
    { id: 3, text: "Create scanline animation", completed: false }
  ]);

  // State for the input field value
  const [inputValue, setInputValue] = useState('');

  // ========== HELPER FUNCTIONS ==========

  // Add a new task
  const addTask = () => {
    // Don't add empty tasks
    if (inputValue.trim() === '') return;
    
    // Create new task object
    const newTask = {
      id: Date.now(), // Use timestamp as unique ID
      text: inputValue,
      completed: false
    };
    
    // Add to existing tasks array
    setTasks([...tasks, newTask]);
    
    // Clear input field
    setInputValue('');
  };

  // Delete a task by its id
  const deleteTask = (id) => {
    // Keep all tasks EXCEPT the one with matching id
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Toggle task completion status
  const toggleComplete = (id) => {
    // Map over tasks, if id matches, flip the completed boolean
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed } 
        : task
    );
    setTasks(updatedTasks);
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // ========== EFFECTS ==========
  // useEffect runs after component renders
  // Empty array [] means "run once when component first loads"
  useEffect(() => {
    console.log('🕹️ Retro Task Manager loaded!');
    // Later, we'll load tasks from database here
  }, []);

  // This effect runs every time 'tasks' changes
  useEffect(() => {
    console.log(`📋 You have ${tasks.length} task(s)`);
    // Later, we'll save tasks to database here
  }, [tasks]);

  // ========== JSX RETURN (What renders on screen) ==========
  return (
    <div className="App">
      {/* Retro Header */}
      <div className="crt-header">
        <h1>
          <span className="blinking-cursor">🕹️</span> 
          RETRO TASK MANAGER 
          <span className="blinking-cursor">🕹️</span>
        </h1>
        <div className="subtitle">
          >_ SYSTEM v1.0 | TASKS: {tasks.length} | TERMINAL READY
        </div>
      </div>

      {/* Input Area - Temporary inline version */}
      <div className="task-input">
        <input
          type="text"
          placeholder=">_ ENTER NEW TASK..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTask}>
          [ ADD TASK ]
        </button>
      </div>

      {/* Task List - Temporary inline version */}
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            ═══════════════════════════<br />
            >_ NO TASKS FOUND<br />
            >_ ADD A TASK ABOVE<br />
            ═══════════════════════════
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>
              <button 
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                [X]
              </button>
            </div>
          ))
        )}
      </div>

      {/* Retro Footer */}
      <div className="crt-footer">
        <div className="status-bar">
          ⚡ CTRL+C to exit | ESC to cancel | INSERT to add ⚡
        </div>
      </div>
    </div>
  );
}

export default App;