import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ItemWrapper } from './ItemWrapper';

import { TasksItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (editTask: {taskId: number, taskNewTitle: string}) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 22 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index} >
            <TasksItem task={item} index={index} toggleTaskDone={toggleTaskDone} editTask={editTask} removeTask={removeTask}/>
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
