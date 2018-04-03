import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      Dashboard Component
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
