import React from "react";
import PasswordReset from "../components/PasswordReset";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";

const PasswordResetPage = () => {
  return (
    <div>
    <div class="covidBorder">
          <div class="padding">
              <div class="textBorder"> 
    <PageTitle />
    <PasswordReset />
    <Link to="/">Go To Login Page</Link>
    </div>
    </div>
    </div>
  </div>
  );
};

export default PasswordResetPage;
