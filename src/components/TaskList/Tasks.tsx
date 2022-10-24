import { Trash } from "phosphor-react";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { ITask } from "../../App";
import styles from './styles.module.css';
import { Task } from "./Task";

interface TaskProps {
    tasks: ITask[];
    onHandleCreateNewTask: (taskTitle: string) => void;
    onHandleDeleteTask: (taskId: string) => void;
    onComplete:(taskId: string) => void;
}

export const Tasks = ({tasks, onHandleCreateNewTask, onHandleDeleteTask, onComplete}: TaskProps) => {

    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const [taskText, setTaskText] = useState('');


    const handleNewTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.setCustomValidity('');
        setTaskText(event.target.value);
    }
    const handleCreateNewTask = (event: FormEvent) => {
        event.preventDefault();

        onHandleCreateNewTask(taskText);
        setTaskText('');
    }

    const handleNewEmptyTask = (event: InvalidEvent<HTMLInputElement>) => {
        event.target.setCustomValidity('Preencha uma tarefa antes de criar!');
    }

    
    return (

        <>
            <form onSubmit={handleCreateNewTask} className={styles.main}>
                <input type="text" placeholder="Adicione uma nova tarefa" 
                onChange={handleNewTaskChange}
                value={taskText}
                onInvalid={handleNewEmptyTask}
                required
                />

                <button className={styles.button}>
                    <div className={styles.buttonContent}>
                        <span>Criar</span>
                        <img src="./plus.svg"  alt="Plus button to add new task"/>
                    </div>
                
                </button>
            </form>
            

            <div 
            className={styles.main}
            >
                <div 
                className={styles.headerInfo}
                 >
                    <span 
                    className={styles.createdTasks}>tarefas criadas</span>
                    <span className={styles.counter}>{tasksQuantity}</span>
                </div>
                <div 
                className={styles.headerInfo}
                >
                    <span
                    className={styles.concludedTasks}
                    >concluídas </span>
                    <span className={styles.counter}>{completedTasks} de {tasksQuantity}</span>
                </div>

            </div>
            
            
            <div className={styles.tasksContainer}>
                {tasks.length === 0 ? (
                    <div className={styles.tasksEmptyContent}>
                        <img src="./Clipboard.svg" alt="Empty task list" />
                        
                        <span className={styles.emptyContentTitle}>Você ainda não tem tarefas cadastradas</span>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>  
                ) : 
                
                (
                    <div className={styles.tasksContainer}>
                        {tasks.map(task => (
                            <Task 
                            key={task.id}
                            task={task}
                            onHandleDeleteTask={onHandleDeleteTask}
                            onComplete={onComplete}
                            />
                        ))}
                    </div>
                )}
                
            </div>
        </>
    )
}