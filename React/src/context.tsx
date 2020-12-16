import React from 'react';

export const MyContext = React.createContext({
	org: '',
	setOrg: value => {},
});

export const MyContextProvider = props => {
	const [org, setOrg] = React.useState('lemoncode');

	return (
		<MyContext.Provider value={{ org, setOrg }}>
			{props.children}
		</MyContext.Provider>
	);
};
