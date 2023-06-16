import SectionTitle from '../SectionTitle/SectionTitle.js';
import studentPhoto from '../../../images/student.jpg';
import { birthDate } from '../../../utils/constants.js';

function Student() {
  function getAge({ birthDate, dateTitles }) {
    const nowDate = new Date(),
          addOne = nowDate.getMonth() - birthDate.getMonth() >= 0
                   && nowDate.getDate() - birthDate.getDate() >= 0,
          diff = nowDate.getFullYear() - birthDate.getFullYear(),
          res = diff - 1 + (addOne ? 1 : 0);

    return `${res} ${
      dateTitles[
        res % 10 === 1 && res % 100 !== 11
        ? 0
        : res % 10 >= 2 && res % 10 <= 4 && (res % 100 < 10 || res % 100 >= 20)
        ? 1
        : 2
      ]
    }`
  }

  return (
    <section className="student">
      <SectionTitle title="Студент"/>
      <div className="student__wrapper">
        <img
          className="student__photo"
          alt="Большой и добрый человек в худи с надписью 'все очень круто, но нужно переделать'"
          src={studentPhoto}/>
        <div className="student__column">
          <h3 className="student__title">
            Роман Кривопалов
          </h3>
          <p className="student__subtitle">
            Фронтенд-разработчик, {getAge(birthDate)}
          </p>
          <p className="student__text">
            UI/UX Дизайнер, моё призвание, хобби и&nbsp;профессия&nbsp;&mdash; дизайн. С&nbsp;2020 года занимаюсь веб разработкой. Люблю конструировать и&nbsp;проектировать пользовательские интерфейсы и&nbsp;воплощать их&nbsp;в&nbsp;жизнь, а&nbsp;точнее в&nbsp;экран :)
          </p>
          <a
            href='https://github.com/romankrivopalov'
            target='_blank'
            rel="noopener noreferrer"
            className="student__link">
            Github
          </a>
        </div>
      </div>
    </section>
  )
}

export default Student;
