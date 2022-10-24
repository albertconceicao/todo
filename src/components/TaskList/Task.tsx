import { Trash } from "phosphor-react";
import { ITask } from "../../App";
import styles from './styles.module.css';

interface TaskProps {
    task: ITask;
    onHandleDeleteTask: (taskId: string) => void;
    onComplete: (taskId: string) => void;
}

export const Task = ({task, onHandleDeleteTask, onComplete}: TaskProps) => {
    const isCompleted = true; 
  
    return (
        <div className={styles.tasksContent}>
            
            <label className={styles.checkedInput}>

                <input type="checkbox" name="" id="" 
                onClick={() => onComplete(task.id)}
                />
                <span></span>
            </label>

            <span className={task.isCompleted ? styles.textCompleted: ''}>
                {task.title}
            </span>

            <button onClick={() => onHandleDeleteTask(task.id)}>
                <Trash size={24} />
            </button>
        </div>
    );
}