import { useState, useEffect, useRef } from "react";
import Board from "../Board/Board.tsx";
import style from "./App.module.scss";
import Statistics from "../Statistics/Statistics.tsx";

export interface Users {
  gender: string,
  name: {
    first: string,
    last: string
  },
  email: string,
  picture: {
    medium: string
  },
  phone: string,
  dob: {
    date: string,
    age: number,
  },
  location: {
    city: string,
    state: string,
    country: string,
  }
}

function App() {

  const [data, setData] = useState<Users[]>( [] );
  const [isReady, setIsReady] = useState( false );
  const [inputValue, setInputValue] = useState( '' );
  const [sortedData, setSortedData] = useState<Users[]>( [] );


  const initialized = useRef( false )

  useEffect( () => {
    if ( !initialized.current ) {
      initialized.current = true
      fetch( 'https://randomuser.me/api/?results=500' )
        .then( response => {
          return response.json();
        } )
        .then( res => {
          setData( res.results )
          setIsReady( true )
        } )
    }

  }, [isReady] );
  useEffect( () => {
    searchUsers( data, inputValue )
  }, [inputValue] );

  const changeInitialized = () => {
    initialized.current = false
  }
  const deleteCard = ( email: string ) => {
    const res = data.filter( item => item.email !== email )
    setData( res )
  }

  const searchUsers = ( users: Users[], searchTerm: string ) => {
    const results = users.filter( ( user ) => {
      const valuesToSearch = [
        user.name.first,
        user.name.last,
        user.email,
        user.phone,
        user.dob.age.toString(),
        user.location.city,
        user.location.state,
        user.location.country,
      ];

      for ( const value of valuesToSearch ) {
        if ( value.toLowerCase().includes( searchTerm.toLowerCase() ) ) {
          return true;
        }
      }
      return false;
    } );
    setSortedData( results )

  }

  return (
    < div className={style.container}>
      <div className={style.header}>
        <input
          value={inputValue}
          onChange={e => {
            setInputValue( e.target.value )
          }}
          onBlur={() => setInputValue( '' )}
          className={style.input} type="text"
          placeholder={'Search'}/>
        <button className={style.btn} onClick={() => {
          setIsReady( false )
          changeInitialized()
        }}>
          Refresh Users
        </button>
      </div>
      <div className={style.main}>
        {inputValue ?
          <Board status={isReady} data={sortedData} deleteCard={deleteCard}/> :
          <Board status={isReady} data={data} deleteCard={deleteCard}/>}
        <Statistics data={data}/>
      </div>
    </div>
  )
}

export default App
