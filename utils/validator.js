//* checks whether the entered email matches the specified condition and returns true or false accordingly
const validateEmail = (email) => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );
  return emailRegex.test(email);
};

//* Validates user's password. Rules: Password must be atleast 8 character long and it must include atleast - one uppercase letter, one lowercase letter, one digit, one special character
const validatePassword = (password) => {
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  return passwordRegex.test(password);
};

module.exports = { validateEmail, validatePassword };
