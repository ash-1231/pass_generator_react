import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, SetPassword] = useState("")
  //useRef
  const passwordRef=useRef(null)


  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*(){}"
    }

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    SetPassword(pass)

  }, [length, numAllowed, charAllowed, SetPassword])

  const copytoClipboard = useCallback(()=>{
    passwordRef.current?.select() 
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => { passGenerator() }, [length, numAllowed, charAllowed, passGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-l-lg px-4 my-8 text-orange-500 bg-gray-800">
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none bg-white w-full py-2 px-3' placeholder='password' readOnly ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-1 shrink-1 ' onClick={copytoClipboard}>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => { setLength(e.target.value) }} />
            <label>length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 '>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }} />
            <label htmlFor='numberInput'>Numbers</label>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }} />
            <label htmlFor='charInput'>Characters</label>


          </div>
        </div>

      </div>
    </>
  )

}

export default App
