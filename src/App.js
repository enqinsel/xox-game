import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const list = ['', 'X', 'O']

  const [data, setData] = useState([])
  const [isOk, setOk] = useState(false)
  const [columns, setColumns] = useState([])
  const [diagonals, setDiagonals] = useState([])

  const start = () => {
    const boxes = [];

    for (let i = 0; i < 3; i++) {
      boxes.push([])
      for (let j = 0; j < 3; j++) {
        boxes[i].push({
          name: list[0],
          className: selectClassName(list[0])
        })
      }
    }


    let columns = []
    let diagonals = [[], []]
    for (let i = 0; i < boxes.length; i++) {
      columns.push([])
      for (let j = 0; j < boxes.length; j++) {
        columns[i].push(boxes[j][i])
      }

      diagonals[0].push(boxes[i][i])
      let oppositeIndex = (boxes.length - 1 - i);
      diagonals[1].push(boxes[i][oppositeIndex])
    }

    setColumns(columns)
    setDiagonals(diagonals)
    setData(boxes)

  }

  const selectClassName = (name) => {
    if (name == "X" || name == "O") {
      return name;
    }
    else if (name == "") {
      return 'box';
    }
  }

  useEffect(() => {
    start();
  }, []);

  const open = (rowIndex, columnIndex) => {
    let newData = [...data];
    let item = newData[rowIndex][columnIndex];
    let indexOfItem = list.indexOf(item.name);
    if (indexOfItem > -1 && indexOfItem < list.length - 1) {
      item.name = list[indexOfItem + 1]
    } else {
      item.name = list[0]
    }

    item.className = selectClassName(item.name)

    check(newData)

    setData(newData)
  }

  const check = (rows) => {
    if (isOk) {
      let newData = [...data];
      for (let i = 0; i < newData.length; i++) {
        const arr = newData[i];
        for (let j = 0; j < arr.length; j++) {
          const item = arr[j];
          item.className = 'box'
          item.className = 'box'
          item.name = '';
        }
      }

      setData(newData);
      setOk(false);
      return;
    }

    let winnerRow = []
    let winnerBorderClass = '';
    let win = false;

    for (let i = 0; i < rows.length; i++) {
      const item = rows[i];
      let x = item.every(x => x.name == 'X')
      if (x) { win = x; winnerRow = item; winnerBorderClass = 'winX'; break; }
      let o = item.every(x => x.name == 'O')
      if (o) { win = o; winnerRow = item; winnerBorderClass = 'winO'; break; }
    }

    if (!win) {
      for (let i = 0; i < columns.length; i++) {
        const item = columns[i];
        let x = item.every(x => x.name == 'X')
        if (x) { win = x; winnerRow = item; winnerBorderClass = 'winX'; break; }
        let o = item.every(x => x.name == 'O')
        if (o) { win = o; winnerRow = item; winnerBorderClass = 'winO'; break; }
      }
    }

    if (!win) {
      for (let i = 0; i < diagonals.length; i++) {
        const item = diagonals[i];
        let x = item.every(x => x.name == 'X')
        if (x) { win = x; winnerRow = item; winnerBorderClass = 'winX'; break; }
        let o = item.every(x => x.name == 'O')
        if (o) { win = o; winnerRow = item; winnerBorderClass = 'winO'; break; }
      }
    }

    if (win) {
      for (const row of winnerRow) {
        row.className = row.className + " " + winnerBorderClass;
      }
    }

    setOk(win);
  }

  return (
    <div className='container' >
      <div className='text' > GAME TIME </div>
      <div className="block">
        {
          data.map((arr, rowIndex) =>
            arr.map((item, columnIndex) =>
              <div style={{ userSelect: 'none' }} key={rowIndex + '' + columnIndex} className={item.className}
                onClick={() => open(rowIndex, columnIndex)}>{item.name}
              </div>
            )
          )
        }

      </div>

    </div>
  );
}

export default App;
