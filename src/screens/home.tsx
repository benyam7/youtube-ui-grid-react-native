import * as React from 'react';
import ThumbnailCard, {ThumbnailCardProps} from "../components/ThumbnailCard";
import {FlatList, StyleSheet, Text} from "react-native";
import {useInfiniteQuery} from "react-query";
import {gamesApi} from "../api";
import {useEffect} from "react";

const testThumbnailCardData: ThumbnailCardProps[] = []
const populateArray = () => {
    for (let i = 0; i < 10; i++) {
        testThumbnailCardData.push({
            views: 999,
            isLive: i % 2 === 0,
            relativeTime: "2 hours ago",
            channelName: "Fox News",
            title: "$60,000 in a weekend!",
            timeLength: "5: 10 : 10",
            channelImageUri: "",
            thumbnailUri: "",
            checkMarkUri: "",
            watching: 994,
        })
    }
}
populateArray()

const Home = () => {

    const {
        isLoading,
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isPreviousData
    } = useInfiniteQuery('games', gamesApi.fetchAllGames, {
        getNextPageParam: lastPage => {
            if (lastPage.next !== null) {
                return lastPage.next
            }
            return lastPage;
        }
    });


   useEffect(() => {
       if(hasNextPage,){
           fetchNextPage();
       }
   }, [data])

    const renderTestData = ({item}) => {
        return (<><Text>{item.name}</Text></>)
    }

    const renderLoading = () => {
        return (<Text>Loading...</Text>)
    }
    return (
        isLoading ? (
            <Text>Loading...</Text>
        ) : <FlatList data={data.pages.map(page => page.results).flat()} renderItem={renderTestData}
                      keyExtractor={(item, index) => index.toString()} onEndReached={fetchNextPage} onEndReachedThreshold={0}
                      ListFooterComponent={isFetchingNextPage ? renderLoading : null}/>

        // <SafeAreaView style={styles.appContainer}>
        //     <List/>
        // </SafeAreaView>

    )
        ;
};
const renderItem = ({item}: { item: ThumbnailCardProps }) => {
    return (<ThumbnailCard videoProps={item}/>)
}


const List = () => {
    //use Flatlist for mobile(ios and android) and idk find something for web.
    return (
        <FlatList data={testThumbnailCardData} renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}/>

    )
}
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
