import axios from "axios";

export const verficarCaptch = async (captcha) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = process.env.RECAPTCHA_WEB_API;

  const response = await axios.post(
    verificationURL,
    new URLSearchParams({
      secret: secretKey,
      response: captcha,
    })
  );
  const { success } = response.data;
  return success;
};
