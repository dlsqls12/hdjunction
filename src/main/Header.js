import { useDispatch, useSelector } from 'react-redux';
import { setShapeType } from '../app/main/headerSlice';
import COMMON_CONST from '../common/constants';
import { clearDrawList, removeDrawList, setLastIndex, setFirstIndex } from '../app/main/contentSlice';

function Header() {
  const dispatch = useDispatch();
  const selectedShape = useSelector((state) => state.content.selectedShape);

  const clickRect = () => {
    dispatch(setShapeType(COMMON_CONST.SHAPE_TYPE_RECT));
  }

  const clickCircle = () => {
    dispatch(setShapeType(COMMON_CONST.SHAPE_TYPE_CIRCLE));
  }

  const clickClear = () => {
    if (window.confirm('도형을 전부 삭제하시겠습니까?')) {
      dispatch(clearDrawList());
    }
  }

  const clickDelete = (event) => {
    if (window.confirm('선택된 도형을 삭제하시겠습니까?')) {
      dispatch(removeDrawList(selectedShape));
    }
  }

  const clickMoveFront = (event) => {
    if (selectedShape > -1) {
      dispatch(setLastIndex(selectedShape));
    }
  }
  
  const clickMoveBack = (event) => {
    if (selectedShape > -1) {
      dispatch(setFirstIndex(selectedShape));
    }
  }

  return (
    <div className="header">
      <button onClick={clickRect}>사각형</button>
      <button onClick={clickCircle}>원</button>
      <button onClick={clickClear}>초기화</button>
      <button onClick={clickDelete}>선택삭제</button>
      <button onClick={clickMoveFront}>맨 앞으로</button>
      <button onClick={clickMoveBack}>맨 뒤로</button>
    </div>
  );
}

export default Header;