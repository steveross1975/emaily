const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false); //I want to capture the email that fail the test

  if (invalidEmails.length && invalidEmails[invalidEmails.length - 1] !== '') {
    return `These emails are invalid: ${invalidEmails}`;
  }

  return;
};
