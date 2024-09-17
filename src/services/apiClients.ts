import axios from "axios"
import { envString } from "../config/utils"
import { Double } from "typeorm"

export interface PartyInfo {
	FATHERLASTNAME: string
	MOTHERLASTNAME: string
	FIRSTNAMES: string
	FULLNAME: string
	ACCOUNTID: string
	extensionList: { [key: string]: string }
}
export interface PartyInfoDfsp {
	PARTYINFO: PartyInfo
	DFSPID: string
}

export interface Balance {
	SALDO: number
}

// Interfaces
export interface TransferAmount {
	currency: string;
	amount: number;
}

export interface DebitRequest {
	transferID: string;
	accountID: string;
	transferAmount: TransferAmount;
}

export interface DebitResponse {
	transferID: string;
	accountID: string;
	noteDebitID: string;
}

export interface TransferRequest {
	transferID: string;
	accountID: string;
	dfspIdOrigin: string;
	dfspIdDestination: string;
	transferAmount: TransferAmount;
	remittance: boolean;
	note: string;
}

export interface CreditResponse {
	transferID: string;
	accountID: string;
	noteDebitID: string;
}

export interface enviaDineroBody {
	partyIdType: string;
	payerIdentifier: string;
	payeeIdentifier: string;
	amount: string;
}

export interface aceptQuoteBody {
	partyIdType: string;
	payerIdentifier: string;
	payeeIdentifier: string;
	amount: string;
}


// Create axios client for ISIS SMBCONTIGO api
export const isisContigoClient = axios.create({
	baseURL: envString('SMBCONTIGO_URL'),
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Basic ${Buffer.from(`${envString('ISIS_USER')}:${envString('ISIS_PASSWORD')}`).toString('base64')}`
	}
})

isisContigoClient.interceptors.request.use((config) => {
	return config
})

isisContigoClient.interceptors.response.use((response) => {
	return response
})

// Create axios client for HUATUSCO

export const isisHuatuscoClient = axios.create({
	baseURL: envString('SMBHUATUSCO_URL'),
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Basic ${Buffer.from(`${envString('ISIS_USER')}:${envString('ISIS_PASSWORD')}`).toString('base64')}`
	}
})

isisHuatuscoClient.interceptors.request.use((config) => {
	return config
})

isisHuatuscoClient.interceptors.response.use((response) => {
	return response
})

// Create axios client for lookup
export const lookUpClient = axios.create({
	baseURL: envString('LOOKUP_URL'),
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Basic ${Buffer.from(`${envString('LOOKUP_USER')}:${envString('LOOKUP_PASSWORD')}`).toString('base64')}`
	}
})

lookUpClient.interceptors.request.use((config) => {
	console.log(`[${new Date().toISOString()}] Request initiated: ${config.method?.toUpperCase()} - ${config.baseURL}${config.url}`)
	return config
})

lookUpClient.interceptors.response.use((response) => {
	return response
})
