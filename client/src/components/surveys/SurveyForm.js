import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; //is an helper function that is able to communicate with the redux-store
import SurveyField from './SurveyField';
//the prop handleSubmit is added automatically by the redux form
import { Link } from 'react-router-dom';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipients List', name: 'emails' }
];

class SurveyForm extends Component {
  getTitleText() {
    const { title } = this.props;
  }
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <input
            style={{ fontSize: 24 + 'px', border: 'none' }}
            value={this.getTitleText()}
          />
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
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

//like connect reduxForm is called like that
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
