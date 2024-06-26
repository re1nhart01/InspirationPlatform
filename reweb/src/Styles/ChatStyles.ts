import { StyleSheet } from 'react-native';
import {DEVICE_WIDTH, mockupHeightToDP} from '../Parts/utils';
import { colors } from '../Parts/colors';

export const chatStyles = StyleSheet.create({
  chatHeader: {
    width: '100%',
    height: mockupHeightToDP(50),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.WhiteChalk,
  },
  chatContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F7F7FF',
  },
  chatInput: {
    width: "100%",
    maxWidth: DEVICE_WIDTH,
    minHeight: mockupHeightToDP(55),
    borderTopWidth: 0.5,
    borderTopColor: colors.WhiteChalk,
  },

  ChatPreloader: { height: mockupHeightToDP(50), backgroundColor: 'rgba(0,0,0,0.4)', top: mockupHeightToDP(50), zIndex: 999 }
});
