import React from 'react';
import { Link } from 'react-router-dom';

import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
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
        Survey Dashboard
      </p>
      <SurveyList />
      <div className="fixed-action-btn">
        <Link
          to="/surveys/new"
          className="btn-floating btn-large #006064 cyan darken-4"
        >
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
