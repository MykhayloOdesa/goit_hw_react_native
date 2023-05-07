import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { authOnStateChanged } from '../redux/auth/authOperations';
import UseRoute from '../router';

export default function Main() {
  const { isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOnStateChanged());
  }, []);

  const routing = UseRoute(isAuth);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
