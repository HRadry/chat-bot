import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de guía auditiva
export const sendGuideMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        "type": "interactive",
        "interactive": {
            "type": "list",
            "header": {
                "type": "text",
                "text": "Escoge un idioma"
            },
            "body": {
                "text": "¿En que idioma te gustaría que el bot te guíe?"
            },
            "footer": {
                "text": "El bot leerá los mensajes en el idioma que selecciones"
            },
            "action": {
                "sections": [
                    {
                        "title": "Idiomas",
                        "rows": [
                            {
                                "id": "1",
                                "title": "Zapoteco",
                                "description": "Idioma hablado en el norte de Oaxaca"
                            },
                            {
                                "id": "2",
                                "title": "Mixteco",
                                "description": "Idioma hablado en la Sierra Sur"
                            },
                            {
                                "id": "3",
                                "title": "Triqui",
                                "description": "Idioma hablado en la Sierra Sur"
                            },
                            {
                                "id": "4",
                                "title": "Sin guía",
                                "description": "Continuar sin guía"
                            }
                            /* Additional rows would go here*/
                        ]
                    }
                    /* Additional sections would go here */
                ],
                "button": "opciones",
            }
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);

    
};
