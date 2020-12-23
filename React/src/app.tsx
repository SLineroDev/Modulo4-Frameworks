import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage } from './login';
import { ListPage } from './list';
import { DetailPage } from './detail';
import { MyContextProvider } from './context';
import { MyRouter } from './myRouter';

export const App = () => {
	return (
		<MyContextProvider>
			<MyRouter />
		</MyContextProvider>
	);
};
