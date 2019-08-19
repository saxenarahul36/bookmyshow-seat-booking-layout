import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import seatLayoutList from "./seatLayout";
var tempSelected = [];
function App() {
  const [seatLayout, setSeatLayoutList] = useState(seatLayoutList);
  const [numberOfSeat, selectNumberOfseat] = useState(1);

  const updateSeatLayoutList = seat => {
    for (var k = 0; k < tempSelected.length; k++) {
      var val = tempSelected;
      for (var p = 0; p < seatLayout.length; p++) {
        var rows = seatLayout[p];
        for (var j = 0; j < rows.length; j++) {
          if (
            val[k].row === rows[j].row &&
            rows[j].seatAvailable === val[k].seatAvailable &&
            rows[j].seatId === val[k].seatId
          ) {
            seatLayout[p][j].seatAvailable = seat;
          }
        }
      }
    }
    var SeatList = JSON.parse(JSON.stringify(seatLayout));
    setSeatLayoutList(SeatList);
  };

  const selectSeat = (el, e, row) => {
    if (
      e.currentTarget.className === "seat-disable" ||
      e.currentTarget.className === "selected"
    ) {
      return;
    }
    if (!(tempSelected.length < numberOfSeat)) {
      updateSeatLayoutList("empty");
      tempSelected = [];
    }
    if (
      tempSelected.length > 0 &&
      !(el.seatType === tempSelected[0].seatType)
    ) {
      updateSeatLayoutList("empty");
      tempSelected = [];
    }

    for (var i = +el.seatId; i < row.length; i++) {
      if (el.row === row[0].row && "empty" === row[i].seatAvailable) {
        if (tempSelected.length < numberOfSeat) {
          tempSelected.push(row[i]);
        }
      } else {
        break;
      }
    }
    updateSeatLayoutList("selected");
    console.log(tempSelected);
  };
  return (
    <div className="App">
      <h3>How Many Seats ?</h3>
      <select
        onChange={e => {
          selectNumberOfseat(+e.target.value);
        }}
      >
        <option value="1" defaultValue>
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <table className="table" align="center">
        <thead>
          <tr>
            <td className="prise" colSpan="16">
              <span>CLUBE- RS- 236.</span>
              <hr />
            </td>
          </tr>
        </thead>
        <tbody>
          {seatLayout &&
            seatLayout.map((item, index) => {
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
                    onClick={e => selectSeat(el, e, item)}
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
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
