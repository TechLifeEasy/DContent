import { useState, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [address, setAddress] = useState(null);
	const [dConnect, setDConnect] = useState(null);

	const context = {
		userContext: [user, setUser],
		addressContext: [address, setAddress],
		dConnectContext: [dConnect, setDConnect],
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
