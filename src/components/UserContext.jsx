import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [address, setAddress] = useState(null);
	const [dConnect, setDConnect] = useState(null);

	const context = {
		isAuthenticatedContext: [isAuthenticated, setIsAuthenticated],
		addressContext: [address, setAddress],
		dConnectContext: [dConnect, setDConnect],
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
