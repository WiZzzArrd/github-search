import { useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import {
  setItems,
  setOrder,
  setPage,
  setPerPage,
  setQuery,
  setSort,
  setTotalCount,
} from "./store/slices/repoSlice";
import { useLazyGetReposQuery } from "./store/services/repoApi";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
  let [trigger, { isError }] = useLazyGetReposQuery(); //Получение триггера для отправки запросы на сервер
  const dispatch = useAppDispatch(); // Получения функции для возможности добавления данных в Redux
  let { page, per_page, q, sort, order } = useAppSelector(
    (state) => state.repos
  ); // Получение данных из стейта

  // Загрзка данных с сервера, передача параметров
  const loadData = async () => {
    if (q.length !== 0) {
      let { data } = await trigger({
        q: q,
        page: page!,
        per_page: per_page!,
        sort: sort!,
        order: order!,
      });
      // Добавление данных в Redux
      dispatch(setQuery(q));
      dispatch(setItems(data));
      dispatch(setTotalCount(data?.total_count!));
      dispatch(setPerPage(per_page!));
      dispatch(setPage(page!));
      dispatch(setOrder(order));
      dispatch(setSort(sort));
    }
  };

  // useEffect запускает функции по отправке запросы
  useEffect(() => {
    loadData();
  }, [page, per_page, q, sort, order]);

  if (isError) {
    return (
      <div
        style={{
          height: "517px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "26px",
          fontWeight: "400",
          color: "#4f4f4f",
        }}
      >
        При загрузке произошла ошибка, пожалуйста, попробуйте позже
      </div>
    );
  }

  return (
    <div className='wrapper'>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
