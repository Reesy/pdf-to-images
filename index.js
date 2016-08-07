var PDFImage = require("pdf-image").PDFImage;
var PDFInfo = require('pdfinfo');

/**
 * The images will be generated in the same folder as the pdf
 */
var inputPDF = "path/to/pdf.pdf";
var pdfImage = new PDFImage(inputPDF, {
      convertOptions: {
        '-density': '300',
        '-depth': '8',
        '-background': 'white',
        '-flatten': ''
    }
});

var pdfData = new PDFInfo(inputPDF);

var promise = new Promise(function(resolve, reject) {
   
          var pdfnumber = pdfData.info(function(err, meta) {
            if(typeof(meta.pages) !== 'undefined'){
                return resolve(meta.pages);
            }else{
              return reject("Page number wasn't defined");
            }
          });
    })
    .then(function(PageNumber) {
    /**
     * This step takes in the number of pages that exist in the pdf.
     * and outputs an image for each page.
     **/
        for(page = 0; page < PageNumber; page++){
              //This will only generate a new image if one doesn't already exist
              //test.pdf would output test-0.png, test-1.png, test-2.png, ....., test-PageNumber.png
              pdfImage.convertPage(page).then(function(imagePath){}); 
             
        }
       
    })
    .catch(function(reject){
        console.log("The following error was returned: " + reject);

    });
