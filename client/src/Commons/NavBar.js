import { useNavigate } from "react-router-dom";


function NavBar(){
  const navigate = useNavigate();

  const userid = localStorage.getItem("userid")

    return <div className="w-parent flex flex-row justify-between shadow-md px-6 py-2 sticky top-0 z-10 bg-white">
        <div className="my-auto text-lg cursor-pointer font-semibold" onClick={()=>{
            navigate(`/`)
        }}>Mind Cache AI</div>
        {userid?(
            <button className="border-2 px-4 py-2 rounded-xl bg-blue-200 hover:bg-blue-400 " onClick={()=>{
                navigate(`/signin`)
            }}>Analyse</button>
        ):(
            <button className="border-2 px-4 py-2 rounded-xl bg-blue-200 hover:bg-blue-400 " onClick={()=>{
                navigate(`/signin`)
            }}>Sign In</button>
        )}
        
    </div>
}

export default NavBar;