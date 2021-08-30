/**
 * @reference https://blog.logrocket.com/rendering-large-lists-with-react-virtualized-82741907a6b3/
 */

import * as React from "react";
import { loremIpsum } from "lorem-ipsum";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
  WindowScroller,
} from "react-virtualized";
import logo from "./logo.svg";
import "./App.css";

const list = Array(1000)
  .fill()
  .map((val, index) => {
    return {
      id: index,
      name: "jon doe",
      image: "http://via.placeholder.com/40",
      text: loremIpsum({
        count: 1,
        units: "sentences",
        sentenceLowerBound: 4,
        sentenceUpperBound: 100,
      }),
    };
  });

function App() {
  const [cache] = React.useState(() => {
    return new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
  });

  const renderRow = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style} className="row">
          <div className="image">
            <img src={list[index].image} alt="" />
          </div>
          <div className="content">
            <div>{list[index].name}</div>
            <div>{list[index].text}</div>
          </div>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="list">
        <WindowScroller>
          {({ width, height, scrollTop }) => (
            <List
              autoHeight
              width={width}
              height={height}
              scrollTop={scrollTop}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={renderRow}
              rowCount={list.length}
              overscanRowCount={1}
            />
          )}
        </WindowScroller>
      </div>
    </div>
  );
}

export default App;
