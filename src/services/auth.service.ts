import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function authService(phoneNumber: string, filePath: string) {
    const outputFilePath = path.join(path.dirname(filePath), `${path.basename(filePath, '.oga')}.wav`);
    console.log('Input file path:', filePath);
    console.log('Output file path:', outputFilePath);

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            console.error('File not found:', filePath);
            return reject(new Error('File not found'));
        }
        ffmpeg(filePath)
            .toFormat('wav')
            .on('end', async () => {
                console.log('Conversion completed');

                try {
                    const form1 = new FormData();
                    form1.append('testFile', fs.createReadStream(outputFilePath));

                    const form2 = new FormData();
                    form2.append('phoneNumber', phoneNumber);
                    form2.append('testFile', fs.createReadStream(outputFilePath));

                    const [responseV, response] = await Promise.all([
                        fetch('http://localhost:8080/liveness/check', {
                            method: 'POST',
                            body: form1,
                            headers: form1.getHeaders()
                        }),
                        fetch('http://localhost:8080/voice/verify', {
                            method: 'POST',
                            body: form2,
                            headers: form2.getHeaders()
                        })
                    ]);

                    if (responseV.ok && response.ok) {
                        const result1 = await responseV.text();
                        const result2 = await response.text();
                        console.log(result1);
                        console.log(result2);
                        resolve(parseFloat(result2) > 0.5 && parseFloat(result1) > -0.2);
                    } else {
                        console.log('Error processing the audio:', response, responseV);
                        resolve(false);
                    }
                } catch (error) {
                    console.error('Error sending audio:', error);
                    resolve(false);
                }
            })
            .on('error', (err) => {
                console.error('Error converting audio', err);
                reject(err);
            })
            .save(outputFilePath);
    });
}

export { authService };
