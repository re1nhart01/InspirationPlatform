import React, { useCallback } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { mockupHeightToDP, mockupWidthToDP } from '../../Parts/utils';
import { StylesOne } from '../../Styles/StylesOne';
import { Post } from '../../Types/Models';
import { apiURL } from '../../redux/actions';

type IProps = {
  isExpanded?: boolean;
  onPostPress?(postData: string): void;
  postData: Post;
};

//Constants
const windowWidth = Dimensions.get('window').width - mockupWidthToDP(500);
let IMAGES_PER_ROW = 8;

const UserMenuPost: React.FC<IProps> = (props: IProps): JSX.Element => {
  const dataPath = `http://${apiURL}/storage/${props.postData.owner}/posts/${
    props.postData.image.length > 0 && props.postData.data_count > 0 ? props.postData.image : props.postData.video
  }/0.png`;

  const onPostPress = () => {
    props.onPostPress && props.onPostPress(props.postData.image);
  };

    console.log(dataPath)

  const calculatedSize = (): number => {
    const size = windowWidth / IMAGES_PER_ROW;
    return size;
  };
  return (
    <TouchableOpacity
      onPress={onPostPress}
      style={{
        width: props.isExpanded ? calculatedSize() : calculatedSize(),
        aspectRatio: 4 / 4,
        marginRight: mockupWidthToDP(2),
        marginBottom: mockupHeightToDP(2),
        flex: props.isExpanded ? 1 : 1/3,
      }}
    >
      <Image style={[StylesOne.wh100]} source={{ uri: `${dataPath}` }} />
    </TouchableOpacity>
  );
};

export default UserMenuPost;
