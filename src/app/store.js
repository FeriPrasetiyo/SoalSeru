import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../feartures/user/userSlice';
// import thunk from 'redux-thunk'

// export const rootReducer = { reducer: { user: userReducer } }
export const store = configureStore({reducer: {user: userReducer}});
