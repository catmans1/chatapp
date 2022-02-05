import 'react-native';

import {storeDraftMessage, getDraftMessage} from '../../utils/StoreUtils';

const channel = 'General';
const user = 'Sam';

describe('Store draft message', () => {
  it('should store and get correctly', async () => {
    // store
    await expect(storeDraftMessage(user, channel, 'correctly'));

    // get
    expect(getDraftMessage(user, channel)).resolves.toEqual('correctly');
  });
});
