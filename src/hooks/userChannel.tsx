import React from 'react';

import {ChannelContext} from '../contexts/ChannelContext';

const useChannel = () => React.useContext(ChannelContext);

export default useChannel;
