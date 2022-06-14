import React, {FunctionComponent} from "react";
import {Text, View} from "react-native";

const TimeLengthIndicator: FunctionComponent<{ timeLength: string }> = (props) => {
    const {timeLength} = props
    return (

        <View
            style={{
                backgroundColor: 'black',
                position: 'absolute',
                top: 165,
                left: 325,
                padding: 1,
            }}>
            <View style={{maxWidth: 100, flex: 1}}>
                <Text style={{textAlign: 'center', color: 'white',}}>{timeLength}</Text>
            </View>
        </View>
    )
}

export default TimeLengthIndicator
