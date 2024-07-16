/* eslint-disable no-unused-vars */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './reducers/auth-reducer'

// export const storeRedux = configureStore({
// 	user: userReducer,
// });

const persistAuthConfig = {
    key: 'authentication',
    storage: storage,
};

const persistedReducer = persistReducer(persistAuthConfig, userReducer);

const store = configureStore({
	// reducer: {
	// 	auth: userReducer,
	// }
	reducer: persistedReducer,
});

// export const persistor = persistStore(store);

export default store;
