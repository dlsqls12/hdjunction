import { useEffect, useState } from 'react';

function Contents() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawObj, setDrawObj] = useState({});
  const [drawList, setDrawList] = useState(() => {
    const localDrawList = localStorage.getItem('drawList');
    if (localDrawList) {
      return JSON.parse(localDrawList);

    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('drawList', JSON.stringify(drawList));
  }, [drawList]);

  // 그리기 시작
  const mouseDown = (event) => {
    if (!isDrawing) {
      setDrawObj({
        orgY: event.pageY
        , orgX: event.pageX
        , style: {
          position: 'absolute'
          , border: '1px solid #aaa'
          , top: event.pageY
          , left: event.pageX
          , width: '1px'
          , height: '1px'
        }
      });
      setIsDrawing(true);
    }
    event.preventDefault();
  }

  // 그리는 중
  const mouseMove = (event) => {
    if (isDrawing) {
      const pageY = event.pageY, pageX = event.pageX;
      const orgX = drawObj.orgX, orgY = drawObj.orgY;
      let width, height, left, top;

      if (pageX >= orgX) {
        width = pageX - orgX;
        left = drawObj.style.left

      } else {
        width = orgX - pageX;
        left = pageX;
      }

      if (pageY >= orgY) {
        height = pageY - orgY;
        top = drawObj.style.top

      } else {
        height = orgY - pageY;
        top = pageY;
      }

      setDrawObj({
        ...drawObj,
        style: {
          ...drawObj.style,
          top: top,
          left: left,
          width: width + 'px',
          height: height + 'px'
        }
      });
    }
    event.preventDefault();
  }

  // 그리기 끝
  const mouseUp = (event) => {
    if (isDrawing) {
      setIsDrawing(false);

      setDrawList([...drawList, drawObj]);
      setDrawObj({});
    }
    event.preventDefault();
  }

  return (
    <div className="contents" onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
      {drawList.map((item, index) => (
        <div key={index} style={item.style}/>
      ))}
      <div key="selected" style={drawObj.style} />
    </div>
  );
}

export default Contents;