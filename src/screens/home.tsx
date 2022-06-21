import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react';
import {FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
            console.log("fetching next page")
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

const renderThumbnailCardWeb = ({snippet, id: {videoId}}) => {
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
    const [boxShadow, setBoxShadow] = useState("none")
    const nodes = []
    const [thumbImageRef, isHoveringOnThumbImage] = useHover()
    const [thumbnailCardRef, isHoveringOnThumbnailCard] = useHover()
    const [isZoomedIn, setIsZoomedIn] = useState(false)

    let style = {
        scaleX: scale.scaleX,
        scaleY: scale.scaleY,
        zIndex: zIndex,
        boxShadow: boxShadow

    }

    useEffect( () => {
        if (isHoveringOnThumbImage) {
            nodes.push(thumbImageRef)
            // do not just play the anim for every hover, only when spending atleast 1 second on the image
            if (nodes.length > 0 && nodes[0] === thumbImageRef) {
                setScale({scaleX: 1.2, scaleY: 1.2})
                setIsZoomedIn(true)
            }
            setZIndex(100)
        }




    }, [isHoveringOnThumbImage])


    return (
        <TouchableOpacity key={videoId} ref={thumbnailCardRef}
                          onMouseEnter={() => {
                              setBoxShadow(`4.0px 8.0px 8.0px hsl(0deg 0% 0% / 0.38)`)
                          }}
                          onMouseLeave={() => {
                              setScale({scaleX: 1, scaleY: 1})
                              setZIndex(0)
                              // do not just play the anim for every hover, only when spending atleast 1 second on the image
                              if (nodes.length > 0) {
                                  nodes.pop()
                              }
                              setBoxShadow(`0.0px 0.0px 0.0px #fff`)
                              setIsZoomedIn(false)

                          }} style={{margin: 10}}>
            <Animatable.View duration = {10} transition={["scaleX", "scaleY", "shadowOffset", "shadowOpacity", "shadowRadius"]} key={videoId} delay={1000}
                             style={style}

            >
                <ThumbnailCard key={videoId} videoProps={
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
                               cardHover={{isHovering: isHoveringOnThumbnailCard, thumbnailCardRef: thumbnailCardRef}} isZoomedIn={isZoomedIn}/>

            </Animatable.View>
        </TouchableOpacity>
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
            {data?.pages?.map(page => page.items).flat().map(item => renderThumbnailCardWeb(item))}
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
        backgroundColor: '#f8f8f9',
    },
    mobileAppContainer: {
        flex: 1,
        alignItems: 'stretch',
    }
})
export default Home;
