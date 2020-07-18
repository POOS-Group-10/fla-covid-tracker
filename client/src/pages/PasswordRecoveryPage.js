import React from "react";
import PasswordRecovery from "../components/PasswordRecovery";
import PageTitle from "../components/PageTitle";

const PasswordRecoveryPage = () => {
  return (
    <div>
        <div class="covidBorder">
            <div class="padding">
                <div class="textBorder"> 
      <PageTitle />
      <PasswordRecovery />
      <Link to="/">Go Back</Link>
    </div>
    </div>
    </div>
    </div>
  );
};

export default PasswordRecoveryPage;
