import { Request, Response } from "express";
import { readFileSync } from 'fs';
import { sign } from 'jsonwebtoken';


export class TokenService {
  getToken(req: Request,res: Response) {
    tockenExample()
        .then(token => {
          const response = {
            token: token,
          }
          console.log(token)
          res.status(200).json(response);
        })
        .catch(error => {
          console.log(error)
          res.status(500).json(error);
        });
  }

  genetaToken(payload: string) {
    const privateKey = readFileSync('/Users/WORK/.ssh/private_key.pem');
    return CreateTocken(payload,privateKey);
  }
}

async function CreateTocken(payload: string,privateKey: Buffer) {
    return sign(payload, privateKey, { algorithm: 'RS256'});
  }


async function tockenExample() {
  const privateKey = readFileSync('/Users/WORK/.ssh/private_key.pem');
    const payload = `{
    "homeTransactionId": "b51ec534-ee48-4575-b6a9-ead2751b6052",
    "from": {
        "fspId": "smb-contigo",
        "idType": "MSISDN",
        "idValue": "09250034768",
        "type": "CONSUMER"
    },
    "to": {
        "fspId": "smb-huatusco",
        "idType": "MSISDN",
        "idValue": "2735967409",
        "type": "CONSUMER"
    },
    "amountType": "SEND",
    "currency": "MXN",
    "amount": "10",
    "transactionType": {
        "scenario": "TRANSFER",
        "subScenario": "REMITTENCE",
        "initiator": "PAYER",
        "initiatorType": "BUSINESS"
    }
}`;
    const token = sign(payload, privateKey, { algorithm: 'RS256'});
    return token
  }


  /*
  import { readFileSync } from "fs"
import jwt from "jsonwebtoken"


interface LCCSendMoneyBody {
	homeTransactionId: string
	from: {
		fspId: string
		idType: string
		idValue: string
		type: string
	}
	to: {
		fspId: string
		idType: string
		idValue: string
		type: string
	}
	amountType: string
	currency: string
	amount: string
	transactionType: {
		scenario: string
		subScenario: string
		initiator: string
		initiatorType: string
	}
}

export function jwtCreation(payload: LCCSendMoneyBody): string {
	var privateKey = readFileSync('src/private/private_key.pem')
	var token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
	return token
}
  */