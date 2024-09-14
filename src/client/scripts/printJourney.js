function printJourneyDetails() {
  const JourneyContent = document.getElementById("Journey-data").innerHTML;
  const printWindow = window.open("", "", "height=600,width=800");
  
  printWindow.document.write("<html><head><title>Print Journey Details</title>");
  printWindow.document.write(
    `<style>
      body {
        font-family: 'Kunstler Script', cursive; 
        margin: 20px;
      }
    </style>`
  );
  printWindow.document.write("</head><body>");
  printWindow.document.write(JourneyContent);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

export { printJourneyDetails };
