export const usernameRules = {
  required: 'Username is required',
  minLength: {
    value: 4,
    message: 'Username must be at least 4 characters',
  },
};

export const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
  pattern: {
    value: /[a-zA-Z]/,
    message: 'Password must include at least one letter',
  },
};
