import React, { useState, useEffect, useContext} from 'react'
import { View, Text, FlatList, ActivityIndicator} from 'react-native';
import { getUsers } from '../API/todoAPI';
import { ContainerWhite } from '../components/Container';
import { styles } from '../components/styles';
import Card from '../components/Card';
import { TokenContext } from '../Contexte/Context';

export default function AdminScreen () {
    const [token, setToken] = useContext(TokenContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    renderItem={({item}) => <Card style={{marginTop: 10}} text={item.username}/>}
                    keyExtractor={item => item.id}
                />
            }
        </ContainerWhite>
    )
}