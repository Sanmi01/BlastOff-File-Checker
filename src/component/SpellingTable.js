import React from 'react'

const SpellingTable = ({file}) => {
    return (
        <div className="errorTable p-2 m-1">
      <h3>{file.name}</h3>
      {file && <><h4>Question Table</h4>
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
          </tr>
        </thead>
        <tbody>
          {file.data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td contentEditable='true' suppressContentEditableWarning={true} data-enable-grammarly="true">{item.Question}</td>
              <td>{item.Category}</td>
              <td>{item.A}</td>
              <td>{item.B}</td>
              <td>{item.C}</td>
              <td>{item.D}</td>
              <td>{item.Answer}</td>
              <td contentEditable='true' suppressContentEditableWarning={true} data-enable-grammarly="true">{item.Hint}</td>
            </tr>
          ))}
          <tr style={{ 'visibility': 'hidden' }} key="ignore">
              <td>Ignore</td>
              <td contentEditable='true' suppressContentEditableWarning={true} data-enable-grammarly="true">In the Bible (Judges Chapter 7), who were the two Midianite princes taken prisoner by the tribe of Ephraim?</td>
              <td>Ignore</td>
              <td>Ignore</td>
              <td>Ignore</td>
              <td>Ignore</td>
              <td>Ignore</td>
              <td>Ignore</td>
              <td contentEditable='true' suppressContentEditableWarning={true} data-enable-grammarly="true">In the Bible (Judges Chapter 7), who were the two Midianite princes taken prisoner by the tribe of Ephraim?</td>
            </tr>
        </tbody>
      </table>
      </>
      }
      
    </div>
    )
}

export default SpellingTable
