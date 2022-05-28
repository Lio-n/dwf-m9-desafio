import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

type SendCodeToEmailParams = {
  email: string;
  code: number;
};

const sendCodeToEmail = async ({ email, code }: SendCodeToEmailParams): Promise<void> => {
  const msg = {
    to: email,
    from: "lionflex27@gmail.com",
    subject: `Tu código para ingresar es ${code}`,
    html: `
            <h3>Insertá este código para ingresar</h3>
            <h1>${code}</h1>`,
  };
  await sgMail.send(msg);
};

export default sendCodeToEmail;
