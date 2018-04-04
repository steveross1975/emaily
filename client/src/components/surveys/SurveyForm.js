import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; //is an helper function that is able to communicate with the redux-store
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

//the prop handleSubmit is added automatically by the redux form
if (performance.navigation.type === 1) {
  localStorage.setItem('title', '');
}
class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: ''
    };
  }

  buildTitle(e) {
    const titleValue = e.target.value;
    this.setState({ titleText: titleValue });
    localStorage.setItem('title', titleValue);
  }
  componentWillMount() {
    this.setState({ titleText: localStorage.getItem('title') });
  }
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          id={name === 'title' ? 'title' : undefined}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          onChange={name === 'title' ? this.buildTitle.bind(this) : undefined}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          <p
            style={{
              fontSize: 48 + 'px',
              fontWeight: 200,
              fontFamily: 'Roboto, Arial, Sans Serif',
              textAlign: 'center',
              marginBottom: '48px'
            }}
          >
            {this.state.titleText}
          </p>
          {this.renderFields()}
          <Link
            to="/surveys"
            onClick={() => localStorage.setItem('title', '')}
            className="red btn-flat white-text"
          >
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Review
            <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  //Email Recipients List Validation
  errors.emails = validateEmails(values.emails || '');

  //Mandatory Fields Validation
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

//like connect reduxForm is called like that
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
