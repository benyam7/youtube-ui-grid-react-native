import React, {FunctionComponent} from 'react'
import {Text, View} from "react-native";
import * as Animatable from "react-native-animatable";

export const Tooltip: FunctionComponent<{ message: string, position: { top: number, left: number } }> = (props) => {
    const {message, position: {top, left}} = props
    return (
        <View
            style={{backgroundColor: 'black', position: 'absolute', top: top, left: left, borderRadius: 2, padding: 1,}}>
            <Animatable.Text style={{textAlign: 'center', color: 'white'}}>{message}</Animatable.Text>
        </View>
    )
}
