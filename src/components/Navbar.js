import { Button } from "react-bootstrap";

export default function Navbar(){
    return(
    <div style={{ background: 'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)',height:100,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <div style={{textAlign:'center', fontWeight:800,color:'white',fontSize:25,fontFamily: 'Oswald, sans-serif',}}>FreezeNight Todo App</div>
    </div>
    )
}