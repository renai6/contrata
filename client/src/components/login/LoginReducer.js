
const LoginReducer = (state, action) => {

   switch (action.type) {

      case 'INPUT': 

         return {

            ...state,
            [action.field]: action.value
         }

      case 'LOGIN': 

         return {

            ...state,
            inValidForm: false,
            formMessage: '',
            formPassMessage: '',
         }

      case 'FAILED_PASSWORD': 

         return {

            ...state,
            inValidForm: true,
            password: '',
            formPassMessage: action.message,
         }

      case 'FAILED_USERNAME': 

         return {

            ...state,
            inValidForm: true,
            password: '',
            formMessage: action.message,
         }

      case 'USENAME_EMPTY': 

         return {

            ...state,
            inValidForm: true,
            password: '',
            formMessage: action.message,
         }
      case 'PASSWORD_EMPTY': 

         return {

            ...state,
            inValidForm: true,
            password: '',
            formPassMessage: action.message,
         }

      default:
         return state
   }
}

export default LoginReducer