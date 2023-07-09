import SectionTitle from '../SectionTitle/SectionTitle.js';
import studentPhoto from '../../../images/student.jpg';
import { DATE_BIRTH } from '../../../utils/constants.js';
import getEndLine from '../../../utils/getEndLine.js';

function Student() {
  const getAge = ({ birthDate, dateTitles }) => {
    const nowDate = new Date(),
          addOne = nowDate.getMonth() - birthDate.getMonth() >= 0
            && nowDate.getDate() - birthDate.getDate() >= 0,
          diff = nowDate.getFullYear() - birthDate.getFullYear(),
          res = diff - 1 + (addOne ? 1 : 0);

    return getEndLine(res, dateTitles);
  };

  return (
    <section
      id="student"
      className="student">
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
            Фронтенд-разработчик, {getAge(DATE_BIRTH)}
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
  );
};

export default Student;
