import React, {useState, useCallback, useMemo} from 'react';
import * as XLSX from 'xlsx';
import { Container } from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import ErrorTable from '../component/ErrorTable';


const ErrorCheckerPage = () => {
  const [show, setShow] = useState(false);
  const [renderedFiles, setRenderedFiles] = useState([]);
  const [numberOfErrors, setNumberOfErrors] = useState(0);

  

  const randomFunction = (files) => {
    setNumberOfErrors(0)
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
      if((item.Answer === item.OptionA) || (item.Answer === item.OptionB) ||(item.Answer === item.OptionC) ||(item.Answer === item.OptionD)) {

      } else {
        answers.push({...item, ErrorMessage: "Answer is not among Options", Row: index})
      }
    });

    fileWithError.answerErrors = answers
  }

  const checkDuplicateOptions = (data, fileWithError) => {
    let duplicates = []
    data.forEach((item, index) => {
      if((item.OptionA === item.OptionB) || (item.OptionA === item.OptionC) || (item.OptionA === item.OptionD) || (item.OptionB === item.OptionC) || (item.OptionB === item.OptionD) || (item.OptionC === item.OptionD)) {
        duplicates.push({...item, ErrorMessage: "Duplicate Options", Row: index})
      }
    })

    fileWithError.duplicateErrors = duplicates 
  }

  const checkEmptyOptions = (data, fileWithError) => {
    let emptyOptions = []

    data.forEach((item, index) => {
      if((item.Question) && (item.Category) && (item.OptionA) && (item.OptionB) && (item.OptionC) && (item.OptionD) && (item.Hint) && (item.Answer)) {
        
      } else {
        emptyOptions.push({...item, ErrorMessage: "One of the options is empty or is 0. If 0, ignore.", Row: index})
      }
    })

    fileWithError.emptyOptionsErrors = emptyOptions
  }

  const readExcel = (file, filesWithErrors, errors) => {

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
      checkEmptyOptions(data, fileWithError)
      if(fileWithError.answerErrors.length === 0 && fileWithError.duplicateErrors.length === 0 && fileWithError.emptyOptionsErrors.length === 0) {

      } else {
        setNumberOfErrors((prevState) => {
          return prevState + fileWithError.answerErrors.length +fileWithError.duplicateErrors.length + fileWithError.emptyOptionsErrors.length
        })
        filesWithErrors.push(fileWithError)
      }
      
    })

  }


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    randomFunction(acceptedFiles)
  }, [randomFunction])
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
    isDragReject,
    acceptStyle,
    baseStyle,
    focusedStyle,
    rejectStyle
  ]);

    return (
        <Container>
  <>
  <h1>Error File Checker</h1>
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

      

      {show && <p>Number of errors in the files = {numberOfErrors}</p>}
  {show && renderedFiles.length > 0 &&
      renderedFiles.map((item, index) => (
        <ErrorTable key={index} fileWithError={item} />
      ))
    }

    <button type="button" className="btn btn-dark m-3" onClick={showErrorsFunctions}>Display Errors</button>

    {!show &&
    <>
    <p>File header should match the below</p>
        <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Row Number</th>
            <th scope="col">Question</th>
            <th scope="col">Category</th>
            <th scope="col">OptionA</th>
            <th scope="col">OptionB</th>
            <th scope="col">OptionC</th>
            <th scope="col">OptionD</th>
            <th scope="col">Answer</th>
            <th scope="col">Hint</th>
          </tr>
        </thead>
      </table>
      </>
      }
    </Container>
    )
}

export default ErrorCheckerPage
