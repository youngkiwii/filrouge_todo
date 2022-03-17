import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Text, View, ActivityIndicator } from 'react-native'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import Input from '../components/UI/Input'
import TaskCard from '../components/TaskCard'

import { createTask, tasks } from '../API/todoAPI'
import { setStatusBarTranslucent } from 'expo-status-bar'

export default function TodosScreen ({ route, navigation }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    const changeCount = (value) => {
        setCount(count + value);
    }

    useEffect(() => {
        if (data.length == 0) {
            tasks(route.params.id, token)
            .then(taskLists => {
                const result = taskLists.tasks.filter(item => item.belongsTo != null);
                setData(result);
                setLoading(false);
            })
        }
        setCount(data.filter(item => item.done).length);
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
                                    setLoading(true);
                                    createTask(text, route.params.id, token)
                                    .then(response => {
                                        setData([...data, ...response.tasks]);
                                        setLoading(false);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                                    setText("");
                                }}
                                text={text}
                                onChangeText={setText}
                                data={data}
                                placeholder="Nouvelle Tâche"
                            />
                            <Text style={styles.title}>Liste des tâches</Text>
                            <Text style={styles.subtitle}>{route.params.todolist}</Text>
                            <Text style={[styles.subtitle, {marginTop: 10}]}>Nombre de tâches réalisées : {count}</Text>
                            <FlatList 
                                style={{width: "70%"}}
                                data={data}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => <TaskCard item={item} changeCount={changeCount} data={data} setData={setData} style={{marginTop: 10}}/>}
                                />
                                {
                                    loading ? 
                                    <ActivityIndicator color="#999999" size="large"/>
                                    :
                                    <></>
                                }
                        </View>
                    }
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}