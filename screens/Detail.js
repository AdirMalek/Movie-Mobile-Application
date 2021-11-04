import React, {Fragment, useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
  Pressable,
} from 'react-native';
import {getMovie} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import VideoPlayer from 'react-native-video-controls';
import Video from '../components/Video';

const placeHolderImage = require('../assets/images/film-clip-black-silhouette-icon-vector-20326033.jpeg');
const height = Dimensions.get('screen').height;
const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);
  const videoShowen = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        'https://image.tmdb.org/t/p/w500' +
                        movieDetail.poster_path,
                    }
                  : placeHolderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShowen} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                fullStarColor={'gold'}
                starSize={30}
                maxStars={5}
                rating={movieDetail.vote_average / 2}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            visible={modalVisible}
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide">
            <View style={styles.videoModal}>
              <Video onClose={videoShowen} />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 1.9,
  },
  movieTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  overview: {
    padding: 10,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Detail;
