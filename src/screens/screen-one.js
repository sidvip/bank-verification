import React, { useContext, useEffect, useState } from "react";
import "./common.css";
import InputBox from "./input-box";
import { FormContext } from "../App";
import { BankIcon } from "./screen-two";
export default function BankDetails() {
    const [formData, setFormData] = useState({ ifscCode: "", accountNumber: "", accountHolderName: "" });
    const [isInvalid, setInvalid] = useState(new Set(["accountHolderName", "accountNumber", "ifscCode"]));
    const setFormContextData = useContext(FormContext);
    const [ifscDetails, setIfscDetails] = useState({});

    useEffect(() => {
        setFormContextData({});
    }, []);

    const VALIDATION_WARNINGS = {
        ifscCode: "Please enter valid IFSC code",
        accountNumber: "Please enter 9 to 18 digits account number",
        accountHolderName: "Please enter at least 3 letters",
    };
    const formFields = [
        {
            label: "Account Holder Name",
            onChange: (e) => setBankDetails(e, "accountHolderName", /^([a-z]{2})[a-z\s]+$/i),
            id: "account-holder-name",
            validation: formData.accountHolderName && isInvalid.has("accountHolderName") && VALIDATION_WARNINGS["accountHolderName"],
            placeholder: "Account Holder Name"
        },
        {
            label: "Account Number",
            onChange: (e) => setBankDetails(e, "accountNumber", /^[0-9]{9,18}$/),
            id: "account-number",
            validation: formData.accountNumber && isInvalid.has("accountNumber") && VALIDATION_WARNINGS["accountNumber"],
            placeholder: "Account Number"
        },
        {
            label: "IFSC Code",
            onChange: (e) => setBankDetails(e, "ifscCode", /^[A-Za-z]{4}\d{7}$/),
            id: "ifsc-code",
            validation: formData.ifscCode && isInvalid.has("ifscCode") && VALIDATION_WARNINGS["ifscCode"],
            placeholder: "IFSC Code",
            subLabel: "Get IFSC"
        }
    ];

    function updateFormData(key, value) {
        setFormData((o) => (
            {
                ...o,
                ...{ [key]: value }
            }
        ));
    }

    async function fetchBankDetails(ifsc) {
        const response = await fetch(`http://ifsc.razorpay.com/${ifsc}`);
        const data = await response.json();
        return data;
    }

    function setBankDetails(e, key, validator) {
        const value = e.currentTarget.value.trim();
        updateFormData(key, value);
        if (validator.test(value)) {
            const invalidEntries = new Set(isInvalid);
            invalidEntries.delete(key);
            setInvalid(invalidEntries);
            if (key === "ifscCode") {
                fetchBankDetails(value).then((response) => {
                    setIfscDetails(response);
                }).catch((err) => {
                    setIfscDetails({});
                    // console.log(err);
                })
            }
        } else {
            const invalidEntries = new Set(isInvalid);
            invalidEntries.add(key);
            setInvalid(invalidEntries);
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(formData);
        setFormContextData(formData);
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            <BankIcon />
            <h1 className="heading">Bank Details</h1>
            <h3 className="message">Please fill in the bank details to process for receiving funds</h3>
            {
                formFields.map((_props) => (
                    <InputBox {..._props} key={_props.id} />
                ))
            }
            {
                Object.keys(ifscDetails).length > 0 && isInvalid.size === 0 ?
                    <div className="ifsc-bank-details">
                        <span>{ifscDetails.BANK}, {ifscDetails.BRANCH}</span>
                        <span>{ifscDetails.CITY}, {ifscDetails.STATE}</span>
                    </div> : null
            }
            <input type="submit" disabled={!(isInvalid.size === 0)} />
        </form>
    )
}