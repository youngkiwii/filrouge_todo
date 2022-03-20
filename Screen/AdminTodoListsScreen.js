import React, {useState, useEffect, useContext} from 'react';
import {Text, FlatList, ActivityIndicator} from 'react-native';
import { styles } from '../components/styles';
import { ContainerPurple } from '../components/Container';
import { deleteTaskLists, taskLists } from '../API/todoAPI';
import { TokenContext } from '../Contexte/Context';
import TodoListCard from '../components/TodoListCard';

// Accès aux todolists des différents utilisateurs
export default function AdminTodoListsScreen ({route, navigation}) {
    const [token, setToken] = useContext(TokenContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const deleteTaskListsFct = (id) => {
        deleteTaskLists(id, token)
        .then(json => {
            setData(data.filter(item => (item.id != id)));
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setData(data);
        });

        return () => {
            return unsubscribe;
        };
    }, [navigation])

    useEffect(() => {
        if(data.length === 0){
            taskLists(route.params.username, token)
            .then(response => {
                setData(response);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
        }
    }, [data])

    return ( 
        <ContainerPurple>
            <Text style={[styles.title,{ color: "#ddd"}]}>TodoLists de {route.params.username}</Text>
            {
                loading ?
                <ActivityIndicator color="#999999" size="large"/>
                :
                <FlatList 
                    style={{width: "70%", maxHeight: 500}}
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => 
                        <TodoListCard 
                            item={item}
                            username={route.params.username}
                            data={data}
                            onPress={() => {navigation.navigate("AdminTodos", {todolist: item.title, id: item.id, username: route.params.username})}}
                            delete={() => {deleteTaskListsFct(item.id)}}
                            style={{marginTop: 10}} 
                            text={item.title}
                        />
                    }
                />
            }
        </ContainerPurple>
    )
}