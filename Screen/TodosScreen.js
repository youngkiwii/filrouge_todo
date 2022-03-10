import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Text, View } from 'react-native'
import { styles } from '../components/styles'
import { TokenContext, UsernameContext } from '../Contexte/Context'
import Input from '../components/UI/Input'
import TaskCard from '../components/TaskCard'

import { createTask, tasks } from '../API/todoAPI'

export default function TodosScreen ({ route, navigation }) {
    const [username, setUsername] = useContext(UsernameContext);
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [text, setText] = useState(null);

    useEffect(() => {
        if (data.length == 0) {
            tasks(route.params.id, token)
            .then(taskLists => {
                const result = taskLists.tasks.filter(item => item.belongsTo != null);
                setData(result);
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
                                    createTask(text, route.params.id, token)
                                    .then(response => {
                                        setData([...data, ...response.tasks]);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                                }}
                                text={text}
                                onChangeText={setText}
                                data={data}
                                placeholder="Nouvelle Tâche"
                            />
                            <Text style={styles.title}>Liste des tâches</Text>
                            <Text style={styles.subtitle}>{route.params.todolist}</Text>
                            <FlatList 
                                style={{width: "70%"}}
                                data={data}
                                keyExtractor={(item) => item.id}
                                renderItem={({item}) => <TaskCard id={item.id} data={data} setData={setData} style={{marginTop: 10}} text={item.content}/>}
                            />
                        </View>
                    }
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}