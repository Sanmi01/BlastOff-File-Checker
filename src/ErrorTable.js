const ErrorTable = ({ fileWithError }) => {
  return (
    <div className="errorTable p-3 m-3">
      <h3>{fileWithError.name}</h3>
      {fileWithError.duplicateErrors.length > 0 && <><h4>Duplicate Error Table</h4>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Category</th>
            <th scope="col">A</th>
            <th scope="col">B</th>
            <th scope="col">C</th>
            <th scope="col">D</th>
            <th scope="col">Answer</th>
            <th scope="col">Hint</th>
            <th scope="col">Error</th>
          </tr>
        </thead>
        <tbody>
          {fileWithError.duplicateErrors.map((item, index) => (
            <tr key={index}>
              {/* <th scope="row">1</th> */}
              <td>{item.Question}</td>
              <td>{item.Category}</td>
              <td>{item.A}</td>
              <td>{item.B}</td>
              <td>{item.C}</td>
              <td>{item.D}</td>
              <td>{item.Answer}</td>
              <td>{item.Hint}</td>
              <td>{item.ErrorMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      }

      {fileWithError.answerErrors.length > 0 && <><h4>Answer Error Table</h4>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Category</th>
            <th scope="col">A</th>
            <th scope="col">B</th>
            <th scope="col">C</th>
            <th scope="col">D</th>
            <th scope="col">Answer</th>
            <th scope="col">Hint</th>
            <th scope="col">Error</th>
          </tr>
        </thead>
        <tbody>
          {fileWithError.answerErrors.map((item, index) => (
            <tr key={index}>
              {/* <th scope="row">1</th> */}
              <td>{item.Question}</td>
              <td>{item.Category}</td>
              <td>{item.A}</td>
              <td>{item.B}</td>
              <td>{item.C}</td>
              <td>{item.D}</td>
              <td>{item.Answer}</td>
              <td>{item.Hint}</td>
              <td>{item.ErrorMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      }
      
    </div>
  );
};

export default ErrorTable;
