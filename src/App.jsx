import { useCallback, useEffect, useState, useRef } from "react"
import "./App.css"


function App() {
  const [length, setLength] = useState(8); // 8 is default
  const[numberAllowed, setNumberAllowed] = useState(false); 
  const[charAllowed,setCharAllowed] = useState(false);
  const[password, setPassword] = useState("")

  //useRef hook : ye refrence k liy use hua h 
  const passwordRef = useRef(null)
  
  // ye ek function lega nd dependencies lega
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str+= "@#$%^&*_+{}[]~`!<>"

    for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1 )
        // yha index value aa jayegi string m s pr uska char nh aya yha pr
        // jo b character ayega br br usko  ye yha add krta jayega length ki value k according...      
        pass += str.charAt(char); // ish index pr jo m char hoga usko ye le lega
      }

      setPassword(pass); // aur is pass ko hum set password m dal denge

  }, [length, numberAllowed, charAllowed, setPassword]); // ye sb dependencies h
  

  const copyToClipBoard = useCallback(()=>{
    passwordRef.current?.select(); // yha ? isliy aya h qki ky pta kch b nh ho to ohle check krega kch h ya nh
    // kitna select krna h kis range tk:
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  }, [password] )


  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-pink-500">

      <h1 className=" text-center text-4xl text-white mb-4">PassWord Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text" 
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />

        <button onClick={copyToClipBoard} className="outline-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-0.5 shrink-0">Copy</button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer mr-2"
            onChange={(e)=>{setLength(e.target.value)}}          
            />
            <label>Length : {length} </label>

            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            className=" ml-3"
            onChange={()=>{
              setNumberAllowed((prev) => !prev); // previous value reverse ho jayegi yha pr
            }}          
            />
            <label htmlFor="numberInput">Number</label>
            
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            className=" ml-3"
            onChange={()=>{
              setCharAllowed((prev) => !prev); // previous value reverse ho jayegi yha pr
            }}          
            />
            <label htmlFor="charInput">Character</label>

        </div>
      </div>


    </div>
  )
}

export default App
