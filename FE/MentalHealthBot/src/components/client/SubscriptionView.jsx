
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import PlanCards from './PlanCards';
import Sidebar from './Sidebar';
import './Subscription.css'

function SubscriptionView() {
  

  return (

    <div className="subscription-container">
        <Sidebar />
        <PlanCards/>
       
    </div>

  )
}

export default SubscriptionView;
