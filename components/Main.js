import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { auth } from '../firebase/config';
import UseRoute from '../router';

export default function Main() {
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged(user => setUser(user));

  const routing = UseRoute(user);

  useEffect(() => {}, []);

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {routing}
    </NavigationContainer>
  );
}
