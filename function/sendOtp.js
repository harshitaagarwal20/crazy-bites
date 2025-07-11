import axios from 'axios';

export default async function sendOtp(mobile, subject, message) {
  try {
    const result = await axios.post('https://api.msg91.com/api/v5/flow/', {
      template_id: 'your_template_id',  // use your MSG91 template
      sender: 'MSGIND',
      mobiles: `91${mobile}`,
      VAR1: message, 
    }, {
      headers: {
        authkey: process.env.MSG91_AUTH_KEY,
        'Content-Type': 'application/json',
      },
    });

    console.log("OTP sent via MSG91", result.data);
    return result.data;
  } catch (error) {
    console.error("MSG91 OTP Error", error.response?.data || error.message);
  }
}
