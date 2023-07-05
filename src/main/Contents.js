import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDrawList, setSelectedShape } from '../app/main/contentSlice';
import COMMON_CONST from '../common/constants';

function Contents() {
  const dispatch = useDispatch();
  const shapeType = useSelector((state) => state.header.shapeType);
  const drawList = useSelector((state) => state.content.drawList);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawObj, setDrawObj] = useState({});
  // const [drawList, setDrawList] = useState(() => {
  //   const localDrawList = localStorage.getItem('drawList');
  //   if (localDrawList) {
  //     return JSON.parse(localDrawList);

  //   } else {
  //     return [];
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem('drawList', JSON.stringify(drawList));
  // }, [drawList]);
  let timer;

  // 그리기 시작
  const mouseDownContents = (event) => {
    console.log(event);
    if (!isDrawing) {
      timer = setTimeout(() => {
        let drawStyle = {
          type: shapeType,
          orgY: event.pageY,
          orgX: event.pageX,
          style: {
            position: 'absolute',
            border: '1px solid #aaa',
            top: event.pageY,
            left: event.pageX,
            width: '1px',
            height: '1px'
          }
        }
        // Circle일때 borderRadius 50%
        if (shapeType === COMMON_CONST.SHAPE_TYPE_CIRCLE) {
          drawStyle.style.borderRadius = '50%'
        }
        setDrawObj(drawStyle);
        setIsDrawing(true);
      }, 100);
    }
    event.preventDefault();
  }

  // 그리는 중
  const mouseMoveContents = (event) => {
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
  const mouseUpContents = (event) => {
    clearTimeout(timer);
    if (isDrawing) {
      setIsDrawing(false);

      // setDrawList([...drawList, drawObj]);
      dispatch(addDrawList(drawObj));
      setDrawObj({});
    }
    event.preventDefault();
  }

  
  const clickShape = (index) => {
    if (!isDrawing) {
      console.log(index);
      dispatch(setSelectedShape(index));
    }
  }

  return (
    <div className="contents" onMouseDown={mouseDownContents} onMouseMove={mouseMoveContents} onMouseUp={mouseUpContents}>
      {drawList.map((item, index) => (
        <div key={index} style={item.style} onClick={() => {clickShape(index)}}/>
      ))}
      <div key="selected" style={drawObj.style} />
    </div>
  );
}

export default Contents;