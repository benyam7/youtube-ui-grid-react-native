import React, {FunctionComponent, MutableRefObject} from "react";
import {Image, StyleSheet, View} from "react-native";

const ChannelImage: FunctionComponent<{ channelImageRef: boolean | MutableRefObject<null> }> = (props) => {
    const {channelImageRef} = props

    return (
        <View style={styles.channelImageContainer}>
            <Image ref={channelImageRef} style={styles.channelImage}
                   source={require('./../../assets/sample-thumbnail.webp')}/>
        </View>
    )
}


const styles = StyleSheet.create({
    channelImageContainer: {
        height: 50,
        width: 50,
        borderRadius: 50,
        overflow: "hidden",
        marginRight: 25,

    },

    channelImage: {
        flex: 1
    }

})

export default ChannelImage
