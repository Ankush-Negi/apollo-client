import React from 'react';
import { TextField, Slider } from '../../components/index';
import { Text } from '../../components/TextField/style';
import { IMAGE_PATH_ARRAY } from '../../configs/constants';

const TextFieldDemo = () => (
  <>
    <Slider altText="Banners" banners={IMAGE_PATH_ARRAY} />
    <Text>This is a Disabled Input</Text>
    <TextField value="Disabled Input" readOnly disabled="true" />
    <Text>A Valid Input</Text>
    <TextField readOnly value="Accessible" />
    <Text>An Input with errors</Text>
    <TextField readOnly value="101" error="Could not be greater than" />
  </>
);

export default TextFieldDemo;
