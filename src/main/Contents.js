function Contents() {
  let isDraw = false;
  const mouseDown = (event) => {
    console.log('mouseDown');
    isDraw = true;
    console.log(event);
  }
  const mouseMove = (event) => {           
    if (isDraw) {
      console.log('mouseMove');
    }
  }
  const mouseUp = (event) => {
    console.log('mouseUp');
    isDraw = false;
    console.log(event);
  }

  return (
    <div className="contents" onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp}>
      <div style={{
        position: 'absolute'
        , border: '1px solid #aaa'
        , borderRadius: '50%'
        , top: '0px'
        , left: '0px'
        , width: '200px'
        , height: '140px'
      }}></div>
      <div style={{
        position: 'absolute'
        , border: '1px solid #aaa'
        , top: '300px'
        , left: '350px'
        , width: '200px'
        , height: '140px'
      }}></div>
    </div>
  );
}

export default Contents;