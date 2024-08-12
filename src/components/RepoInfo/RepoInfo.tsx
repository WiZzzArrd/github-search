import { useAppSelector } from "../../store/hooks";
import style from "./style.module.scss";
import star from "../../assets/star.png";

export default function RepoInfo() {
  let item = useAppSelector((state) => state.repo.item); // Получение информации о текущем репозитории из состояния Redux

  // Если имя репозитория не пустое, получаем его темы, иначе возвращаем пустой массив
  let topics = item.name !== "" ? item.topics : [];

  return (
    <aside className={style.repoinfo}>
      {/* Если имя репозитория пустое, отображаем текст "Выберите репозиторий" */}
      {item.name === "" ? (
        <p className={style.choosing}>Выберите репозиторий</p>
      ) : (
        // Если репозиторий выбран, отображаем его информацию
        <div className={style.info}>
          <h3>{item.name}</h3>
          <div className={style.description}>
            <p>{item.description}</p>
            <span>
              <img src={star} alt='' />
              {item.stars}
            </span>
          </div>
          <div className={style.topics}>
            {/* Отображение списка тем (topics) репозитория */}
            {topics.map((i: string) => {
              return <span key={i}>{i}</span>;
            })}
          </div>
          {/* Лицензия репозитория, если она существует */}
          <span className={style.license}>{item.license?.name}</span>
        </div>
      )}
    </aside>
  );
}
