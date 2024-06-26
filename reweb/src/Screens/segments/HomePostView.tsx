import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../assets/images';
import { currentUser } from '../../BLL/CurrentUserProps';
import { HomePostEntity } from '../../BLL/entity/HomePostEntity';
import { dateParser, mockupWidthToDP, mockupHeightToDP } from '../../Parts/utils';
import { apiURL } from '../../redux/actions';
import { MP } from '../../Styles/MP';
import { StylesFour } from '../../Styles/StylesFour';
import { StylesOne } from '../../Styles/StylesOne';
import { St } from '../../Styles/StylesTwo';
import { StackScreens } from '../Core/MainNavigationScreen';
import { INavigation } from '../Core/OverrideNavigation';
import { LikeButton } from './LikeButton';

type IProps = {
  entity: HomePostEntity;
  onBurgerPress(): void;
  onLikePress(postHash: string, owner: string): void;
  onCommendPress(id: string): void;
  onRepostPress(): void;
  refresh: boolean;
};

type IState = {
  url: string;
  likesData: any;
  refreshOrUpdate: number;
};

const HomePostView: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [getState, setState] = useState<IState>({
    url: '',
    likesData: null,
    refreshOrUpdate: 0,
  });
  const onPostOwnerPress = (): void => {
    const ownerId = props.entity.owner;
    if (ownerId !== void 0 && (currentUser.currentUserId !== null || currentUser.currentUserId !== void 0)) {
      if (currentUser.currentUserId === ownerId) {
        INavigation.navigate(StackScreens.MyProfile);
      } else {
        INavigation.navigate(StackScreens.UserProfile, { ownerId: ownerId });
      }
    }
  };

  const src = `http://${apiURL}/storage/${props.entity.owner}/avatar/avatar.png`;
  useMemo(() => {
    setState({ ...getState, url: `http://${apiURL}/storage/${props.entity.owner}/posts/${props.entity.image}/0.png` });
  }, [props.refresh]);

  const date = dateParser(props.entity.date_of_creation, 1);
  return (
    <View style={[MP.mb20]}>
      <View style={[StylesOne.flex_row, StylesOne.flex_jc_sb, MP.mb10]}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPostOwnerPress} style={[StylesOne.flex_row]}>
          <Image style={[StylesFour.myNewsLine_avatar]} source={{ uri: src }} />
          <View style={[StylesOne.flex_column, MP.ml5]}>
            <Text numberOfLines={1} style={[StylesFour.myNewsLine_owner]}>
              {props.entity.owner}
            </Text>
            <Text numberOfLines={1} style={[StylesFour.myNewsLine_date]}>
              {date}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[MP.mb10]}>
        <Text style={[StylesFour.myNewsLine_caption]}>{props.entity.caption}</Text>
      </View>
      <View>
        <Image style={[StylesFour.myNewsLine_img, { resizeMode: "contain" }]} source={{ uri: getState.url }} />
      </View>
      <View style={[StylesOne.flex_row, MP.mt10, MP.mb20]}>
        <LikeButton owner={props.entity.owner} postHash={props.entity.image} />
        <TouchableOpacity
          onPress={() => props.onCommendPress(props.entity.image as string)}
          style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
        >
          <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.commend} />
          <Text style={{ color: 'black' }}>{/** Counter here */}</Text>
        </TouchableOpacity>
      </View>
      <View style={St.horizontalLine} />
    </View>
  );
};

export { HomePostView };
