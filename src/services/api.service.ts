import { lookUpClient, isisContigoClient, isisHuatuscoClient, Balance } from "../services/apiClients" //resgistros/services/logs.service
import { AxiosResponse } from "axios"

// services/apiService.js
const username = 'twisisapi';
const password = 'tw15154p1';
const basicAuth = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');

// Función para obtener el saldo de una cuenta
async function getBalanceInquiry(accountID, dfsp) {
  let balanceResponse: AxiosResponse<Balance>
  switch (dfsp) {
    case 'smb-contigo':
      balanceResponse = await isisContigoClient.get<Balance>(`/balance_inquiry?accountID=${accountID}`)
      break;
    case 'smb-huatusco':
      balanceResponse = await isisHuatuscoClient.get<Balance>(`/balance_inquiry?accountID=${accountID}`)
      break;
    default:
      break;
  }
  return balanceResponse.data;
}

// Función para ejecutar un débito
async function executeDebit(requestBody, dfsp) {
  try {
    let response: AxiosResponse;
    switch (dfsp) {
      case 'smb-contigo':
        response = await isisContigoClient.post('/isis_debit', requestBody);
        break;
      case 'smb-huatusco':
        response = await isisHuatuscoClient.post('/isis_debit', requestBody);
        break;
      default:
        throw new Error('DFSP no válido');
    }
    return response.data;
  } catch (error) {
    console.error(`Error ejecutando débito: ${error.message}`);
    throw error;
  }
}


async function enviaDinero(payerIdentifier, payeeIdentifier, amount) {
  try {
    let responseEnviaDinero: AxiosResponse;
    let responseAceptQuote: AxiosResponse;

    const enviaDineroBody = {
      partyIdType: 'MSISDN',
      payerIdentifier,
      payeeIdentifier,
      amount
    }

    responseEnviaDinero = await lookUpClient.post('/envia_dinero', enviaDineroBody)

    responseAceptQuote = await aceptQuote(responseEnviaDinero.data, amount)

    return responseAceptQuote.data;
  } catch (error) {
    console.error(`Error ejecutando crédito: ${error.message}`);
    throw error;
  }
}


async function aceptQuote(responseEnviaDinero, amount) {
  try {
    let responseAceptQuote: AxiosResponse;

    const aceptQuoteBody = {
      transferId: responseEnviaDinero.transferId,
      payerDfspId: responseEnviaDinero.payerDfspId,
      accountId: responseEnviaDinero.accountId,
      amount
    }

    responseAceptQuote = await lookUpClient.put('/acept_quote', aceptQuoteBody)

    return responseAceptQuote.data;
  } catch (error) {
    console.error(`Error ejecutando crédito: ${error.message}`);
    throw error;
  }
}

export { getBalanceInquiry, enviaDinero, executeDebit };
