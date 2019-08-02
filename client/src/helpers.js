export const isRequired = (val) => !!val;

export const getFormError = (form, validateField, rules, prevError = {}) => {
  const filteredRules = validateField ? rules.filter(x => x.id === validateField) : rules;
  const error = validateField ? {...prevError, [validateField]: undefined} : {};
  filteredRules.forEach(rule => {
    const val = form[rule.id];
    const valid = rule.func(val);
    if (!valid) {
      error[rule.id] = rule.message;
    }
  })
  return error;
};

export const getErrorMessage = (error, defaultMessage) => {
  if (error && error.response && error.response.data) {
    return error.response.data.message || defaultMessage;
  }
  return defaultMessage;
};

export const dateToString = (date) => {
  if (!date) {
    return null;
  }
  return new Date(date).toISOString().substr(0, 10);
};
