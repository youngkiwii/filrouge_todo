import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { deleteTaskById, updateTask } from '../API/todoAPI';
import { TokenContext } from '../Contexte/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Menu, MenuTrigger, MenuOption, MenuOptions } from 'react-native-popup-menu';

export default function TaskCard (props) {
    const [token, setToken] = useContext(TokenContext);
    const [done, setDone] = useState(props.item.done);

    useEffect(() => {
        setDone(props.item.done);
    }, [props.item.done]);

    return (
        <View style={[style.card, props.style]}>
            <BouncyCheckbox
                text={props.item.content}
                fillColor="#eee"
                unfillColor="#5450d6"
                style={{width: "80%"}}
                textStyle={{ fontWeight: 'bold', color: '#eee'}}
                isChecked={done}
                disableBuiltInState
                onPress={() => {
                    updateTask(props.item.id, !done, token)
                    .then(data => { })
                    .catch(err => { console.log(err); })
                    props.item.done = !done;
                    setDone(!done);
                    done ? props.changeCount(-1) : props.changeCount(1);
                }}
            />
            <Menu style={{marginLeft: 20}}>
                <MenuTrigger>
                    <Icon name="ellipsis-v" style={{width: 20, textAlign: 'center'}} size={30} color="#eee" />
                </MenuTrigger>
                 <MenuOptions optionsContainerStyle={{width: 100}}>
                        <MenuOption onSelect={() => alert(`Voir`)} text='Consulter' />
                        <MenuOption onSelect={() => alert(`Save`)} text='Modifier' />
                        <MenuOption onSelect={props.deleteTask} >
                            <Text style={{color: 'red'}}>Supprimer</Text>
                        </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    );
}

const style = StyleSheet.create({
    card: {
        borderRadius: 15,
        padding: 15,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5450d6',
    },
    bin: {
        height: 30,
        width: 30,
    }
});