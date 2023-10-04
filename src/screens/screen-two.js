import BankJpeg from './bank.svg';
import BankGreen from './bank-green.svg';
import CheckGreen from './check.svg';
import { useEffect, useState } from 'react';

export function BankIcon() {
    return (
        <div className='bank-div'>
            <img src={BankJpeg} className="bank-icon" alt="bank" />
        </div>
    )
}
function BankDetailsLabel({ label, value }) {
    return (
        <div className="info">
            <label className="label">{label}</label>
            <label className="value">{value}</label>
        </div>
    )
}


function penyDropValidation(formData) {
    // https://api.sandbox.co.in/bank/{ifsc}/accounts/{account_number}/verify?
    // without auth token penny drop won't work;
    return Promise.resolve({
        "data": {
            "utr": "210219578183",
            "account_exists": true,
            "amount_deposited": 1,
            "message": "Bank Account details verified successfully.",
            "name_at_bank": "JOHN DOE"
        },
        "code": 200,
        "timestamp": 1614696176218,
        "transaction_id": "611335dc-8be4-40d1-8438-b86526462939"
    });
}

export default function ProcessingDetails({ formData }) {

    const [show, setShow] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {

        penyDropValidation(FormData)
            .then((response) => {
                // console.log(response);
                setTimeout(() => {
                    setData(response.data);
                    setShow(false);
                }, 6000);
            })
            .catch((error) => {
                console.error(error);
            });
        // return () => clearTimeout(id);
    }, []);

    return (
        <div className="processing-details">
            <div className='headline'>
                <BankIcon />
                <h3>Bank Details</h3>
            </div>
            <div className="bank-details">
                <BankDetailsLabel label="Account Holder Name" value={formData.accountHolderName} />
                <BankDetailsLabel label="Account Number" value={formData.accountNumber} />
                <BankDetailsLabel label="IFSC Code" value={formData.ifscCode} />
            </div>
            {show ?
                <div className='main-center'>
                    <div className='verification-class'>
                        <div></div>
                    </div>
                    <img src={BankGreen} className="inside-bank" alt="bank" />
                </div> :
                <div className='validation-done'>
                    <img src={CheckGreen} className="check" alt="bank" />
                </div>
            }
            {show ?
                <div className='verification-message'>Verification is in Progress</div> :
                <div className='verification-message'>
                    <div>{data?.message}</div>
                </div>
            }
            {show ? null :
                <div className='confirmation'>
                    <label>Please confirm if you received the money</label>
                    <input type='submit' value="Confirm" onClick={() => alert("You can close this window")} />
                </div>
            }
        </div>
    )
}