import {Image, Platform, StyleSheet} from "react-native";
import React, {FunctionComponent, MutableRefObject} from "react";


const ThumbnailImage: FunctionComponent<{ thumbImageRef: boolean | MutableRefObject<null>, uri: string }> = (props) => {
    const {thumbImageRef, uri,} = props
    return (
        <Image
            ref={thumbImageRef}
            style={styles.thumbnailImage}
            source={{uri}}
        />
    )
}


const styles = StyleSheet.create({
    thumbnailImage:
        {
            width: Platform.OS === 'android' || Platform.OS === 'ios' ? "100%" : 320,
            height: 180,
            marginBottom: 20,
        }
})

export default ThumbnailImage
