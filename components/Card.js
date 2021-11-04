import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const placeHolderImage = require('../assets/images/film-clip-black-silhouette-icon-vector-20326033.jpeg');
const propTypes = {
  item: PropTypes.object,
};
class Card extends React.PureComponent {
  render() {
    const {navigation, item} = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {movieId: item.id})}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            item.poster_path
              ? {uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path}
              : placeHolderImage
          }
        />
        {!item.poster_path && (
          <Text style={styles.movieName}>{item.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    fontSize: 12,
    position: 'absolute',
    width: 80,
    textAlign: 'center',
  },
});
Card.propTypes = propTypes;
export default Card;
