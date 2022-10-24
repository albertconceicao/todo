import { useState } from 'react'
import { Header } from './components/Header';
import { Tasks } from './components/TaskList/Tasks';
import styles from './styles/global.module.css';

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleCreateTask = (taskTitle: string) => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,

      }
    ])
  }

  const deleteTaskById = (taskId: string) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  }
  const toggleTaskCompletedById = (taskId: string) => {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        }
      }
      return task;
    });

    setTasks(newTasks);
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Tasks 
        tasks={tasks} 
        onHandleCreateNewTask={handleCreateTask} onHandleDeleteTask={deleteTaskById} 
        onComplete={toggleTaskCompletedById}
        />
      </div>
    </>
  )
}

export default App
