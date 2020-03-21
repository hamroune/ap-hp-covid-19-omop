

const initState = {
    id : "123",
    product :[]
}

const rootReducer = (state=initState , action)=> {

    if(action.type==='SEND_ID')
    {
        return{
            ...state,
            id : action.content.id,
        }
        
    }
    if(action.type==='SEND_PRODUCT')
    {
        return{
            ...state,
            product :action.content.product,
        }
        
    }
    return state;
}
export default rootReducer