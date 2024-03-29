import { StyleSheet } from 'react-native';
import {DEVICE_WIDTH, fontSizeDP, mockupHeightToDP, mockupWidthToDP} from '../Parts/utils';
import { colors } from '../Parts/colors';

export const SThree = StyleSheet.create({
  ListItemText: {
    fontSize: fontSizeDP(14),
    fontFamily: 'Metropolis-Medium',
    fontWeight: '400',
    color: colors.fontDarkness,
    marginLeft: mockupWidthToDP(12),
  },
  post_caption: {
    fontSize: fontSizeDP(22),
    color: colors.Dark,
    paddingLeft: mockupWidthToDP(5),
    marginTop: mockupHeightToDP(15),
  },

  post_caption_expanded: {
    fontSize: fontSizeDP(22),
    color: colors.classicBlack,
    paddingLeft: mockupWidthToDP(10),
    marginTop: mockupHeightToDP(5),
  },

  post_caption_word: {
    fontSize: fontSizeDP(22),
    color: colors.Dark,
    paddingLeft: mockupWidthToDP(10),
    marginTop: mockupHeightToDP(15),
  },

  //Menu
  menuPostsContainer: {
    width: DEVICE_WIDTH,
    paddingBottom: mockupHeightToDP(100),
  },
});
