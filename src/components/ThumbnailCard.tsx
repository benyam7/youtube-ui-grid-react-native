import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ThumbnailCard = () => {
        return (
            <View style={styles.wrapper}>
                <Image
                    style={styles.thumbnailImage}
                    source={require('./../../assets/sample-thumbnail.webp')}
                />
                <TimeLengthIndicator />
                <View style={styles.videoDetailsContainer}>
                    <ChannelImage/>
                    <View style={styles.videoDetails}>
                        <Text numberOfLines={2} style={{fontWeight: "bold", marginRight: 20}}>
                            title goes here title goes
                            here title goesgoes here title goesgoes here title goesgoes here title goes title goes heretitle
                            goes heretitle goes herehere title goes here
                        </Text>
                        <UploadedVideo/>
                    </View>

                </View>

            </View>
        );
    }
;
const UploadedVideo = () => {
    return (
        <>
            <View style={{padding: 0, alignItems: "center", flexDirection: "row", marginTop: 10}}>
                <Text style={{color: '#bcbdbd'}}>Channel name goes here </Text>
                <Image source={require('./../../assets/ytcheckmark.webp')}
                       style={{height: 10, width: 10}}/>
            </View>
            <View style={{flexDirection: "row", justifyContent: 'flex-start'}}>
                <Text style={{color: '#bcbdbd'}}>679k views</Text>
                <Text style={{color: '#bcbdbd', marginLeft: 5}}>• 3 hours ago</Text>
            </View>
            <LiveIndicator/>
        </>
    )
}
const ChannelImage = () => {
    return (
        <View style={styles.channelImageContainer}>
            <Image style={styles.channelImage} source={require('./../../assets/sample-thumbnail.webp')}/>
        </View>
    )
}

const LiveIndicator = () => {
    return (
        <View style={{
            width: 75,
            flexDirection: "row",
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: '#d32e2d',
            borderRadius: 5,
            marginTop: 10
        }}>
            <Text style={{flex: 1, color: '#d32e2d', textTransform: 'uppercase', textAlign: 'center'}}>
                Live Now</Text>
        </View>
    )
}

const TimeLengthIndicator = () => {
    return (
        <View style={{backgroundColor: 'black', position: 'absolute', top: 165, left: 325, borderRadius: 2, padding: 1}}>
            <Text style={{textAlign: 'center', color: 'white'}}> 5: 50: 10</Text>
        </View>
    )
}

const styles = StyleSheet.create
({
    wrapper:
        {
            width: 400,
            height: 400,
            backgroundColor: '#f8f8f9',
            margin: 10,
        }
    ,
    thumbnailImage:
        {
            flex: 1,
            marginBottom: 20
        }
    ,
    videoDetailsContainer:
        {
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start"
        },
    channelImageContainer: {
        height: 50,
        width: 50,
        borderRadius: 50,
        overflow: "hidden",
        marginRight: 25,

    },
    channelImage: {
        flex: 1
    },
    videoDetails: {
        flex: 1,

    }
})
export default ThumbnailCard;
