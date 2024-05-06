import style from './Card.module.scss';
import { Users } from "../App/App.tsx";
import { useState } from "react";
import deleteBtn from '../../assets/img/delete_btn.svg'

interface CardProps {
  data: Users,
  deleteCard: ( email: string ) => void
}

const Card = ( { data, deleteCard }: CardProps ) => {

  const [clickedCard, setClickedCard] = useState( false )

  const {
    name: { first, last },
    email,
    picture: { medium },
    phone,
    dob: { date },
    location: { city, state, country }
  } = data


  const renderName = () => {
    let name = `${first} ${last}`;
    if ( name.length > 17 ) {
      name = name.slice( 0, 29 ) + '...';
    }
    return name;
  }

  const renderDate = () => {
    const dateObj = new Date( Date.parse( date ) );
    return dateObj.toLocaleDateString( 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' } );
  }

  const renderAddress = () => {
    let address = `${city}, ${state}, ${country}`;
    if ( address.length > 29 ) {
      address = address.slice( 0, 29 ) + '...';
    }
    return address;
  }

  return (
    <div className={clickedCard ? style.cardActive : style.card} onClick={() => setClickedCard( !clickedCard )}>
      <div className={style.header}>
        <img className={style.headerImage} src={medium} alt="User Photo"/>
        <div>
          <p
            className={style.headerName}>{renderName()}</p>
          <p>{email} </p>
        </div>
      </div>
      <div className={style.main}>
        <div className={style.mainBox}>
          <p className={style.mainHeading}>Phone No</p>
          <p className={style.mainHeading}>Birthday</p>
          <p className={style.mainHeading}>Address</p>
        </div>
        <div>
          <p className={style.mainText}>{phone}</p>
          <p className={style.mainText}>{renderDate()}</p>
          <p className={style.mainText}>{renderAddress()}</p>
        </div>
      </div>
      <div
        className={clickedCard ? style.btnDelete : style.hide}
        onClick={() => deleteCard( email )}
      >
        <img src={deleteBtn} alt=""/>
      </div>
    </div>
  );
};

export default Card;