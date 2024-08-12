import { useAppDispatch } from "../../store/hooks";
import { setItem } from "../../store/slices/repoItemSlice";

// Интерфейс для пропсов компонента RepoItem
interface Props {
  title: string; // Название репозитория
  lang: string; // Язык программирования, на котором написан репозиторий
  forks: number; // Количество форков репозитория
  stars: number; // Количество звезд репозитория
  date: string; // Дата последнего обновления репозитория
  license: {}; // Лицензия репозитория
  topics: string[]; // Темы, связанные с репозиторием
  description: string; // Описание репозитория
  id: number; // Уникальный идентификатор репозитория
}

export default function RepoItem({
  forks,
  description,
  license,
  topics,
  date,
  lang,
  stars,
  title,
}: Props) {
  // Преобразование даты в удобочитаемый формат (день, месяц, год)
  let year = new Date(date).getFullYear();
  let day = new Date(date).getDate();
  let month = new Date(date).getMonth();

  let dispatch = useAppDispatch(); // Хук для получения функции dispatch из Redux

  // Функция для обработки клика по названию репозитория
  function onShowCurrentItem() {
    let info = {
      name: title,
      description: description,
      license: license,
      stars: stars,
      topics: topics,
    };
    // Отправка информации о текущем репозитории в хранилище Redux
    dispatch(setItem(info));
  }

  return (
    <tr>
      {/* Название репозитория, при клике по которому вызывается функция onShowCurrentItem */}
      <td style={{ cursor: "pointer" }} onClick={onShowCurrentItem}>
        {title}
      </td>
      {/* Язык программирования */}
      <td>{lang}</td>
      {/* Количество форков */}
      <td>{forks} </td>
      {/* Количество звезд */}
      <td>{stars}</td>
      {/* Дата последнего обновления в формате ДД.ММ.ГГГГ */}
      <td>
        {day < 9 ? `0${day}` : day}.{month < 9 ? `0${month}` : month}.{year}
      </td>
    </tr>
  );
}
