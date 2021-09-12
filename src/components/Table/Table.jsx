import React from "react";

export function Table(props) {
  return (
    <div className={"col-lg-12 " + props.size}>
      <div className="card mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">{props.name}</h6>
        </div>
        <div className="table-responsive p-3">
          <table className="table align-items-center table-flush table-hover" id="dataTableHover">
            <thead className="thead-light">
              <tr>
                {props.content.columns.map((data, key) => {
                  return <th key={key}>{data}</th>;
                })}
              </tr>
            </thead>
            <tfoot>
              <tr>
                {props.content.columns.map((data, key) => {
                  return <th key={key}>{data}</th>;
                })}
              </tr>
            </tfoot>
            <tbody>
              {props.content.values.map((data, key) => {
                return (
                  <tr key={key}>
                    {data.map((dataValue, keyValue) => {
                      return <td key={keyValue}>{dataValue}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
