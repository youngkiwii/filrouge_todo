import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../components/styles'

export default function TodoListsScreen ({ navigation }) {
    return (
        <View style={styles.body}>
            <Text style={styles.title}>Liste des TodoList</Text>
        </View>
    )
}