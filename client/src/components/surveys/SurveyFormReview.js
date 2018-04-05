import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({
  onGoingBack,
  formValues,
  submitSurvey,
  history
}) => {
  const reviewFields = _.map(formFields, ({ name, label, type }) => {
    return (
      <div
        key={name}
        style={{ marginBottom: '30px', borderBottom: '1px solid #006064' }}
      >
        <label>{label}</label>
        <div style={{ marginTop: '11px', marginBottom: '10px' }}>
          {formValues[name]}
        </div>
      </div>
    );
  });
  return (
    <div>
      <p
        style={{
          fontWeight: 200,
          fontSize: '48px',
          fontFamily: 'Roboto, Arial, Sans Serif',
          textAlign: 'center'
        }}
      >
        Please confirm your entries
      </p>
      {reviewFields}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onGoingBack}
      >
        Back
        {/* <i className="material-icons left">arrow_backward</i>
         */}
      </button>
      <button
        onClick={() => {
          submitSurvey(formValues, history);
          localStorage.setItem('title', '');
        }}
        className="teal btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
