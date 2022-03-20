import React, { useContext, useState, useEffect} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'
import { TokenContext } from '../Contexte/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {G, Circle} from 'react-native-svg';
import DonutChart from './UI/DonutChart';
import { tasks } from '../API/todoAPI';

// Card pour les TodoList
export default function TodoListCard (props) {
    const [token, setToken] = useContext(TokenContext);
    const [percent, setPercent] = useState(0);

    // Calcule la progression de la TodoList
    useEffect(() => {
        tasks(props.username, props.item.id, token)
        .then(value => {
            if(value.length !== 0)
                setPercent((value.filter(item => item.done).length / value.length) * 100);
        })
        .catch(err => {
            console.log(err);
        });
    }, [props.data])

    return (
        <View style={[style.card, props.style]}>
            <Text style={{fontWeight: 'bold', paddingVertical: 30, color: '#ddd'}} onPress={props.onPress}>{props.text}</Text>
            <DonutChart percentage={percent}/>
            <TouchableOpacity onPress={props.delete}>
                <Icon color="#ddd" size={20} name="times"/>
            </TouchableOpacity>
        </View>
    );
}

// Style
const style = StyleSheet.create({
    card: {
        borderRadius: 25,
        padding: 15,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5450d6'
    },
    bin: {
        height: 30,
        width: 30,
    }
});