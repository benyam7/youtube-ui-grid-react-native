import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react';
import {FlatList, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useInfiniteQuery} from "react-query";
import {youtubeApi} from "../api";
import moment from "moment";
import ThumbnailCard from "../components/ThumbnailCard";
import * as Animatable from "react-native-animatable";
import useHover from "../util/useHover";

const Home = () => {
    const {
        isLoading,
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery('programming_videos', youtubeApi.getProgrammingVideos,

        {
            getNextPageParam: lastPage => {
                if (lastPage.nextPageToken !== null) {
                    return lastPage.nextPageToken
                }
                return lastPage;
            }
        }
    );

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    }

    const renderLoading = () => {
        return (<Text>Loading...</Text>)
    }


    return (

        isLoading ? (
            <Text>Loading...</Text>
        ) : <RenderPlatformSpecificComponents data={data} loadMore={loadMore}
                                              isFetchingNextPage={isFetchingNextPage} renderLoading={renderLoading}/>


    )
        ;
};

const RenderThumbnailCardWeb = (props) => {
    const {item: {snippet}, index} = props

    const {
        publishedAt,
        title,
        liveBroadcastContent,
        thumbnails,
        channelTitle,
    } = snippet
    const [year, month, day] = publishedAt.split('-')
    const relativeTime = moment([year, month, day]).startOf('hour').fromNow()
    const [scale, setScale] = useState({scaleX: 1, scaleY: 1})
    const [zIndex, setZIndex] = useState(0)
    const [bgColor, setBgColor] = useState('rgba(248,249,248,255)')
    const [shadowProp, setShadowProps] = useState({
        shadowColor: '#fff',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 0
    })

    const nodes = []
    const [thumbImageRef, isHoveringOnThumbImage] = useHover()
    const [thumbnailCardRef, isHoveringOnThumbnailCard] = useHover()
    const [isZoomedIn, setIsZoomedIn] = useState(false)

    let style = {
        scaleX: scale.scaleX,
        scaleY: scale.scaleY,
        zIndex: zIndex,
        backgroundColor: bgColor,
        ...shadowProp
    }

    useEffect(() => {
        if (isHoveringOnThumbImage) {
            console.log("nodes", nodes)
            nodes.push(thumbImageRef)
            // do not just play the anim for every hover, only when spending atleast 1 second on the image
            if (nodes.length > 0 && nodes[0] === thumbImageRef) {
                setScale({scaleX: 1.2, scaleY: 1.2})
                setZIndex(100)
                setIsZoomedIn(true)

                setBgColor('rgba(255,255,255,1)')

            }

        }



    }, [isHoveringOnThumbImage])


    return (
        <Animatable.View
            key={`${index}`}
            onMouseEnter={() => {
                setShadowProps({
                    shadowColor: '#171717',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.32,
                    shadowRadius: 5.46,
                })
            }}
            onMouseLeave={() => {
                // do not just play the anim for every hover, only when spending atleast 1 second on the image
                if (nodes.length > 0) {
                console.log("goin out")
                nodes.pop()
                }

                console.log("nodes", nodes)
                setScale({scaleX: 1, scaleY: 1})
                setZIndex(0)
                setIsZoomedIn(false)
                setBgColor('rgba(248,249,248,255)')
                setShadowProps({
                    shadowColor: '#fff',
                    shadowOffset: {width: 0, height: 0},
                    shadowOpacity: 0,
                    shadowRadius: 0
                })

            }}
            duration={100}
            transition={["scaleX", "scaleY", "zIndex", "backgroundColor", "shadowOpacity", "shadowOffset", "shadowColor", "shadowRadius"]}
            delay={1000}
            style={{...style, ...{zIndex}, margin: 10,}}

        >
            <ThumbnailCard key={`${index}`} videoProps={
                {
                    thumbnailUri: thumbnails.high.url, /*change this for mobile devices*/
                    channelImageUri: thumbnails.default.url,
                    title: title,
                    channelName: channelTitle,
                    views: 997,
                    relativeTime,
                    isLive: liveBroadcastContent === "live",
                    watching: 400,
                    timeLength: "9:20"
                }
            } thumbImageHover={{isHoveringOnThumbImage, thumbImageRef}}
                           cardHover={{isHovering: isHoveringOnThumbnailCard, thumbnailCardRef: thumbnailCardRef}}
                           isZoomedIn={isZoomedIn}/>

        </Animatable.View>
    )
}

const renderThumbnailCardMobile = ({item}) => {
    const {
        publishedAt,
        title,
        liveBroadcastContent,
        thumbnails,
        channelTitle,
    } = item.snippet
    const [year, month, day] = publishedAt.split('-')
    const relativeTime = moment([year, month, day]).startOf('hour').fromNow()
    return (
        <ThumbnailCard videoProps={
            {
                thumbnailUri: thumbnails.high.url, /*change this for mobile devices*/
                channelImageUri: thumbnails.default.url,
                title: title,
                channelName: channelTitle,
                views: 997,
                relativeTime,
                isLive: liveBroadcastContent === "live",
                watching: 400,
                timeLength: "9:20"
            }
        } thumbImageHover={{thumbImageHover: {isHoveringOnThumbImage: false, thumbImageRef: null}}}
                       cardHover={{isHoveringOnThumbnailCard: false, thumbnailCardRef: null}}
        />
    )
}

const RenderForWeb: FunctionComponent<{ data: any }> = (props) => {
    const {data} = props
    return (
        <View style={styles.webAppContainer}>
            {data?.pages?.map(page => page.items).flat().map((item, index) => <RenderThumbnailCardWeb item={item}
                                                                                                      index={index}/>)}
        </View>
    )

}
const RenderForMobile: FunctionComponent<{ data: any, loadMore: () => void, isFetchingNextPage: boolean, renderLoading: () => void }> = (props) => {
    const {data, loadMore, isFetchingNextPage, renderLoading} = props
    return (
        <SafeAreaView style={styles.mobileAppContainer}>
            <FlatList data={
                data.pages.map(e => e.items).flat()
            }
                      renderItem={renderThumbnailCardMobile}
                      keyExtractor={(item, index) => index.toString()}
                      onEndReached={loadMore}
                      onEndReachedThreshold={0.5}
                      ListFooterComponent={isFetchingNextPage ? renderLoading : null}
            />
        </SafeAreaView>)
}

const RenderPlatformSpecificComponents: FunctionComponent<{ data: any, loadMore: () => void, isFetchingNextPage: boolean, renderLoading: () => void }> = (props) => {
    const {data, loadMore, isFetchingNextPage, renderLoading} = props

    return Platform.OS === 'web' ? <RenderForWeb data={data}/> :
        <RenderForMobile data={data} loadMore={loadMore} isFetchingNextPage={isFetchingNextPage}
                         renderLoading={renderLoading}

        />
}

const styles = StyleSheet.create({
    webAppContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(248,249,248,255)',
    },
    mobileAppContainer: {
        flex: 1,
        alignItems: 'stretch',
    }
})
export default Home;
