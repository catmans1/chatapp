import React from 'react';

import {TabletContext} from '../contexts/TabletContext';

const useTablet = () => React.useContext(TabletContext);

export default useTablet;
