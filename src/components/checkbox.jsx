export function checkbox(ident, value) {
  return (
    <div className="form-group">
      <div className="custom-control custom-checkbox small" style={{ lineHeight: "1.5rem" }}>
        <CustomCheck id={ident} value={value}></CustomCheck>
      </div>
    </div>
  );
}

const CustomCheck = (props) => {
  return (
    <>
      <input type="checkbox" className="custom-control-input" id={props.id} />
      <label className="custom-control-label" for={props.id}>
        {props.value}
      </label>
    </>
  );
};
