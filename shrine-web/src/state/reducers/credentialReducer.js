const initialState = {
    email: '',
    stretchedMasterKey: '',
    masterPasswordHash: '',
};

const reducer = (
    status = initialState,
    action
) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...status,
                email: action.payload.email,
            };
        case 'INIT_KEY_AND_HASH':
            return {
                ...status,
                stretchedMasterKey: action.payload.stretchedMasterKey,
                masterPasswordHash: action.payload.masterPasswordHash,
            }
        case 'SET_STRETCHED_MASTER_KEY':
            return {
                ...status,
                stretchedMasterKey: action.payload.stretchedMasterKey,
            };
        case 'SET_MASTER_PASSWORD_HASH':
            return {
                ...status,
                masterPasswordHash: action.payload.masterPasswordHash,
            };
        default:
            return status;
    }
}

export default reducer;
