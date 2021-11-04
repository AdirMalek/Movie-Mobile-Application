import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../theme/Colors';

const propTypes = {
  main: PropTypes.bool,
};
const defaultProps = {
  main: false,
};
class NavBar extends React.PureComponent {
  state = {};
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.navBar}>
            <Image
              style={styles.logo}
              source={require('../assets/images/cinema.png')}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('search');
              }}>
              <Icon name={'search-outline'} size={30} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={Colors.lightGray} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  navBar: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});
NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;
export default NavBar;
