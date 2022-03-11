const CardReducer = (state, action) => {
    switch(action.type) {
        case 'GET_INFO':
                return {
                    ...state,
                    infoRandom: [...state.infoRandom, action.payload]
                };
        case "GET_INFO_BY_CEDULA":
                return {
                    ...state,
                    infoByCedula : action.payload
                }
        
        case "CLEAR_INFO_SEARCH":
                return {
                    ...state,
                    infoByCedula: null
                }
        case 'CLEAR_INFO':
                return {
                    ...state,
                    infoRandom: null
                }
        default:
            return state;
    }
}

export default CardReducer  