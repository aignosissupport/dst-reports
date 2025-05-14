import React, { useRef, useState, useContext } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Commnpdfpage from "./Commnpdfpage";
import DST from "./dst";
import imglogo from "/aignosislogo.png";
import { AppContext } from "../../AppContext";

// ---------- Static Image Data ----------
const pdfData = Array.from({ length: 7 }, (_, i) => ({
  url: `https://storage.googleapis.com/aignosis_static_assets/Screening-Report/page1.${i + 1}.png`,
  alttext: `report page ${i + 1}`,
}));

const secondPdfData = [
  "page2.1.png", "page2.2.png", "page2.3.jpg", "page2.4.png",
  "page2.5.png", "page2.6.png", "page2.7.png"
].map((filename, idx) => ({
  url: `https://storage.googleapis.com/aignosis_static_assets/Screening-Report/${filename}`,
  alttext: `report page ${13 + idx}`,
}));

// ---------- PDF Component ----------
const ComponentToPrint = React.forwardRef(({ isisaaChecked, ismchatChecked, iscarsChecked }, ref) => (
  <div id="pdf-container" ref={ref} style={{ width: "794px", minHeight: "1123px" }}>
    {pdfData.map((item, index) => (
      <Commnpdfpage key={`pdf-${index}`} src={item.url} alttext={item.alttext} />
    ))}

    {/* Conditional Components can be added here using the checkbox states */}
    <div className="pdf-page isaa-page"><DST /></div>

    {secondPdfData.map((item, index) => (
      <Commnpdfpage key={`secondpdf-${index}`} src={item.url} alttext={item.alttext} />
    ))}
  </div>
));

// ---------- Main PDF Generator ----------
const GeneratePDF = () => {
  const { testData } = useContext(AppContext);
  const componentRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isisaaChecked, setIsisaaChecked] = useState(false);
  const [ismchatChecked, setIsmchatChecked] = useState(false);
  const [iscarsChecked, setIscarsChecked] = useState(false);

  const getURLParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || "N/A";
  };

  const name = getURLParameter("Name");

  const generatePDF = async () => {
    setLoading(true);
    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });

    const pages = document.querySelectorAll(".pdf-page");

    for (let i = 0; i < pages.length; i++) {
      if (i === 7) continue; // Skip specific page if needed

      const page = pages[i];

      try {
        const canvas = await html2canvas(page, {
          useCORS: true,
          scale: 2,
          backgroundColor: "#ffffff",
          width: 794,
          height: 1123
        });

        const imgData = canvas.toDataURL("image/png", 1.0);
        if (i !== 0) pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      } catch (error) {
        console.error("Error capturing page:", error);
      }
    }

    pdf.save(`${name}_report.pdf`);
    setLoading(false);
  };

  return (
    <div className="text-center ml-[30%]">
      <button
        className="mt-5 px-4 ml-[-30%] py-2 bg-blue-600 text-white rounded"
        onClick={generatePDF}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate PDF"}
      </button>

      <ComponentToPrint
        ref={componentRef}
        isisaaChecked={isisaaChecked}
        ismchatChecked={ismchatChecked}
        iscarsChecked={iscarsChecked}
      />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="p-4 bg-white rounded-lg text-center">
            <img src={imglogo} alt="Logo" style={{ height: "15vh" }} />
            <p className="text-lg font-semibold text-gray-700">Generating PDF...</p>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mt-2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratePDF;
