import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Text, View } from 'react-native'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import { taskLists } from '../API/todoAPI'
import Input from '../components/UI/Input'
import { createTaskLists } from '../API/todoAPI'
import TodoCard from '../components/TodoCard'

export default function TodoListsScreen (props, { navigation }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [text, setText] = useState(null);

    useEffect(() => {
        if (data.length == 0) {
            taskLists(username, token)
            .then(taskLists => {
                setData(taskLists);
            })
        }
    }, [data]);

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => 
                        <View style={styles.body}>
                            <Input
                                style={{marginTop: 20}}
                                onPress={() => {
                                    createTaskLists(text, username, token)
                                    .then(json => {
                                        setData([...data, {"id": json.taskLists[0].id, "title": json.taskLists[0].title}]);
                                    })
                                    setText(null);
                                }}
                                text={text}
                                onChangeText={setText}
                                placeholder="Nouvelle TodoList"
                            />
                            <Text style={styles.title}>Liste des TodoList</Text>
                            <FlatList 
                                style={{width: "70%"}}
                                data={data}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => 
                                    <TodoCard 
                                        id={item.id} 
                                        data={data} 
                                        onPress={() => {
                                            props.navigation.navigate("Todos", {id: item.id, todolist: item.title});
                                        }} 
                                        setData={setData} 
                                        style={{marginTop: 10}} 
                                        text={item.title}
                                    />}
                            />
                        </View>
                    }
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}