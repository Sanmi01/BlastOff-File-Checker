import React, {useState, useCallback, useMemo} from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { Container } from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import ErrorTable from './ErrorTable';



function App() {
  
  const [show, setShow] = useState(false);
  const [renderedFiles, setRenderedFiles] = useState([]);

  

  const randomFunction = (files) => {
    const filesWithErrors = [];
    files.forEach((item, index) => {
      readExcel(item, filesWithErrors)
    })

    setRenderedFiles(filesWithErrors)
    setShow(false)
  }

  const showErrorsFunctions = () => {
    setShow(true)
  }

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
    backgroundColor: '#add8e6',
    color: '#000000',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const checkAnswer = (data, fileWithError) => {
    let answers = []
    data.forEach((item, index) => {
      if((item.Answer === item.A) || (item.Answer === item.B) ||(item.Answer === item.C) ||(item.Answer === item.D)) {

      } else {
        answers.push({...item, ErrorMessage: "Answer is not among Options"})
      }
    });

    fileWithError.answerErrors = answers
  }

  const checkDuplicateOptions = (data, fileWithError) => {
    let duplicates = []
    data.forEach((item, index) => {
      if((item.A === item.B) || (item.A === item.C) || (item.A === item.D) || (item.B === item.C) || (item.B === item.D) || (item.C === item.D)) {
        duplicates.push({...item, ErrorMessage: "Duplicate Options"})
      }
    })

    fileWithError.duplicateErrors = duplicates 
  }

  const readExcel = (file, filesWithErrors) => {
    
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
      checkAnswer(data, fileWithError)
      checkDuplicateOptions(data, fileWithError)
      if(fileWithError.answerErrors.length === 0 && fileWithError.duplicateErrors.length === 0) {

      } else {
        filesWithErrors.push(fileWithError)
      }
      
    })
    
  }


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    randomFunction(acceptedFiles)
  }, [])
  const {acceptedFiles, getRootProps, getInputProps, isFocused, isDragActive, isDragAccept, isDragReject } = useDropzone({onDrop})

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);
  

  return (
    <Container className="App">
  <>
  <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  </>

  <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>


  {show && renderedFiles.length > 0 &&
      renderedFiles.map((item, index) => (
        <ErrorTable key={index} fileWithError={item} />
      ))
    }

    {show && renderedFiles.length === 0 && <p>No error in the files</p>}
    <button type="button" className="btn btn-dark m-3" onClick={showErrorsFunctions}>Display Errors</button>
    </Container>
  );
}

export default App;
