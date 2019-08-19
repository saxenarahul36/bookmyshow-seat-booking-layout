import React from "react";

const SeatLayOutComponent = props => {
  return (
    <table className="table" align="center">
      <thead>
        <tr>
          <td className="prise" colSpan="16">
            <span>CLUBE- RS- 450.</span>
            <hr />
          </td>
        </tr>
      </thead>
      <tbody>
        {props.seatLayout &&
          props.seatLayout.map((item, index) => {
            const ele = item.map((el, i) => {
              if (i === 0) return <td key={Math.random()}>{el.row}</td>;
              let seat = "empty";
              if (el.seatAvailable === "booked") {
                seat = "seat-disable";
              }
              if (el.seatAvailable === "selected") {
                seat = "selected";
              }
              const td = el.seatId ? (
                <td
                  key={Math.random()}
                  className={seat}
                  onClick={e => props.selectSeat(el, e, item)}
                >
                  <a href="#">{el.seatId}</a>
                </td>
              ) : (
                <td key={Math.random()} className="freespace" />
              );

              return td;
            });

            const rowElement =
              index === 2 ? (
                <tr key={Math.random()}>
                  <td key={Math.random()} className="prise" colSpan="16">
                    <span>EXECUTIVE-RS 236.</span>
                    <hr />
                  </td>
                </tr>
              ) : (
                <tr key={Math.random()}>{ele}</tr>
              );
            return rowElement;
          })}
      </tbody>
    </table>
  );
};

export default SeatLayOutComponent;
