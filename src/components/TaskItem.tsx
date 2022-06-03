import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/pen.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (editTask: {taskId: number, taskNewTitle: string}) => void;
}

export function TasksItem({task, index, toggleTaskDone, removeTask, editTask}: TasksItemProps){
  const [isEditing, setIsEditing] = useState(false)
  const [editingValue, setEditingValue] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing(){
    setEditingValue(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing(){
    editTask({taskId: task.id, taskNewTitle: editingValue})
    setIsEditing(false)
  }

  useEffect(() => {
    if(textInputRef.current){
      if(isEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isEditing])

  return(
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          >
          <View 
            style={ task.done ? styles.taskMarkerDone : styles.taskMarker }
            >
            { task.done && (
              <Icon 
              name="check"
              size={12}
              color="#FFF"
              />
              )}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={editingValue}
            editable={isEditing}
            onChangeText={setEditingValue}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={ styles.iconsContainer } >
        {isEditing
        ? <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        : <TouchableOpacity 
            disabled={task.done}
            onPress={handleStartEditing}
          >
           <Image source={editIcon} style={task.done? styles.iconDisabled : null} />
         </TouchableOpacity>
        }
        <View style={styles.iconDivider} />
        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
          >
          <Image source={trashIcon} style={isEditing ? styles.iconDisabled : null}/>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
    marginRight: 20
  },
  iconDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)'
  },
  iconDisabled: {
    opacity: 0.2
  }
})