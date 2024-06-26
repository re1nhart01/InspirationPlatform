import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, RefreshControl, FlatList} from 'react-native';
import { apiURL } from '../redux/actions';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import { St } from '../Styles/StylesTwo';
import { images } from '../assets/images';
import { fontSizeDP, mockupWidthToDP } from '../Parts/utils';
import { Requests } from '../Types/Models';
import { UserListItem } from './segments/UserListItem';

type IProps = {
  onRefresh(): void;
  refresh: boolean;
  onBackBtn(): void;
  data: Requests[];
  params: { userId: string; listType: number };
  onFollowingItemPress(ownerId: string): void;
  isMe: string | null;
};

const FollowingListComponent = (state: IProps) => {
  const renderList = () => {
    return state.data.map((el, index) => {

    });
  };

  const renderItem = ({ item, index }: { item: Requests, index: number }) => {
    const body = {
      ...item,
      index: index,
      isMe: state.isMe as string,
      params: state.params,
      onFollowingItemPress: state.onFollowingItemPress,
      showButtons: true,
    }
    return <UserListItem key={index} {...body}   />
  }

  if (state.data.length > 0) {
    return (
      <View style={[StylesOne.screenContainer]}>
        <View style={[StylesOne.w100, MP.ph25]}>
          <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
            <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
              <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
            </TouchableOpacity>
            <Text style={StylesOne.CheckBox_text}>{state.params.listType === 1 ? 'Following' : 'Followers'}</Text>
            <View />
          </View>
        </View>
        <FlatList
          data={state.data}
          renderItem={renderItem}
        />
      </View>
    );
  }
  return (
    <View
      style={[StylesOne.screenContainer, MP.ph25]}
    >
      <View style={[StylesOne.w100]}>
        <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, StylesOne.flex_ai_c, MP.mv20]}>
          <TouchableOpacity onPress={state.onBackBtn} style={StylesOne.image24}>
            <Image style={[StylesOne.wh100, StylesOne.rm_c, St.blackArrow]} source={images.arrowLeft} />
          </TouchableOpacity>
          <Text style={StylesOne.CheckBox_text}>{state.params.listType === 1 ? 'Following' : 'Followers'}</Text>
          <View />
        </View>
        <View>
          <Text style={{ color: 'black' }}>No {state.params.listType === 1 ? 'Following' : 'Followers'}</Text>
        </View>
      </View>
    </View>
  );
};

export default FollowingListComponent;
