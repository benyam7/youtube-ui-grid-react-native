import React, {FunctionComponent} from 'react'
import {Text, View} from "react-native";

export const Tooltip: FunctionComponent<{ message: string, overriddenStyles?: {}, hasBorders?: boolean, position: { top: number, left: number } }> = (props) => {
    const {overriddenStyles, hasBorders, message, position: {top, left}} = props
    const borderStyles = hasBorders ? {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#858485',
        padding: 2,
    } : {}

    const overrideStyles = overriddenStyles ? overriddenStyles : {}

    return (
        <View
            style={{
                width: 'black',
                position: 'absolute',
                top: top,
                left: left,
                padding: 1,
                zIndex: 20,
                ...borderStyles,
                ...overrideStyles
            }}>
            <Text style={{textAlign: 'center', color: 'white'}}>{message}</Text>
        </View>
    )

}
