import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Text, View, ActivityIndicator } from 'react-native'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import { taskLists } from '../API/todoAPI'
import Input from '../components/UI/Input'
import { createTaskLists } from '../API/todoAPI'
import TodoCard from '../components/TodoCard'
import {ContainerPurple, ContainerWhite} from '../components/Container'

export default function TodoListsScreen (props, { navigation }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(true);

    const createTaskListsFct = () => {
        createTaskLists(text, username, token)
        .then(json => {
            setData([...data, {"id": json.taskLists[0].id, "title": json.taskLists[0].title}]);
        })
        .catch(err => {
            console.log(err);
        })
        setText(null);
    };

    useEffect(() => {
        if (data.length == 0) {
            taskLists(username, token)
            .then(taskLists => {
                setData(taskLists);
                setLoading(false);
            })
        }
    }, [data]);

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => 
                        <ContainerPurple>
                            <Text style={[styles.title,{ color: "#ddd"}]}>Mes TodoLists</Text>
                            {
                                loading ?
                                <ActivityIndicator color="#999999" size="large"/>
                                :
                                <FlatList 
                                    style={{width: "70%", maxHeight: 500}}
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
                                        />
                                    }
                                />
                            }
                            <Input
                                style={{backgroundColor: "#5450d6", marginTop: 20, bottom: 100, position: 'absolute'}}
                                onPress={createTaskListsFct}
                                text={text}
                                onChangeText={setText}
                                purple
                                placeholder="Nouvelle TodoList"
                            />
                        </ContainerPurple>
                    }
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}