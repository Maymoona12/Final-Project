function printJourneyDetails() {
  // Retrieve the HTML content of the element with id 'Journey-data'
  const JourneyContent = document.getElementById("Journey-data").innerHTML;

  // Open a new browser window for printing with specified dimensions
  const printWindow = window.open("", "", "height=600,width=800");

  // Write the HTML content to the new window
  printWindow.document.write("<html><head><title>Print Journey Details</title>");
  
  // Add CSS styles to the new window's document
  printWindow.document.write(
    `<style>
      body {
        font-family: 'Kunstler Script', cursive; /* Use Kunstler Script font */
        margin: 20px; /* Add margin around the content */
      }
    </style>`
  );
  
  // Close the head tag and open the body tag
  printWindow.document.write("</head><body>");
  
  // Write the journey content into the body of the new window
  printWindow.document.write(JourneyContent);
  
  // Close the body and html tags
  printWindow.document.write("</body></html>");
  
  // Close the document to finish writing
  printWindow.document.close();
  
  // Trigger the print dialog in the new window
  printWindow.print();
}

// Export the function for use in other modules
export { printJourneyDetails };
