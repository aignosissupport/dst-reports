import React, { useEffect } from 'react';

const DST = () => {
const urlParams = new URLSearchParams(window.location.search);

const getURLParameter = (name) => urlParams.get(name) || "N/A";

// Convert Excel serial date to JS date string
const excelDateToJSDate = (serial) => {
  const num = parseFloat(serial);
  if (isNaN(num)) return "N/A";
  const utcDays = Math.floor(num - 25569);
  const utcValue = utcDays * 86400;
  return new Date(utcValue * 1000).toLocaleDateString();
};

const patientData = {
  name: getURLParameter("name"),
  dob: getURLParameter("dob"),
  doa: excelDateToJSDate(getURLParameter("doa")),
  ca: getURLParameter("ca"),
  da: getURLParameter("da"),
  dq: getURLParameter("dq"),
  currentDate: new Date().toLocaleDateString()
};




  return (
    <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen relative" >
    <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm] relative">
        <h1 className="text-sm font-semibold text-left text-purple-700">Developmental Screening Test</h1>
        <div className="w-full border-t-2 mt-2 border-purple-700"></div>

        <h2 className="text-2xl font-bold text-purple-800 mt-6">DST <span className="text-black">Screening</span></h2>
        <p className="mt-4 text-justify text-gray-700">
        The developmental screening test (DST) was developed by Bharat Raj 
        is a nonverbal test designed to measure the mental development of 
        children from birth to 15 years. The information is obtained by the 
        use of a semi structured interview with the parents/caretakers without 
        requiring the use of performance on any of the tasks. This is particularly 
        useful for assessing children who are non-cooperative, those with multiple 
        impairments or those with severe behavior problems making the test batteries unsuitable.
        </p>
        <p className="mt-2 pt-4 text-left text-gray-700">
          Name: <span className="font-semibold">{patientData.name}</span><br />
          Date of Birth: <span className="font-semibold">{patientData.dob}</span><br />
          Date of Assessment: <span className="font-semibold">{patientData.doa}</span>
        </p>

        <table className="w-[60%] mx-auto mt-20 text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">Domain</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border px-4 py-2">Developmental Age (months)</td><td className="border px-4 py-2">{patientData.da}</td></tr>
            <tr><td className="border px-4 py-2">Chronological Age (months)</td><td className="border px-4 py-2">{patientData.ca}</td></tr>
            <tr><td className="border px-4 py-2">Developmental Quotient</td><td className="border px-4 py-2">{patientData.dq}</td></tr>
          </tbody>
        </table>


        <div className="mt-10 text-left text-gray-800">
          {patientData.dq >= 85 ? (
            <p>
              The test results were indicative of normal development.
            </p>
          ) : patientData.dq >= 71 && patientData.dq <= 84 ? (
            <p>
              The test results were indicative of mild-to-moderate delay in development.
            </p>
          ) : patientData.dq <= 70 ? (
            <p>
              The test results were indicative of severe delay in development.
            </p>
          ) : (
            <p>
              The test results are void.
            </p>
          )}
        </div>


        <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-gray-500 border-t border-purple-800 pt-2">
            <span>DST Report - {patientData.name}</span>
            {/* <span>Page 08</span> */}
        </div>
      </div>
    </div>
  );
};

export default DST;
