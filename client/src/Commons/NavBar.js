import { useNavigate } from "react-router-dom";


function NavBar(){
  const navigate = useNavigate();

    return <div className="w-parent flex flex-row justify-between shadow-md p-2 sticky top-0 z-10 bg-white">
        <div className="my-auto text-lg cursor-pointer" onClick={()=>{
            navigate(`/`)
        }}>Tracker</div>
        <button className="border-2 p-1 rounded-xl bg-blue-100 hover:bg-blue-300 ">Sign In</button>
    </div>
}

export default NavBar;