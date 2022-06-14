import React, {FunctionComponent} from "react";
import {StyleSheet, Text, View} from "react-native";

const PostedVideoDetails: FunctionComponent<{ views: number, relativeTime: string }> = (props) => {
    const {views, relativeTime} = props
    return (
        <View style={styles.postedVideoDetailsContainer}>
            <Text style={{color: '#bcbdbd'}}>{`${views}K views`}</Text>
            <Text style={{color: '#bcbdbd', marginLeft: 5}}>• {relativeTime}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    postedVideoDetailsContainer: {flexDirection: "row", justifyContent: 'flex-start'},
})

export default PostedVideoDetails
