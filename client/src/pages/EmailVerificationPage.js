import React from 'react';
import PageTitle from '../components/PageTitle';
import EmailVerification from '../components/EmailVerification';

const EmailVerificationPage = () =>
{
    return(
        <div class="covidBorder">
            <div class="padding">
                <div class="textBorder">
                    <PageTitle />
                    <EmailVerification />
                </div>
            </div>
         </div>        
    );
}

export default EmailVerificationPage;