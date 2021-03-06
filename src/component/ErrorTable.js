const ErrorTable = ({ fileWithError }) => {
  return (
    <div className="errorTable p-2 m-1">
      <h3>{fileWithError.name}</h3>
      {fileWithError.duplicateErrors.length > 0 && <><h4>Duplicate Error Table</h4>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Row Number</th>
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
              <td>{item.Row + 2}</td>
              <td>{item.Question}</td>
              <td>{item.Category}</td>
              <td>{item.OptionA}</td>
              <td>{item.OptionB}</td>
              <td>{item.OptionC}</td>
              <td>{item.OptionD}</td>
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
            <th scope="col">Row Number</th>
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
              <td>{item.Row + 2}</td>
              <td>{item.Question}</td>
              <td>{item.Category}</td>
              <td>{item.OptionA}</td>
              <td>{item.OptionB}</td>
              <td>{item.OptionC}</td>
              <td>{item.OptionD}</td>
              <td>{item.Answer}</td>
              <td>{item.Hint}</td>
              <td>{item.ErrorMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      }

      {fileWithError.emptyOptionsErrors.length > 0 && <><h4>Empty Options Table</h4>
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
            <th scope="col">Error</th>
          </tr>
        </thead>
        <tbody>
          {fileWithError.emptyOptionsErrors.map((item, index) => (
            <tr key={index}>
              {/* <th scope="row">1</th> */}
              <td>{item.Row + 2}</td>
              <td>{item.Question}</td>
              <td>{item.Category}</td>
              <td>{item.OptionA}</td>
              <td>{item.OptionB}</td>
              <td>{item.OptionC}</td>
              <td>{item.OptionD}</td>
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
