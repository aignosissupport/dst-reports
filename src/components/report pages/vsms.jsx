import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const VSMS = () => {
  

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  const age=(getURLParameter("CA") || "");
  const formatToOneDecimal = (value) => parseFloat(value).toFixed(1);
  const name=getURLParameter("Name") || "";  
  const currentDate = new Date().toLocaleDateString();
  const SQ = getURLParameter("SQ") || "";
  const SA = getURLParameter("SA") || "";
  const SHD = getURLParameter("SHD") || "";
  const SHE = getURLParameter("SHE") || "";
  const SD = getURLParameter("SD") || "";
  const OCC = getURLParameter("OCC") || "";
  const COM = getURLParameter("COM") || "";
  const LOC = getURLParameter("LOC") || "";
  const SOC = getURLParameter("SOC") || "";
  const SHG = getURLParameter("SHG") || "";
  const CA = getURLParameter("CA") || "";
  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          text-align: justify;
        }
        .data-field {
          margin-bottom: 10px;
          font-size: 16px;
        }
        .label {
          font-weight: bold;
        }
        #barChart {
          max-width: 100%;
          margin-top: 20px;
        }
        .section-title {
          color: #94059f;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
      `}</style>
 <div className="pdf-image flex flex-col font-manrope items-center p-8 bg-white min-h-screen" >
 <div className="pdf-page bg-white p-8 shadow-md rounded-md w-[210mm] h-[297mm]">
             <div>
                    <h1 className='text-left text-sm'>Vineland Social Maturity Scale Report</h1>
                    <div className="w-full border-t-2 mt-2 border-[#9C00AD]"></div>
                </div>

      <div className="container" style={{width: "100%",
          maxWidth: "800px",
          margin: "auto"}}>
        <h1 style={{paddingBottom: "15px",
            marginLeft:"-30vw",
            fontFamily: '"Times New Roman", Times, serif',
            fontWeight: "600",
            fontSize: "xx-large",
            color: "#94059f",
            }}>VSMS <span style={{color:"black"}}> Screening:</span>
        </h1>
        <div style={{textAlign:"justify"}}>
        The Vineland Social Maturity Scale (VSMS) measures the differential social capacities of an individual. It provides an estimate of Social Age (SA) and Social Quotient  (SQ), and shows high correlation (0.80) with intelligence. It is designed to measure social maturation in eight social areas: Self-help General (SHG), Self-help Eating (SHE), Self-help Dressing (SHD), Self-direction (SD), Occupation (OCC), Communication (COM), Locomotion (LOM), and Socialization (SOC). The Scale consists of 89 test items grouped into year levels. VSMS can be used for the age group of 0-15 years. 
                <br />
                
                Social Age: <span id="SAmessage"
                    style={{fontSize: "x-large", color: "#007bff"}}> {SA}</span> <br />  Social Quotient: <span id='isaascore'
                    style={{fontSize: "x-large", color: "#007bff"}}>{SQ}</span> 
                <br /><br />
        </div>
        
        <div id="patientData" style={{fontSize:"larger"}}>
          <div><span className="label" >Patient Name:</span> <span id="isaapatientNamecell">{name}</span></div>
          <div><span className="label">Age:</span> <span id="chronologicalAgecell">{age}</span></div>
        </div>
        <br /><br />
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{SQ} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="SAmessage">{SA}</span></p> */}

       
        
       
        
        <center>
        <table border="4" style={{width: "50%", textAlign: "center", marginTop: "10px", border: "1px solid #d1d5db" , padding: "8px" }}>
                    <tr >
                        <th style={{ border: "1px solid #d1d5db", borderLeft:"0px", borderRight:"0px" ,  padding: "8px" }}>Domain</th>
                        <th style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>Score</th>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Self Help General</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{SHG}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>Self Help Eating</td>
                        <td style={{ border: "1px solid #d1d5db",borderRight:"0px" ,  padding: "8px" }}>{SHE}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",   padding: "8px" }}>Self Help Dressing</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{SHD}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Self- Direction</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{SD}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Occupation</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{OCC}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Communication</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{COM}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Locomotion</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{LOC}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid #d1d5db", borderLeft:"0px",  padding: "8px" }}>Socialization</td>
                        <td style={{ border: "1px solid #d1d5db", borderRight:"0px" ,  padding: "8px" }}>{SOC}</td>
                    </tr>
                </table> 
        </center> 
        <br /><br />
        <div style={{fontSize: "12px",
            color: "#727a98",
            fontFamily: `"Times New Roman", Times, serif`,
            fontWeight: "600",
            lineHeight: "15px",
            textAlign:"justify"}}>
              On VSMS the social quotient was calculated to be {SQ} which indicates no impairment in socio adaptive functioning. 
            {/* <p>The  VSMS (Childhood Autism Rating Scale) test output provides an assessment of the child's behavior patterns based on their responses to key screening questions across various developmental domains.</p> <p> <br /> <strong>Lower VSMS Score:</strong> A lower score indicates that the child’s behaviors align closely with typical developmental milestones, suggesting a minimal likelihood of autism spectrum disorder (ASD). In this case, the child exhibits expected social interaction, communication, and behavioral patterns, indicating that the child’s development is progressing typically. </p> <br /><p> <strong>Higher VSMS Score:</strong> A higher score suggests that the child’s responses indicate a greater degree of atypical behaviors or developmental delays, which may be associated with autism spectrum disorder. This means that the child may experience challenges in areas such as social communication, emotional response, imitation, and flexibility. A higher score doesn’t confirm a diagnosis of autism but serves as an early indicator that further evaluation by a specialist may be necessary. </p> <br /> <p> The VSMS screening tool is designed to help identify children who may require additional assessment and intervention at an early stage. Early detection and timely intervention can play a crucial role in supporting a child’s developmental needs and improving long-term outcomes. </p> */}
        </div>
        {/* <h2 style={{textAlign:"left"}}>ISAA Score: <span id="isaascore">{SQ} </span></h2>
        <p style={{textAlign:"left"}}>Interpretation: <span id="SAmessage">{SA}</span></p> */}

        <br /><br /><br /><br />
         <div className="w-full flex justify-between items-center text-xs font-manrope mt-6 border-t-2 border-[#800080] pt-2">
                    <span className='text-[10px]'>VSMS Report - {name}</span>
                    <div className="text-center text-[10px]">
                        <span></span>
                        <br />
                        <span>ID: Report Generation Date: {currentDate}</span>
                    </div>
                    <span className='text-[10px]'>Page 15</span>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default VSMS;
