import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from './iconsSvg';

const Icon = props => <SvgIcon {...props} svgs={svgs} />;

module.exports = Icon;
