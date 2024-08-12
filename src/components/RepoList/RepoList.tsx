import { IRepoItem } from "../../types";
import Pagination from "../Pagination/Pagination";
import RepoItem from "../RepoItem/RepoItem";
import style from "./style.module.scss";
import arrow from "../../assets/arrowtop.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOrder, setSort } from "../../store/slices/repoSlice";

// Интерфейс для пропсов компонента RepoList, содержащий массив репозиториев
interface Props {
  items: IRepoItem[];
}

export default function RepoList({ items }: Props) {
  const dispatch = useAppDispatch();
  const { order, sort } = useAppSelector((state) => state.repos); // Получение текущих параметров сортировки из состояния

  // Функция для изменения порядка сортировки по заданному параметру (forks, stars, updated)
  function changeSort(t: string) {
    // Установка сортировки и порядка в зависимости от выбранного параметра
    if (t === "forks") {
      // Определение нового порядка сортировки
      let o = order === "desc" ? "asc" : "desc";
      dispatch(setSort("forks"));
      dispatch(setOrder(o));
    } else if (t === "stars") {
      // Определение нового порядка сортировки
      let o = order === "desc" ? "asc" : "desc";
      dispatch(setSort("stars"));
      dispatch(setOrder(o));
    } else if (t === "updated") {
      // Определение нового порядка сортировки
      let o = order === "desc" ? "asc" : "desc";
      dispatch(setSort("updated"));
      dispatch(setOrder(o));
    }
  }

  return (
    <section className={style.repo}>
      <h3>Результаты поиска</h3>
      <div className={style.list}>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Язык</th>
              {/* Добавление возможности сортировки по числу форков */}
              <th onClick={() => changeSort("forks")}>
                {/* Отображение стрелки сортировки в зависимости от текущего порядка */}
                {sort === "forks" && order === "desc" ? (
                  <img src={arrow} />
                ) : (
                  <img src={arrow} className={style.reverse} />
                )}
                Число форков
              </th>
              {/* Добавление возможности сортировки по числу звезд */}
              <th onClick={() => changeSort("stars")}>
                {sort === "stars" && order === "desc" ? (
                  <img src={arrow} />
                ) : (
                  <img src={arrow} className={style.reverse} />
                )}
                Число звезд
              </th>
              {/* Добавление возможности сортировки по дате обновления */}
              <th onClick={() => changeSort("updated")}>
                {sort === "updated" && order === "desc" ? (
                  <img src={arrow} />
                ) : (
                  <img src={arrow} className={style.reverse} />
                )}
                Дата обновления
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Отображение списка репозиториев */}
            {items.map((i) => {
              return (
                <RepoItem
                  key={i.id}
                  id={i.id}
                  title={i.name}
                  lang={i.language}
                  forks={i.forks}
                  stars={i.stargazers_count}
                  date={i.updated_at}
                  license={i.license}
                  topics={i.topics}
                  description={i.description}
                ></RepoItem>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Компонент пагинации для переключения страниц */}
      <Pagination></Pagination>
    </section>
  );
}
