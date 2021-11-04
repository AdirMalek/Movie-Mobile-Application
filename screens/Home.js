import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getFamilyMovies,
  getDocumentaryMovies,
  getPopularTV,
  getTopRatedTV,
  getFamilyTv,
  getDocumentaryTv,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import {react} from '@babel/types';
import {Fragment} from 'react';
import List from '../components/List';
import Error from '../components/Error';
const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState();
  const [popularMovies, setPopularMovies] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();
  const [familyMovies, setFamilyMovies] = useState();
  const [documentaryMovies, setDocumentaryMovies] = useState();
  const [popularTv, setPopularTv] = useState();
  const [topRatedTv, setTopRatedTv] = useState();
  const [familyTv, setFamilyTv] = useState();
  const [documentaryTv, setDocumentaryTv] = useState();

  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
      getFamilyMovies(),
      getDocumentaryMovies(),
      getPopularTV(),
      getTopRatedTV(),
      getFamilyTv(),
      getDocumentaryTv(),
    ]);
  };
  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          topRatedMoviesData,
          familyMoviesData,
          documentaryMoviesData,
          popularTvData,
          topRatedTvData,
          familyTvData,
          documentaryTvData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(
              'https://image.tmdb.org/t/p/w500' + movie.poster_path,
            );
          });
          setMoviesImages(moviesImagesArray);
          setPopularMovies(popularMoviesData);
          setTopRatedMovies(topRatedMoviesData);
          setFamilyMovies(familyMoviesData);
          setDocumentaryMovies(documentaryMoviesData);
          setPopularTv(popularTvData);
          setTopRatedTv(topRatedTvData);
          setFamilyTv(familyTvData);
          setDocumentaryTv(documentaryTvData);
          setLoaded(true);
        },
      )
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <Fragment>
      {loaded && !error && (
        <ScrollView>
          {moviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={moviesImages}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimensions.height / 1.5}
                autoplay={true}
                circleLoop={true}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Movies"
                content={popularMovies}
              />
            </View>
          )}
          {topRatedMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Top Rated Movies"
                content={topRatedMovies}
              />
            </View>
          )}
          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Movies"
                content={familyMovies}
              />
            </View>
          )}
          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Movies"
                content={documentaryMovies}
              />
            </View>
          )}
          {popularTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Popular Tv Shows"
                content={popularTv}
              />
            </View>
          )}
          {topRatedTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Top Rated Tv Shows"
                content={topRatedTv}
              />
            </View>
          )}
          {familyTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Family Tv Shows"
                content={familyTv}
              />
            </View>
          )}
          {documentaryTv && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title="Documentary Tv Shows"
                content={documentaryTv}
              />
            </View>
          )}
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
      {error && <Error />}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
