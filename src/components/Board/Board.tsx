import Card from "../Card/Card.tsx";
import { Users } from "../App/App.tsx";
import style from "./Board.module.scss";

interface BoardProps {
  data: Users[],
  status: boolean,
  deleteCard: ( email: string ) => void,

}

const Board = ( { data, status, deleteCard }: BoardProps ) => {

  const renderCards = () => {
    if ( status && data.length) {
      return (data.map( card => <Card key={card.dob.date} data={card} deleteCard={deleteCard}/> ))
    } else if ( data.length === 0  ) {
      return (<div className={style.loading}>Пользователя с такими данными не существует</div>)
    } else {
      return (<div className={style.loading}>Данные загружаются</div>)
    }
  }
  
  return (
    <div className={style.board}>
      {renderCards()}
    </div>
  );
};

export default Board;