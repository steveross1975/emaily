export default [
  {
    label: 'Campaign Title',
    name: 'title',
    noValueError: 'Please, provide a Survey Title',
    type: 'text'
  },
  {
    label: 'Subject Line',
    name: 'subject',
    noValueError: 'Please, provide a Subject for the survey email',
    type: 'text'
  },
  {
    label: 'Email Body',
    name: 'body',
    noValueError: 'Please, provide some text for the survey email',
    type: 'text'
  },
  {
    label: 'Recipients List',
    name: 'recipients',
    noValueError: 'Please, provide at least one email address as recipient',
    type: 'email'
  }
];
