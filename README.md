# Virtualizating lists in React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install react-virtualized@9.18.5`

Install the react virtualization library. 9.18.5 supports `scrollToIndex` feature. Newer versions of `react-virtualized` don't properly support this feature.

## Example

```jsx
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
import "./App.css";

const list = Array(1000)
  .fill()
  .map((val, index) => {
    if (index === 999) {
      return {
        id: index,
        name: "Rakesh shrestha from the top",
        image: "http://via.placeholder.com/40",
        text: loremIpsum({
          count: 1,
          units: "sentences",
          sentenceLowerBound: 4,
          sentenceUpperBound: 100,
        }),
      };
    }
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
  const [scrollIndex, setScrollIndex] = React.useState(999);
  const [cache] = React.useState(() => {
    return new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
  });

  const renderRow = ({ index, isScrolling, key, style, parent }) => {
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
    <div className="App test">
      <div className="list">
        <WindowScroller onScroll={() => setScrollIndex(-1)}>
          {({
            height,
            isScrolling,
            registerChild,
            onChildScroll,
            scrollTop,
          }) => (
            <div className="WindowScrollWrapper">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div ref={registerChild}>
                    <List
                      autoHeight
                      width={width}
                      isScrolling={isScrolling}
                      height={height}
                      scrollTop={scrollTop}
                      deferredMeasurementCache={cache}
                      rowHeight={cache.rowHeight}
                      rowRenderer={renderRow}
                      rowCount={list.length}
                      overscanRowCount={1}
                      onScroll={onChildScroll}
                      scrollToAlignment="start"
                      scrollToIndex={scrollIndex}
                    />
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
      </div>
    </div>
  );
}

export default App;
```
