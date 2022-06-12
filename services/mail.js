const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    '46957ea693838f725f7410d95d17f310',
    '0ea27773444497285f7195deee4bc58f',
);

function sendVerificationCode(email, username, verificationCode) {
    const request = mailjet
    .post('send', { version: 'v3.1' })
    .request({
        Messages: [
        {
            "From": {
                "Email": "krealogidev@gmail.com",
                "Name": "Krealogi"
                },
                "To": [
                {
                    "Email": `${email}`,
                    "Name": `${username}`
                }
                ],
                "Subject": "Verification Code for Krealogi.",
                "TextPart": "Verification",
                "HTMLPart": `
                <h1>Verification Code for Krealogi.</h1>
                <p>Your verification code is: ${verificationCode}</p>
                `,
                "CustomID": "AppGettingStartedTest"
        }
        ]
    })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}


module.exports = sendVerificationCode;