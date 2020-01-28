const isEmpty = (string) => {

   if(string.length === 0) {

      return true
   } 
   
   return false
}

const validContractForm = (data) => {

   

   for (const item of Object.keys(data)) {
      
      if(data[item].toString().length < 1) {
         return false
      }
   }  

   return true
}

export {
   isEmpty,
   validContractForm
}