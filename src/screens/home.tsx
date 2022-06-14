import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useInfiniteQuery} from "react-query";
import {youtubeApi} from "../api";
import moment from "moment";
import * as Animatable from 'react-native-animatable';
import useHover from "../util/useHover";
import {Tooltip} from "../components/Tooltip";
import ThumbnailCard from "../components/ThumbnailCard";
import {useMouseMove} from "../util/useMouseMove";

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

    const renderThumbnailCard = ({item}) => {
        const snippet = item.snippet
        const {
            publishedAt,
            title,
            liveBroadcastContent,
            thumbnails,
            channelTitle,
        } = snippet
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
                    timeLength: "10: 20: 20"
                }
            }/>
        )
    }

    const renderLoading = () => {
        return (<Text>Loading...</Text>)
    }


    return (

        isLoading ? (
            <Text>Loading...</Text>
        ) : <FlatList data={
            data?.pages?.map(page => page.items).flat()
        }
                      renderItem={renderThumbnailCard}
                      keyExtractor={(item, index) => index.toString()}
                      onEndReached={loadMore}
                      onEndReachedThreshold={0.5}
                      ListFooterComponent={isFetchingNextPage ? renderLoading : null}
        />

        // <SafeAreaView style={styles.appContainer}>
        //     <List/>
        // </SafeAreaView>

    )
        ;
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f9',
    }
})
export default Home;
