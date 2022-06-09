import React, {FunctionComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export interface ThumbnailCardProps {
    thumbnailUri: string,
    channelImageUri: string,
    title: string,
    channelName: string,
    checkMarkUri?: string,
    views?: number,
    relativeTime: string,
    isLive: boolean,
    watching?: number,
    timeLength?: string
}

//not sure watching for live is the same up views. double check that on api response
const ThumbnailCard: FunctionComponent<{ videoProps: ThumbnailCardProps }> = (props) => {
        const {
            thumbnailUri,
            channelImageUri,
            title,
            channelName,
            checkMarkUri,
            views,
            relativeTime,
            isLive,
            watching,
            timeLength
        } = props.videoProps
        return (
            <View style={styles.wrapper}>
                <Image
                    style={styles.thumbnailImage}
                    source={require('./../../assets/sample-thumbnail.webp')}
                />

                {timeLength && <TimeLengthIndicator timeLength={timeLength}/>}

                <View style={styles.videoDetailsContainer}>
                    <ChannelImage/>
                    <View style={styles.videoDetails}>
                        <VideoDetails title={title} channelName={channelName} relativeTime={relativeTime} isLive={isLive}
                                      views={views} watching={watching}/>
                    </View>

                </View>

            </View>
        );
    }
;


// change soruce  attrbittue latter to uri
// const ThumbnailImage : FunctionComponent<{uri: string}> = (props) => {
//     const {uri} = props
//     console.log("uri", typeof uri)
//     return (
//
//     )
// }

interface VideoDetailsProps {
    title: string,
    channelName: string,
    checkMarkUri?: string,
    views?: number,
    relativeTime: string,
    isLive: boolean,
    watching?: number,
}

const VideoDetails: FunctionComponent<VideoDetailsProps> = (props) => {
    const {
        title,
        channelName,
        checkMarkUri,
        views,
        relativeTime,
        isLive,
        watching,
    } = props

    return (
        <View style={styles.videoDetails}>
            <Text numberOfLines={2} style={styles.title}>{title}</Text>

            <ChannelNameAndCheckMarkIndicator channelName={channelName} checkMarkUri={checkMarkUri}/>

            {/*TODO: think how u cna improve this*/}
            {
                isLive ? <LiveVideoDetails watching={watching!!}/> :
                    <PostedVideoDetails views={views!!} relativeTime={relativeTime}/>
            }
        </View>
    )
}

const PostedVideoDetails: FunctionComponent<{ views: number, relativeTime: string }> = (props) => {
    const {views, relativeTime} = props
    return (
        <View style={styles.postedVideoDetailsContainer}>
            <Text style={{color: '#bcbdbd'}}>{`${views} views`}</Text>
            <Text style={{color: '#bcbdbd', marginLeft: 5}}>• {relativeTime}</Text>
        </View>
    )
}


const LiveVideoDetails: FunctionComponent<{ watching: number }> = (props) => {
    const {watching} = props
    return (
        <>
            <Text style={{color: '#bcbdbd'}}>{watching} watching</Text>
            <LiveIndicator/>
        </>
    )
}
const ChannelNameAndCheckMarkIndicator: FunctionComponent<{ channelName: string, checkMarkUri?: string }> = (props) => {
    const {channelName, checkMarkUri} = props
    return (
        <View style={styles.channelNameAndCheckMarkContainer}>
            <Text style={{color: '#bcbdbd'}}>{channelName} </Text>
            <Image source={require('./../../assets/ytcheckmark.webp')}
                   style={{height: 10, width: 10}}/>
        </View>
    )
}
// get back to this when u have time and refactor for the uri
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

const TimeLengthIndicator: FunctionComponent<{ timeLength: string }> = (props) => {
    const {timeLength} = props
    return (
        <View
            style={{backgroundColor: 'black', position: 'absolute', top: 165, left: 325, borderRadius: 2, padding: 1,}}>
            <Text style={{textAlign: 'center', color: 'white'}}>{timeLength}</Text>
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
    },
    title: {fontWeight: "bold", marginRight: 20},
    channelNameAndCheckMarkContainer: {padding: 0, alignItems: "center", flexDirection: "row", marginTop: 10}

    , postedVideoDetailsContainer: {flexDirection: "row", justifyContent: 'flex-start'}
})
export default ThumbnailCard;
