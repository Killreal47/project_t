import style from './Statistics.module.scss';
import { useEffect, useState } from "react";
import { Users } from "../App/App.tsx";

interface UsersStat {
  male: number,
  female: number,
  ageGroup: {
    "11-20": number,
    "21-30": number,
    "31-40": number,
    "41-50": number,
    "51+": number,
  }
}

const Statistics = ( { data }: {data: Users[]} ) => {

  const [usersStat, setUsersStat] = useState<UsersStat>( {
    male: 0,
    female: 0,
    ageGroup: {
      "11-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51+": 0,
    }
  } );

  useEffect( () => {
    countUsers( data );
  }, [data] );

  const countUsers = ( users: Users[] ) => {
    let maleCount = 0;
    let femaleCount = 0;
    const ageGroups = {
      "11-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51+": 0,
    };

    users.forEach( ( user ) => {
      if ( user.gender === "male" ) {
        maleCount++;
      } else if ( user.gender === "female" ) {
        femaleCount++;
      }

      if ( user.dob.age >= 11 && user.dob.age <= 20 ) {
        ageGroups[ "11-20" ]++;
      } else if ( user.dob.age > 20 && user.dob.age <= 30 ) {
        ageGroups[ "21-30" ]++;
      } else if ( user.dob.age > 30 && user.dob.age <= 40 ) {
        ageGroups[ "31-40" ]++;
      } else if ( user.dob.age > 40 && user.dob.age <= 50 ) {
        ageGroups[ "41-50" ]++;
      } else if ( user.dob.age > 50 ) {
        ageGroups[ "51+" ]++;
      }
    } );

    setUsersStat( prev =>
      ({ ...prev, male: maleCount, female: femaleCount, ageGroup: ageGroups })
    );
  }


  return (
    <div className={style.statics}>
      <p className={style.countUser}>{data.length} Users</p>
      <div className={style.line}></div>
      <p className={style.headers}>Age Group</p>
      <div className={style.staticsGroup}>
        <div>
          <p className={style.staticsHeading}>11 to 20</p>
          <p className={style.staticsHeading}>21 to 30</p>
          <p className={style.staticsHeading}>31 to 40</p>
          <p className={style.staticsHeading}>41 to 50</p>
          <p className={style.staticsHeading}>51+</p>
        </div>
        <div>
          <p className={style.staticsCountUsers}>{usersStat.ageGroup[ "11-20" ]}</p>
          <p className={style.staticsCountUsers}>{usersStat.ageGroup[ "21-30" ]}</p>
          <p className={style.staticsCountUsers}>{usersStat.ageGroup[ "31-40" ]}</p>
          <p className={style.staticsCountUsers}>{usersStat.ageGroup[ "41-50" ]}</p>
          <p className={style.staticsCountUsers}>{usersStat.ageGroup[ "51+" ]}</p>
        </div>
      </div>
      <div className={style.line}></div>
      <p className={style.headers}>Gender Groups</p>
      <div className={style.staticsGroup}>
        <div>
          <p className={style.staticsHeading}>Male</p>
          <p className={style.staticsHeading}>Female</p>
        </div>
        <div>
          <p className={style.staticsCountUsers}>{usersStat.male} users</p>
          <p className={style.staticsCountUsers}>{usersStat.female} users</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;