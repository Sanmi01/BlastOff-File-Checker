import logo from './logo.svg';
import './App.css';
import * as XLSX from 'xlsx';

function App() {

  const checkAnswer = (data) => {
    data.forEach((item, index) => {
      if((item.Answer === item.A) || (item.Answer === item.B) ||(item.Answer === item.C) ||(item.Answer === item.D)) {
      } else {
        console.log("Answer does not match Option")
      }
    });
  }

  const checkDuplicateOptions = (data) => {
    data.forEach((item, index) => {
      if((item.A === item.B) || (item.A === item.C) || (item.A === item.D) || (item.B === item.C) || (item.B === item.D) || (item.C === item.D)) {
        console.log("Duplicate Options")
        console.log(index)
      }
    })
  }

  const readExcel = (file) => {

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
      console.log(data)
      checkAnswer(data)
      checkDuplicateOptions(data)
    
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
    </div>
  );
}

export default App;
