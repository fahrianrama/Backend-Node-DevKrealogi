const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    '',
    '',
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
