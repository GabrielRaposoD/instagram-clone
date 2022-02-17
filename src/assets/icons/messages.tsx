import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Messages = (props: SvgProps) => (
  <Svg
    data-name='messages'
    viewBox='0 0 122.88 108.3'
    color='#fafafa'
    fill='#fafafa'
    height={props.height || 24}
    width={props.width || 24}
    {...props}
  >
    <Path d='m96.14 12.47-76.71-1.1 28.3 27.85 48.41-26.75ZM53.27 49l9.88 39.17L102.1 22 53.27 49ZM117 1.6a5.59 5.59 0 0 1 4.9 8.75l-55.84 94.86a5.6 5.6 0 0 1-10.44-1.15L41.74 49 1.67 9.57A5.59 5.59 0 0 1 5.65 0L117 1.6Z' />
  </Svg>
);

export { Messages };
