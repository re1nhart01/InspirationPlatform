import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StylesOne } from '../Styles/StylesOne';
import { MP } from '../Styles/MP';
import { St } from '../Styles/StylesTwo';
import { images } from '../assets/images';
import { colors } from '../Parts/colors';
import { Asset } from '../Types/Models';
import { useDispatch } from 'react-redux';
import { actionImpl } from '../redux/actions';
import BaseButton from './segments/BaseButton';
import { FSCarouselComponent } from './segments/Carousel/FSCarouselComponent';
import { HeaderSegment } from './segments/Header/HeaderSegment';
import { LabelView } from './segments/LabelView';
import { StylesFour } from '../Styles/StylesFour';

type IProps = {};

type IState = {
  caption: string;
  btnDisabled: boolean;
  files: File[];
  isUpdate: number;
  labelText: string;
};

const AddComponent: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const type = 2;
  const [getState, setState] = useState<IState>({
    caption: '',
    btnDisabled: true,
    files: [],
    isUpdate: 0,
    labelText: '',
  });
  //owner, like_id from token on server

  const validatePhotos = (assets: any[]): number => {
    let nonPhotos = 0;
    console.log(assets)
    // @ts-ignore
    for (let [index, asset] of assets.entries()) {
      if (!asset.type?.includes('image')) {
        nonPhotos++;
        assets.splice(index, 1);
      }
    }
    return nonPhotos;
  };

  const handleFileChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null || !event.target.files.length) return;
    const arr = Array.from(event.target.files);
    const nonIndex = validatePhotos(arr);
    if (nonIndex !== 0) {
          alert('Warning! You push non photos to a post, and it was removed');
        }
    let listLength = `${arr?.length} of ${arr?.length}`;
    console.log(arr)
    setState({ ...getState, btnDisabled: false, files: arr, isUpdate: getState.isUpdate + 1, labelText: listLength });
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;
    let selected = Math.round(contentOffset / viewSize);
    setState({ ...getState, labelText: `${selected + 1} of ${getState.files.length}` });
  };

  const onPostAdd = () => {
    dispatch(actionImpl.addPost(getState.caption, getState.files as Asset[], type));
    setState({ ...getState, btnDisabled: true, caption: '', files: [], labelText: '' });
  };

  return (
    <View style={[StylesOne.screenContainer]}>
      <HeaderSegment headerTitle="New Post" />
      <ScrollView style={[StylesOne.inputContainer, MP.mt20, MP.mb100]}>
        <View style={[StylesOne.w100, MP.mb10]}>
          <LabelView
            defaultText={getState.labelText}
            styles={{ text: [StylesFour.headerCarouselText, { color: 'black' }], container: [StylesOne.flexCenter] }}
          />
        </View>
        <View style={[StylesOne.w100, StylesOne.flex_jc_sb, StylesOne.flex_row, { overflow: "scroll" }]}>
          {
            getState.files.map((el) => {
              return <img style={{ width: 500, height: 500, objectFit: "contain", marginRight: 15 }} src={URL.createObjectURL(el)} alt=""/>
            })
          }
        </View>
        <View style={[MP.mv20, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c]}>
          <input onChange={handleFileChange} type="file" multiple id="files" name="files" />

        </View>
        <View style={[MP.ph15]}>
        <TextInput
          placeholder="Caption"
          multiline
          maxLength={2000}
          value={getState.caption}
          placeholderTextColor={colors.Placeholder}
          underlineColorAndroid={colors.Underline_rgba_black}
          style={[StylesOne.fontInputText_black]}
          onChangeText={(val) => setState({ ...getState, caption: val })}
        />
</View>
        <View style={[MP.mt50, StylesOne.flex_row, StylesOne.flex_ai_c, StylesOne.flex_jc_c, MP.mb20]}>
          <BaseButton disabled={getState.btnDisabled} icon={images.arrowRight} onPress={onPostAdd} title={'Add Post'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddComponent;
