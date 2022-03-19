import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Text, View, ActivityIndicator } from 'react-native'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import { taskLists } from '../API/todoAPI'
import Input from '../components/UI/Input'
import { createTaskLists, deleteTaskLists } from '../API/todoAPI'
import Card from '../components/Card'
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

    const deleteTaskListsFct = (id) => {
        deleteTaskLists(id, token)
        .then(json => {
            setData(data.filter(item => (item.id != id)));
        })
        .catch(err => {
            console.log(err);
        });
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
                                        <Card  
                                            onPress={() => {
                                                props.navigation.navigate("Todos", {id: item.id, todolist: item.title});
                                            }}
                                            delete={() => {deleteTaskListsFct(item.id)}}
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