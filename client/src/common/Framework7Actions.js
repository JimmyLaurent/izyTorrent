import { getFramework7 } from '../containers/AppContainer';

export const showNotification = (message) => {
    return (dispatch, getState) => {
        getFramework7().addNotification({
            message: message,
            hold: 2000
        });
    }
};