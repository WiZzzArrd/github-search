import RepoInfo from "../components/RepoInfo/RepoInfo";
import RepoList from "../components/RepoList/RepoList";
import { useAppSelector } from "../store/hooks";
import style from "./home.module.scss";

export default function Home() {
  let data: any = useAppSelector((state) => state.repos.repositories); //Получение информации из состояния

  if (data.total_count === 0) {
    return <div className={style.none}>Ничего не найдено...</div>;
  }

  return (
    <main className={style.main}>
      {/* Отображение приветствия или основного контента в зависимости от того, есть ли в стейте данные */}
      {data?.length === 0 ? (
        <div className={style.greeting}>Добро пожаловать</div>
      ) : (
        <section className={style.repos}>
          <RepoList items={data.items} />
          <RepoInfo />
        </section>
      )}
    </main>
  );
}
