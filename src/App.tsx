import { useEffect, useState } from 'react'
import { Header } from './components/Header';
import { Tasks } from './components/TaskList/Tasks';
import { api } from './services/api';
import styles from './styles/global.module.css';

export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const loadTasks = () => {
    const tasksOnStorage = localStorage.getItem('tasks');
    api.get('/tasks').then((response) => {
      console.log(response.data)
      // setTasks(response.data);
    })

    if(tasksOnStorage) {
      setTasks(JSON.parse(tasksOnStorage));
    }
  }

  useEffect(() => {
    loadTasks();
  }, [])

  const setTasksAndUpload = (newTasks: ITask[]) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  const handleCreateTask = (taskTitle: string) => {
    setTasksAndUpload([
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
    setTasksAndUpload(newTasks);
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

    setTasksAndUpload(newTasks);
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
