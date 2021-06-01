import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import {ThemeContext} from '../contexts/Theme';
import user from '../assets/user.jpg';
import Icon from 'react-native-vector-icons/Ionicons';

import one from '../assets/1.jpg';
import two from '../assets/2.jpg';
import three from '../assets/3.jpg';
import four from '../assets/4.jpg';
import five from '../assets/5.jpg';
import six from '../assets/6.jpg';
import seven from '../assets/7.jpg';
import eight from '../assets/8.jpg';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
export default function UserScreen() {
  const theme = useContext(ThemeContext);
  const styles = StyleSheet.create({
    wrapper: {
      padding: 15,
      paddingBottom: 0,
      backgroundColor: theme.background,
    },
    userInfo: {
      marginTop: 20,
      width: '100%',
      flexDirection: 'row',
    },
    userDetails: {flex: 1},
    name: {
      fontSize: 19,
      fontWeight: 'bold',
      color: theme.primary,
    },
    profession: {
      fontSize: 14,
      marginTop: 5,
      color: theme.secondary,
    },
    followBtn: {
      paddingVertical: 5,
      paddingHorizontal: 14,
      borderRadius: 50,
      borderColor: theme.primary,
      color: theme.primary,
      borderWidth: 2,
      marginTop: 10,

      alignSelf: 'flex-start',
    },
    followText: {
      color: theme.primary,
      fontSize: 13,
    },
    followInfo: {
      flexDirection: 'row',
      marginTop: 10,
    },
    followers: {},
    followersText: {
      marginRight: 10,
      fontSize: 13,
      color: theme.primary,
      fontWeight: '700',
    },
    description: {
      color: 'black',
      fontSize: 16,
      marginTop: 20,
      height: 100,
    },
    postFav: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    postFavBtn: {
      padding: 10,
      width: 100,
      height: 65,
      borderTopColor: theme.secondary,
      borderTopWidth: 1,
    },

    postFavBtnView: {
      padding: 10,
      borderTopColor: theme.secondary,
      borderTopWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    img: {width: 90, height: 90, borderRadius: 100},
    posts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    postImage: {
      marginVertical: 5,
      marginRight: 5,
      width: (width - 20) / 3 - 10,
      height: (width - 20) / 3 - 10,
      resizeMode: 'cover',
      borderRadius: 12,
    },
    favorites: {
      width: '100%',
    },
  });
  const [postType, setPostType] = useState('posts');
  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <View style={styles.userDetails}>
            <Text style={styles.name}>Ashley Hutton</Text>
            <Text style={styles.profession}>Professional Cuisine Chef</Text>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
            <View style={styles.followInfo}>
              <TouchableWithoutFeedback style={styles.followers}>
                <Text style={styles.followersText}>350 followers</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={styles.followers}>
                <Text style={styles.followersText}>45 following</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.image}>
            <Image source={user} style={styles.img} />
          </View>
        </View>

        <Text style={styles.description}>
          Cooking is a form of art I adore and practice.
        </Text>

        <View style={styles.postFav}>
          <TouchableWithoutFeedback
            style={styles.postFavBtn}
            onPress={() => setPostType('posts')}>
            <View style={styles.postFavBtnView}>
              <Icon
                name="restaurant-outline"
                size={20}
                style={styles.postFavBtnIcon}
                color={postType == 'posts' ? theme.primary : theme.secondary}
              />
              <Text
                style={{
                  ...styles.postFavText,
                  color: postType == 'posts' ? theme.primary : theme.secondary,
                }}>
                Posts
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={styles.postFavBtn}
            onPress={() => setPostType('favorites')}>
            <View style={styles.postFavBtnView}>
              <Icon
                name="heart-outline"
                size={20}
                style={styles.postFavBtnIcon}
                color={
                  postType == 'favorites' ? theme.primary : theme.secondary
                }
              />
              <Text
                style={{
                  ...styles.postFavText,
                  color:
                    postType == 'favorites' ? theme.primary : theme.secondary,
                }}>
                Favorites
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {postType == 'posts' ? (
          <View style={styles.posts}>
            {[one, two, three, four, five, six, seven, eight].map((el, idx) => (
              <TouchableWithoutFeedback style={styles.post} key={idx}>
                <Image source={el} style={styles.postImage} />
              </TouchableWithoutFeedback>
            ))}
          </View>
        ) : (
          <View style={styles.posts}>
            {[one, two, three, four].reverse().map((el, idx) => (
              <TouchableWithoutFeedback style={styles.post} key={idx}>
                <Image source={el} style={styles.postImage} />
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Item(dataItem, key) {
  const windowWidth = Dimensions.get('window').width / 2 - 30;

  const fixedHeight = 250;
  const styles = StyleSheet.create({
    card: {
      flex: 1,
      marginVertical: 10,
      width: windowWidth,
      height: fixedHeight,
    },
    img: {flex: 1, width: windowWidth, height: fixedHeight, borderRadius: 15},
    gradient: {
      position: 'absolute',
      zIndex: 999,
      width: '100%',
      height: '100%',
    },
  });
  return (
    <View
      key={key}
      style={{
        ...styles.card,
        height: dataItem.height,
      }}>
      <Image style={styles.img} resizeMode="cover" source={dataItem} />
      {/* <LinearGradient style={styles.gradient} colors={['black', 'white']} /> */}
    </View>
  );
}
