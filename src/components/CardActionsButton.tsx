import React, {FunctionComponent} from 'react';
import {Pressable, Text, View} from "react-native";

const CardActionsButton: FunctionComponent<{title: string, children: any}> = (props) => {
    const {title, children} = props

    return (
        <Pressable>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f1eeee',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                {children}
                <View style={{marginRight: 2, marginLeft: 2}}></View>
                <Text style={{fontSize: 12, color: 'gray'}}>{title}</Text>
            </View>
        </Pressable>
    )
}

export default CardActionsButton;
