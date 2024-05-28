import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { colors } from '../../../Parts/colors';
import { mockupHeightToDP, DEVICE_WIDTH, DEVICE_HEIGHT } from '../../../Parts/utils';
import { apiURL } from '../../../redux/actions';
import { StylesOne } from '../../../Styles/StylesOne';

export interface Asset {
  base64?: string;
  uri?: string;
  width?: number;
  height?: number;
  originalPath?: string;
  fileSize?: number;
  type?: string;
  fileName?: string;
  duration?: number;
  bitrate?: number;
  timestamp?: string;
  id?: string;
}

type IProps = {
  assets: Asset[]
  isUpdate: number;
  onMomentumScrollEnd?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
};

type IState = {
  isLoading: boolean;
  ref: React.RefObject<ScrollView>;
  isUpdate: number;
  imageSrc: any | null;
};

function FSCarouselComponent(props: IProps): JSX.Element {
  const [getState, setState] = useState<IState>({
    isLoading: false,
    ref: React.createRef<ScrollView>(),
    isUpdate: props.isUpdate,
    imageSrc: [],
  });

  const onLoadStart = () => {
    setState({ ...getState, isLoading: true });
  };

  const onLoad = () => {

  };

  useEffect(() => {
   props.assets?.forEach((file: any) => {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log("e.target?.result zxc");
          setState({ ...getState, imageSrc: [...getState.imageSrc, e.target?.result] })
        };
        reader.readAsDataURL(file);
      }
    })
  }, [props.assets]);


  useEffect(() => {
    console.log(getState.imageSrc)
  }, [getState.imageSrc]);

  const onLoadEnd = () => {
    setState({ ...getState, isLoading: false });
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onMomentumScrollEnd && props.onMomentumScrollEnd(event)
  }

  useEffect(() => {
    setState({...getState, isUpdate: getState.isUpdate + 1})
  }, [props.isUpdate])

  const renderList = () => {
    const result = [];

    for (let i = 0; i < getState.imageSrc; i++) {
      result.push(
          <View key={i} style={[StylesOne.wImageCarousel]}>
            {getState.isLoading && (
                <View style={[StylesOne.wh100, StylesOne.flexCenter, StylesOne.absolute]}>
                  <ActivityIndicator size={75} color={colors.Primary_Red}/>
                </View>
            )}
            <Image
                onLoadStart={onLoadStart}
                onLoad={onLoad}
                onLoadEnd={onLoadEnd}
                style={[{ width: 400, height: 400, backgroundColor: 'yellow' }, {resizeMode: 'cover'}]}
                source={{ uri: getState.imageSrc[i] }}
            />
          </View>
      );
    }
    return result;
  };


  if (getState.imageSrc.length <= 0) {
    return (<></>)
  }

  return (
    <View style={[{ height: mockupHeightToDP(500), width: 500 }, StylesOne.flex1, StylesOne.flexCenter, {backgroundColor: colors.Primary_Red}]}>
      <ScrollView
        scrollEventThrottle={20}
        bounces={true}
        scrollEnabled={true}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={getState.ref}
        horizontal
      >
        {renderList()}
      </ScrollView>
    </View>
  );
}

export { FSCarouselComponent };
