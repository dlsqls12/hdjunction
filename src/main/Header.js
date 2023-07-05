import { useDispatch, useSelector } from 'react-redux';
import { setShapeType } from '../app/main/headerSlice';
import COMMON_CONST from '../common/constants';
import { clearDrawList, removeDrawList } from '../app/main/contentSlice';

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

  const clickDelete = (e) => {
    if (window.confirm('선택된 도형을 삭제하시겠습니까?')) {
      console.log(e);
      dispatch(removeDrawList(selectedShape));
    }
  }

  return (
    <div className="header">
      <button onClick={clickRect}>Rectangle</button>
      <button onClick={clickCircle}>Circle</button>
      <button onClick={clickClear}>Clear</button>
      <button onClick={clickDelete}>Delete</button>
    </div>
  );
}

export default Header;