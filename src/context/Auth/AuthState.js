import { useReducer } from "react"
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer"

const AuthState = (props) => {
    const initialState = {
        user: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //Func

    const GetUser = (user) => {
        
        let userData = {
            name : user.account.name
        }
        
        dispatch({
            type: "GET_USER",
            payload: userData
        })
    }

    const SignUserOff = () => {
        sessionStorage.clear();
        localStorage.clear();
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                GetUser,
                SignUserOff
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;