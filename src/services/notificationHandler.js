import { setAppNotification } from '../modules/common/action-creators';

export default function notificationHandler(dispatch, appNotification) {
  dispatch(setAppNotification(appNotification));
}
