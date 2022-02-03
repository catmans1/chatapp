import React from 'react';

import {UserContext} from '../contexts/UserContext';

const useUser = () => React.useContext(UserContext);

export default useUser;
