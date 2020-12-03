const { host, port, username, password } = require("../config.json");
const nodemailer = require("nodemailer");

module.exports = async function(mattachment, nsender, ssender, receiver, subject, mcontent) {
    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false,
        auth: {
            user: username,
            pass: password,
        },
        tls: { rejectUnauthorized: false },
        pool: true,
    });
    if (mattachment == null) {
        let info = await transporter.sendMail({
            from: {
                name: nsender,
                address: ssender,
            },
            to: receiver,
            subject: subject,
            text: mcontent,
            html: mcontent,
        });
    }
    else {
        let info = await transporter.sendMail({
            from: {
                name: nsender,
                address: ssender,
            },
            to: receiver,
            subject: subject,
            text: mcontent,
            html: mcontent,
            attachments: {
                path: mattachment,
            }
        });
    }
}
