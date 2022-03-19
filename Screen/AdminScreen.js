import React, { useState, useEffect, useContext} from 'react'
import { View, Text, FlatList, ActivityIndicator} from 'react-native';
import { deleteUser, getUsers } from '../API/todoAPI';
import { ContainerWhite } from '../components/Container';
import { styles } from '../components/styles';
import Card from '../components/Card';
import { TokenContext } from '../Contexte/Context';

export default function AdminScreen ({navigation}) {
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteUserFct = (id) => {
        deleteUser(id,token)
        .then(json => {
            console.log(json);
            setData(data.filter(item => (item.id != id)));
            console.log("Deleted");
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if(data.length === 0){
            getUsers(token)
            .then(data => {
                setData(data);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [data])

    return (
        <ContainerWhite>
            <Text style={styles.title}>Liste des utilisateurs</Text>
            {
                loading ?
                <ActivityIndicator size="large" color="5450d6"/>
                :
                <FlatList
                    style={{width: "70%", maxHeight: 500}}
                    data={data}
                    renderItem={({item}) => <Card onPress={() => {navigation.navigate("AdminTodoLists", {username: item.username})}} delete={() => {deleteUserFct(item.id)}} style={{marginTop: 10}} text={item.username}/>}
                    keyExtractor={item => item.id}
                />
            }
        </ContainerWhite>
    )
}