import React, {useEffect, useState} from 'react';
import './App.css';

const URL = "https://api.hatchways.io/assessment/students";

function App() {

  const [studentData, setStudentData] = useState([]); 
  const [data, setData] = useState(""); 
  const [tag, setTag] = useState([]);
  const [valueInp, setValue] = useState("");  
  
  const getStudents = (URL) => {
     fetch(URL)
      .then(response => response.json())
      .then(data => setStudentData(data.students))
      .catch(error => alert('Something went wrong!'));
  }

  useEffect(() => {
    getStudents(URL);
  }, []); 

  const filter = (stud, dat) => {

    const newObjec= (index) => {
      //stud.tag= "";
      const ind = index;
      return (
        <div>
          <form onSubmit=
          {
            (e) => 
              {
                e.preventDefault()
                setTag(valueInp)
              }
          }
          >
        <input
            key={index}
            type="text"
            value={stud.tag}
            onChange=
            {
              (e) =>
              {
                setValue(e.target.value)
              }
            }
            placeholder = {"Add Tag"}
        />
        <button type="submit" className="button" >
          Add Tag
        </button>
        <p>{tag}</p>
        <button onClick={(e) => {
              e.preventDefault()
              setTag("")
            }
          } className="button">
          Erase
        </button>
        </form>
        </div>
        )
    }

    if (dat === '')
    {
      return (
        stud.map((nam, index) => {
          let fullName = nam.firstName + ' ' + nam.lastName;
          let total = 0;
          let arrNumbers = nam.grades;
          for (let i = 0; i < arrNumbers.length; i++){
            total += Math.floor(arrNumbers[i]);
          }
          let average = total/arrNumbers.length;
          
          return (
              <>
                <img src={nam.pic} />
                <div className="box" key={index}>
                  <p style={{fontWeight: "bold"}} className="name">{fullName}</p>
                  <p>Email: {nam.email}</p>
                  <p>Company: {nam.company}</p>
                  <p>Skill: {nam.skill}</p>
                  <p>Average: {average}</p>
                  <div>{newObjec(nam, index)}</div>
                </div>
              </>
          )
        }) // map method
      ); //Main return
    }// Main If
    
    else
    { 
      return (
        stud.map((nam, index) => {
          if (nam.firstName.toLowerCase().includes(data) || nam.lastName.toLowerCase().includes(data))
          {
            let fullName = nam.firstName + ' ' + nam.lastName;
            let total = 0;
            let arrNumbers = nam.grades;
            for (let i = 0; i < arrNumbers.length; i++){
              total += Math.floor(arrNumbers[i]);
            }
            let average = total/arrNumbers.length;
            
            return (
                <>
                  <img src={nam.pic} className="leftImag"/>
                  <div className="box">
                    <p style={{fontWeight: "bold"}} className="name">{fullName}</p>
                    <p>Email: {nam.email}</p>
                    <p>Company: {nam.company}</p>
                    <p>Skill: {nam.skill}</p>
                    <p>Average: {average}</p>
                    <div>{newObjec(nam, index)}</div>
                  </div>
                </>
            )
          }// If condition
          
          else
            return;
        }) // map method
      ); //Main return
    } // Main else condition
  }
  
  return (
    <main>
    <div>
      <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder = {"Search by name"}
          id="search" 
      />
    <div>{filter(studentData, data)}</div>
    </div>
    </main>
  )
}

export default App;