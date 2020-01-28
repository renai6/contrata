// Invoice Submit
 const handleSubmit = async (e) => {

      e.preventDefault()

      const _data = {

         hoursInvoice: parseInt(hours),
         hourlyRate: 100,
         calcAmount: 100,
         month,
         year,
         subContractId: currentOffer.subContractId,
         clientId: currentOffer.clientId,
         contractId: currentOffer.contractId,
         offerPositionId: currentOffer.id,
         invoiceNumber: parseInt(`${currentOffer.offerNr}${currentOffer.id}`),
         amount: hours * amount
      }

      const res = await axios.post('/api/invoices/add', _data)

      dispatch({type: 'ADD_SUCCESS', payload:'Timebooked successfully!'})

      const contractIndex = contracts.findIndex((contract) => contract.id === _data.contractId )

      const subContractIndex = contracts[contractIndex].subContracts.findIndex((subContract) => subContract.id === _data.subContractId )

      const offerPositionIndex = contracts[contractIndex].subContracts[subContractIndex].offerPositions.findIndex((offer) => offer.id === _data.offerPositionId )

      dispatch({type: 'ADD_TO_INVOICE', payload:{contractIndex, subContractIndex, offerPositionIndex, newInvoice: res.data} })

      localDispatch({type: 'SUCCESS'})
      
      setTimeout(() => {
         
         dispatch({type: 'CLOSE_SNACK'})
      }, 3000);
   }