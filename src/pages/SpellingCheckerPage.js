import React, {useState} from 'react';
import * as XLSX from 'xlsx';
import { Container } from 'react-bootstrap';
import SpellingTable from '../component/SpellingTable';

const SpellingCheckerPage = () => {
    const [show, setShow] = useState(false);
    const [renderedFile, setRenderedFile] = useState({});

    const randomFunction = (e) => {
        setShow(false)
        const fileCheck = {}
        fileCheck.name = e.target.files[0].name
        readExcel(e.target.files[0], fileCheck)
        setRenderedFile(fileCheck)
    }

      const readExcel = (file, fileCheck) => {
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
          fileCheck.data = data
        })
        
      }

      const showTable = () => {
        if(Object.keys(renderedFile).length === 0) {
          
        } else {
          setShow(true)
        }
      }
    return (
        <Container fluid>
            <h1>Spelling Checker</h1>
            <div>
                <input onInput={randomFunction} type="file" />
            </div>

            {show && renderedFile && <SpellingTable file={renderedFile} /> }
            <button type="button" className="btn btn-dark m-3" onClick={showTable} >Display Table</button>
        </Container>
    )
}

export default SpellingCheckerPage
