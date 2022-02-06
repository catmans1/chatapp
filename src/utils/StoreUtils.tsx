import AsyncStorage from '@react-native-community/async-storage';
import LogError from './LogError';

const STORAGE_DRAFT_MESSAGE = '@STORAGE_DRAFT_MESSAGE';

export function storeDraftMessage(
  user: string,
  channel: string,
  message: string,
) {
  const keyStore = STORAGE_DRAFT_MESSAGE + user + channel;
  try {
    AsyncStorage.setItem(keyStore, message);
  } catch (error) {
    LogError('STORE DRAFT MESSAGE ERROR', error);
  }
}

export async function getDraftMessage(
  user: string,
  channel: string,
): Promise<string> {
  const keyStore = STORAGE_DRAFT_MESSAGE + user + channel;
  try {
    const draft = await AsyncStorage.getItem(keyStore);
    return draft || '';
  } catch (error) {
    LogError('GET DRAFT MESSAGE ERROR', error);
    return '';
  }
}

export async function removeDraftMessage(user: string, channel: string) {
  const keyStore = STORAGE_DRAFT_MESSAGE + user + channel;
  try {
    AsyncStorage.removeItem(keyStore);
  } catch (error) {
    LogError('REMOVE DRAFT MESSAGE ERROR', error);
  }
}
