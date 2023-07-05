import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDrawList, removeDrawList, setSelectedShape } from '../app/main/contentSlice';
import COMMON_CONST from '../common/constants';
import * as commonUtils from '../common/commonUtils';

let isSave = false;
let isDrawing = false;
let isDraging = false;
let timer;

function Contents() {
  const dispatch = useDispatch();
  const shapeType = useSelector((state) => state.header.shapeType);
  const drawList = useSelector((state) => state.content.drawList);
  const selectedShape = useSelector((state) => state.content.selectedShape);
  const [drawObj, setDrawObj] = useState({});

  useEffect(() => {
    if (isSave) {
      dispatch(addDrawList(drawObj));
      setDrawObj({});
      isSave = false;
    }
  }, [drawObj]);

  // 그리기 시작
  const mouseDownContents = (event) => {
    event.preventDefault();
    // 선택된 도형에서 한번 더 마우스 누를 경우 드래그 모드
    if (selectedShape === Number.parseInt(event.target.id) && !isDraging) {
      // drawList에서 선택된 도형 찾음
      const selectedShapeObj = drawList.find((item, index) => index === selectedShape);
      // 선택된 도형 기존 리스트에서 삭제
      dispatch(removeDrawList(selectedShape));
      setDrawObj({
        ...selectedShapeObj,
        orgGapY: event.pageY - selectedShapeObj.style.top,
        orgGapX: event.pageX - selectedShapeObj.style.left
      });
      isDraging = true;

    } else {
      if (!isDrawing) {
        timer = setTimeout(() => {
          // 컬러 랜덤 생성
          let drawStyle = {
            type: shapeType,
            orgY: event.pageY,
            orgX: event.pageX,
            style: {
              position: 'absolute',
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: '#aaa',
              top: event.pageY,
              left: event.pageX,
              height: '1px',
              width: '1px'
            }
          }
          // Circle일때 borderRadius 50%
          if (shapeType === COMMON_CONST.SHAPE_TYPE_CIRCLE) {
            drawStyle.style.borderRadius = '50%'
          }
          setDrawObj(drawStyle);
          isDrawing = true;
        }, 100);
      }
    }
  }

  // 그리는 중
  const mouseMoveContents = (event) => {
    event.preventDefault();
    // 드래그 모드
    if (isDraging) {
      const pageY = event.pageY, pageX = event.pageX;
      const orgGapX = drawObj.orgGapX, orgGapY = drawObj.orgGapY;

      setDrawObj({
        ...drawObj,
        style: {
          ...drawObj.style,
          top: pageY - orgGapY,
          left: pageX - orgGapX
        }
      });


    // 그리기 모드
    } else if (isDrawing) {
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
  }

  // 그리기 끝
  const mouseUpContents = (event) => {
    event.preventDefault();
    clearTimeout(timer);

    if (isDraging) {
      isDraging = false;
      dispatch(addDrawList(drawObj));
      setDrawObj({});
      
    } else if (isDrawing) {
      isDrawing = false;
      isSave = true;
      
      setDrawObj({
        ...drawObj,
        style: {
          ...drawObj.style,
          backgroundColor: commonUtils.createRandomColorCode()
        }
      });
    }

  }

  
  const clickShape = (index) => {
    if (!isDrawing) {
      dispatch(setSelectedShape(index));
    }
  }

  return (
    <div className="contents" onMouseDown={mouseDownContents} onMouseMove={mouseMoveContents} onMouseUp={mouseUpContents}>
      {drawList && drawList.map((item, index) => (
        <div id={index} key={index} style={{...item.style, 
          zIndex: index, 
          borderColor: selectedShape === index ? '#00ccff' : item.style.borderColor
        }} onClick={() => {clickShape(index)}}/>
      ))}
      <div key="selected" style={{...drawObj.style, zIndex:9999}} />
    </div>
  );
}

export default Contents;