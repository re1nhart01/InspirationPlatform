import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { St } from '../../Styles/StylesTwo';
import { safeAreaInsetsTop, StylesOne } from '../../Styles/StylesOne';
import { Post } from '../../Types/Models';
import { actionImpl, apiURL } from '../../redux/actions';
import { images } from '../../assets/images';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { DEVICE_WIDTH, mockupHeightToDP, mockupWidthToDP } from '../../Parts/utils';
import { useDispatch, useSelector } from 'react-redux';
import { SThree } from '../../Styles/StylesThree';
import { MP } from '../../Styles/MP';
import { LikeButton } from './LikeButton';
import { HomePostEntity } from '../../BLL/entity/HomePostEntity';
import { SingleCarouselComponent } from './Carousel/SingleCarouselComponent';
import { ImageStyles } from '../../Styles/Images';
import { StylesFour } from '../../Styles/StylesFour';
import { LabelView } from './LabelView';
import { ActionTypes } from '../../redux/types/ActionTypes';
import axios from 'axios';
import { currentUser } from '../../BLL/CurrentUserProps';
import { StackScreens } from '../Core/MainNavigationScreen';
import { INavigation } from '../Core/OverrideNavigation';

type myPostProps = {
  index: number;
  isMe: boolean;
  onCommendPress(hash: string): void;
  onRepostPress(): void;
  setReload?(value: number): void;
  onLikePress?(post_hash: string, owner: string): void;
  entity: HomePostEntity
  makeRequest(): void;
};

type IState = {
  showModal: boolean;
  index: number;
  longPressed: boolean;

  labelText: string;
  refreshOrUpdate: number;
};

const MyPost = (props: myPostProps) => {
  const dispatch = useDispatch();
  const dataPath = `http://${apiURL}/storage/${props.entity.owner}/posts/${props.entity.image.length > 0 && props.entity.data_count > 0 ? props.entity.image : props.entity.video}/`;
  const postData = {
    data_count: props.entity.data_count,
        owner: props.entity.owner,
        post_hash: props.entity.image,
  };
  const [getState, setState] = useState<IState>({
    showModal: false,
    index: -1,
    longPressed: false,
    labelText: `1 of ${props.entity.data_count}`,
    refreshOrUpdate: 0,
  });
  const state: any = useSelector<any>((state) => state.postDelete);
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };




  const showModal = () => {
    setState({ ...getState, showModal: true, index: props.index });
  };

  const hideModal = () => {
    setState({ ...getState, showModal: false, index: -1 });
  };



  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    let selected = Math.round(contentOffset / viewSize);
    setState({ ...getState, labelText: `${selected + 1} of ${props.entity.data_count}` });
  };

  const onAlertDeletePost = useCallback(() => {
    dispatch(actionImpl.deletePost(props.entity.image, props.entity.owner));
    props.setReload!(2);
    props.makeRequest();
  }, [props.entity.image, props.entity.owner]);

  const onPostDelete = useCallback(() => {
    const isConfirmed = window.confirm("Warning, would you want to remove file?");
    if (isConfirmed) {
      onAlertDeletePost?.();
    }
  }, [onAlertDeletePost]);


  useEffect(() => {
    if (state?.statusCode !== void 0) {
      if (state?.statusCode === 200 && getState.index === props.index) {
        setState({ ...getState, showModal: false, index: -1 });
        alert('Accepted, Post was delete successfully');
        dispatch(actionImpl.getMe());
      }
      if (state.statusCode === 423 && getState.index === props.index) {
        alert('Error!, Something went wrong');
      }
      if (state.statusCode === 0 && getState.index === props.index) {
        return;
      }
    }
  }, [state]);
  return (
    <View key={props.index} style={[St.postListItem, St.zIndex2]}>
      <TouchableOpacity onPress={showModal} key={props.index} style={St.image100}>
        <Image style={[StylesOne.wh100, St.borderImage]} source={{ uri: `${dataPath}0.png` }} />
      </TouchableOpacity>
      <Modal transparent={true} visible={getState.showModal} animationType={'fade'} style={[]}>
        <ScrollView style={[styles.modalView, { paddingTop: safeAreaInsetsTop, paddingBottom: 200 }]}>
          <View style={[StylesOne.w100, StylesOne.flex_row, StylesOne.flex_ai_c, MP.pv15]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={hideModal}
              style={[StylesOne.minWidth15, StylesOne.h100, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_fs, MP.pl15]}
            >
              <View>
                <Image style={[ImageStyles.imageDoubleAvatar, ImageStyles.tintColorWhite]} source={images.arrowLeft} />
              </View>
            </TouchableOpacity>
            <View style={[StylesOne.width70, StylesOne.flex_row, StylesOne.flex_jc_c]}>
            </View>
            {props.isMe && <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPostDelete}
              style={[StylesOne.minWidth15, StylesOne.h100, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_fs, MP.pl15]}
            >
              <View>
                <Image style={[ImageStyles.imageDoubleAvatar, ImageStyles.tintColorWhite]} source={images.burger} />
              </View>
            </TouchableOpacity>}
          </View>
          <View style={[StylesOne.flex1, StylesOne.flexCenter]}>
            <SingleCarouselComponent onMomentumScrollEnd={onMomentumScrollEnd} carouselData={postData} />
          </View>
          <View>
            <Text style={[StylesOne.post_date]}>{new Date(props.entity.date_of_creation).toLocaleDateString("en-US", dateOptions as any)} at {new Date(props.entity.date_of_creation).toLocaleTimeString("en-GB")}</Text>
          </View>
          <View style={[StylesOne.flex_row, MP.mt10, MP.mb20]}>
            <LikeButton owner={props.entity.owner} textColor={'white'} postHash={props.entity.image as string} />
            <TouchableOpacity
              onPress={() => { props.onCommendPress(props.entity.image); hideModal() }}
              style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}
            >
              <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.commend} />
              <Text style={{ color: 'white' }}></Text>
            </TouchableOpacity>
            {/*<TouchableOpacity*/}
            {/*  onPress={props.onRepostPress}*/}
            {/*  style={[{ width: mockupWidthToDP(40), height: mockupHeightToDP(30) }, StylesOne.flex_row, StylesOne.flex_ai_c, MP.mr20]}*/}
            {/*>*/}
            {/*  <Image style={[StylesOne.wh100, StylesOne.rm_c]} source={images.repost} />*/}
            {/*</TouchableOpacity>*/}
          </View>
          <View style={[StylesOne.flex_row, StylesOne.flex_jc_fs, StylesOne.w100, MP.ph15]}>
            <Text selectable style={[SThree.post_caption, { color: 'white' }]}>{props.entity.caption}</Text>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default MyPost;
