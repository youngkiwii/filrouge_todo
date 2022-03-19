import React from 'react'
import { Pressable, Text } from 'react-native'
import { styles } from './styles'

export function CustomButton (props) {

    return (
        <Pressable style={[props.outline ? styles.btnOutline : styles.button, props.style]} onPress={props.onPress}>
            <Text style={props.outline ? {color: 'midnightblue'} : {color: 'white'}}>{props.text}</Text>
        </Pressable>
    );
}