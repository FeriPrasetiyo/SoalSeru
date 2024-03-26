import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/app/store';
import Phonebookbox from './src/feartures/user/Phonebookbox';

function App() {
  return (
    <Provider store={store}>
      <Phonebookbox />
    </Provider>
  );
}
export default App;
