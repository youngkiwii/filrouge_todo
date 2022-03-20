import React from 'react'
import { Pressable, Text } from 'react-native'
import { styles } from '../styles'

// Bouton custom avec notre style
export function CustomButton (props) {

    return (
        <Pressable style={[props.outline ? styles.btnOutline : styles.button, props.style]} onPress={props.onPress}>
            <Text style={[props.outline ? {color: '#5450d6'} : {color: 'white'}, {fontWeight: 'bold', fontSize: 16}]}>{props.text}</Text>
        </Pressable>
    );
}