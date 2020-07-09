import reducer from './reducers';
import types from './types';

describe('test notifications', () => {
  it('should add notifications to the start', () => {

    const initialNotifications = [
        {
            id: '1',
            title: "new followers"
        }
    ]
    const initialState = {
        loading: false,
        notifications: [...initialNotifications],
    };
    const newNotifications = [
        {
            id:"1",
            title:'new followers'
        },
        {
            id: "2",
            title: "new comment"
        }
    ]
    const newAction = {
      type: types.addNotifications,
      payload: newNotifications
    };

    expect(reducer(initialState, newAction)).toEqual({
      ...initialState,
      notifications: [
        {
          id: "2",
          title: "new comment"
        },
      ...initialNotifications,
      ]
    });
  });


});
