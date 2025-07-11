 const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // e.g., "726392"
};

export default generateOTP