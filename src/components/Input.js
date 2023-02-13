// React Modules
import { useState } from "react";
const Input = () => {
    //Setting state with our application
    const [length,setLength] = useState('');
    const [queryLength,setQueryLength] = useState();
    //grabbing the value typed in by the user
    const handleLengthInputChange = (event) =>{
        setLength(event.target.value);
    }
    //updating the queryLength with value typed in by the user
    const handleLengthFormSubmit = (event) => {
       //stopping the default action of the form
       event.preventDefault();
        //removing the white space from the length text
       const controlledLengthInput = length.trim();
       //updating the queryLength state and clearing the input
       setQueryLength(controlledLengthInput);
       setLength(''); 
    }
    
    return(
        <form onSubmit={handleLengthFormSubmit}>
            <div class='box'>
                <label htmlFor='length'>length</label>
                <input 
                    placeholder='How long is your walk?'
                    type='text'
                    id='length'
                    onChange={handleLengthInputChange}
                    value={length}
                />
                <button class='next'onClick={handleLengthFormSubmit}>Next</button>
            </div>
        </form>
            // length={length}
            // handleLengthFormSubmit={handleLengthFormSubmit}
            // handleInputChange={handleInputChange}
        
    );
}

export default Input;

