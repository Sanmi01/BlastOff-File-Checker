import React, {useState} from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import Dropzone from 'react-dropzone';



function App() {
  const filesWithErrors = [];
  const [renderedFiles, setRenderedFiles] = useState([]);

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const [style] = useState(baseStyle)

  const checkAnswer = (data, fileWithError) => {
    let answers = []
    data.forEach((item, index) => {
      if((item.Answer === item.A) || (item.Answer === item.B) ||(item.Answer === item.C) ||(item.Answer === item.D)) {
      } else {
        answers.push({...item, Error: "Answer is not among Options"})
        // console.log("Answer does not match Option")
        // console.log(item)
      }
    });

    fileWithError.answerErrors = answers
  }

  const checkDuplicateOptions = (data, fileWithError) => {
    let duplicates = []
    data.forEach((item, index) => {
      if((item.A === item.B) || (item.A === item.C) || (item.A === item.D) || (item.B === item.C) || (item.B === item.D) || (item.C === item.D)) {
        duplicates.push({...item, Error: "Duplicate Options"})
        // console.log("Duplicate Options")
        // console.log(item)
      }
    })

    fileWithError.duplicateErrors = duplicates 
  }

  const readExcel = (file) => {
    
    let fileWithError = {};
    fileWithError.name = file.name

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer'});

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data);

      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => {
      // console.log(data)
      checkAnswer(data, fileWithError)
      checkDuplicateOptions(data, fileWithError)
      if(fileWithError.answerErrors.length === 0 && fileWithError.duplicateErrors.length === 0) {

      } else {
        filesWithErrors.push(fileWithError)
      }
      
    })
    
  }

  return (
    <div className="App">
      <div>
        <input type="file" onInput={(e) => {
          const file = e.target.files[0]
          readExcel(file);
        }} />
      </div>
      <Dropzone onDrop={(acceptedFiles) => {
      acceptedFiles.forEach((item, index) => {
      readExcel(item)
      
    })
    setRenderedFiles(filesWithErrors)
    console.log(filesWithErrors)
    }}
      >
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>
    </div>
  );
}

export default App;
