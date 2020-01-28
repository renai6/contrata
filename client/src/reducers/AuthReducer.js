export const LOAD_USER_DATA = 'LOAD_USER_DATA'
export const USER_LOADING = 'USER_LOADING'
export const LOGOUT = 'LOGOUT'


export const AuthReducer = (state, action) => {

   switch (action.type) {

      case USER_LOADING: 

         return {

            ...state,
            isLoading: !state.isLoading
         }

      case LOAD_USER_DATA:
         
         return {
            isOnline: true,
            isLoading: false,
            token: action.token,
            user:  action.user
         }

      case 'NULL_TOKEN':
         
         return {
            ...state,
            
            token: null,
           
         }
      
      case LOGOUT: 
         
         return {
            isOnline: false,
            isLoading: false,
            token: null,
            user:  []
         }

      default:
         return state
   }
}