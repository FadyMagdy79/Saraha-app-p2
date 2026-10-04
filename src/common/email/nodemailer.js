import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
   
    service: "gmail",   
    auth: {
        user: process.env["NODEEMAIL.EMAIL"],
        pass: process.env["NODEEMAIL.PASSWORD"],
    }
});

export async function sendEmail(to, subject, html){

 await transporter.sendMail({
        from: `"ngl.app" <${process.env["NODEEMAIL.EMAIL"]}>`,
        to: to,
        subject: subject,
        html: html
    });
}
