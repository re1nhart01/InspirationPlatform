import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import { colors } from '../../../Parts/colors';
import { mockupHeightToDP, DEVICE_WIDTH } from '../../../Parts/utils';
import { apiURL } from '../../../redux/actions';
import { StylesOne } from '../../../Styles/StylesOne';
import {StylesFour} from "../../../Styles/StylesFour";

type IProps = {
  carouselData: {
    data_count: number;
    owner: string;
    post_hash: string;
  };
  onMomentumScrollEnd?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  reload?: number;
};

type IState = {
  isLoading: boolean;
  ref: React.RefObject<ScrollView>;
};

function SingleCarouselComponent(props: IProps): JSX.Element {
  const [getState, setState] = useState<IState>({
    isLoading: false,
    ref: React.createRef<ScrollView>(),
  });

  const onLoadStart = () => {
    setState({ ...getState, isLoading: true });
  };

  const onLoad = () => {};

  const onLoadEnd = () => {
    setState({ ...getState, isLoading: false });
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    props.onMomentumScrollEnd && props.onMomentumScrollEnd(event)
  }
  const renderList = () => {
    const result = [];
    for (let i = 0; i < props.carouselData.data_count; i++) {
      const dataPath = `http://${apiURL}/storage/${props.carouselData.owner}/posts/${props.carouselData.post_hash}/${i}.png?image=${props.carouselData.post_hash}`;
      result.push(
        <View key={i} style={[StylesOne.wImageCarousel]}>
          {getState.isLoading && (
            <View style={[StylesOne.wh100, StylesOne.flexCenter, StylesOne.absolute]}>
              <ActivityIndicator size={75} color={colors.Primary_Red} />
            </View>
          )}
            <Image
              style={[{ width: "100%", height: "100%", objectFit: "contain", resizeMode: 'contain' }]}
              source={{ uri: dataPath }}
            />
        </View>
      );
    }
    return result;
  };
  return (
    <View style={[{ width: DEVICE_WIDTH },StylesOne.flexCenter, {backgroundColor: colors.Dark}]}>
      <ScrollView
        style={{ paddingRight: 30, }}
        onMomentumScrollEnd={onMomentumScrollEnd}
        ref={getState.ref}
        horizontal
      >
        {renderList()}
      </ScrollView>
    </View>
  );
}

export { SingleCarouselComponent };
