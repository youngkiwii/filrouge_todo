import React from 'react'
import { Pressable, Text } from 'react-native'
import { styles } from './styles'

export function CustomButton (props) {

    return (
        <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
            <Text>{props.text}</Text>
        </Pressable>
    );
}