import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find(task => task.title === newTaskTitle)

    if(taskExists)
    return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask])
  }

  function handleEditTask(editTask: {taskId: number, taskNewTitle: string}){
    const updatedTasks = tasks.map(task => ({...task}));

    const taskToBeEdit = updatedTasks.find( task => task.id == editTask.taskId)

    if(!taskToBeEdit)
    return

    taskToBeEdit.title = editTask.taskNewTitle
    
    setTasks(updatedTasks)
  }

  function handleToggleTaskDone(id: number) {
    const taskToUpdate = tasks.find(task => task.id === id);

    if(!taskToUpdate)
    return

    const updatedTasks = tasks.map( task =>
      task.id === id ? {...task, done:!taskToUpdate?.done }: task
    )
    
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {}
        },
        {
          text: 'Sim',
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})