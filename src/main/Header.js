function Header() {
  const clear = () => {
    
  }

  return (
    <div className="header">
    <button onClick={()=>{
      alert('rectangle');
    }}>rectangle</button>
    <button onClick={()=>{
      alert('circle');
    }}>circle</button>
    <button onClick={()=>{
      alert('clear');
    }}>clear</button>
    </div>
  );
}

export default Header;