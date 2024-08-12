import style from "./style.module.scss";
import stepleft from "../../assets/stepleft.png";
import stepright from "../../assets/stepright.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPage, setPerPage } from "../../store/slices/repoSlice";
import { useState } from "react";

export default function Pagination() {
  let dispatch = useAppDispatch(); // Хук для получения функции dispatch из Redux
  let [value, setValue] = useState("10"); // Локальное состояние для хранения выбранного количества строк на странице
  let { page, total_count } = useAppSelector((state) => state.repos); // Получение текущей страницы и общего количества из Redux
  let [isLoading, setIsLoading] = useState(false); // Локальное состояние для отслеживания загрузки

  // Функция для имитации задержки загрузки (2 секунды)
  function timer() {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  // Обработчик изменения количества строк на странице
  function onChangePerPage(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue(e.target.value);
    dispatch(setPerPage(+e.target.value));
  }

  // Обработчик перехода к следующей странице
  function nextStepHandler() {
    if (!isLoading) {
      if (page !== +total_count!) {
        dispatch(setPage(page! + 1));
        setIsLoading(true);
        timer();
      }
    }
  }

  // Обработчик перехода к предыдущей странице
  function prevStepHandler() {
    if (!isLoading) {
      if (page! > 1) {
        dispatch(setPage(page! - 1));
        setIsLoading(true);
        timer();
      }
    }
  }

  return (
    <div className={style.pagination}>
      <div className={style.content}>
        <div className={style.pages}>
          <span>Rows per page:</span>
          <select
            name=''
            id=''
            value={value}
            onChange={(e) => onChangePerPage(e)} // Вызов обработчика при изменении значения
          >
            <option value='10'>10</option>
            <option value='15'>15</option>
            <option value='20'>20</option>
            <option value='25'>25</option>
            <option value='30'>30</option>
          </select>
        </div>
        {/* Отображение текущей страницы и общего количества страниц */}
        <div>
          <span>
            {page}-{total_count} of {total_count}
          </span>
        </div>
        {/* Кнопки для перехода к предыдущей и следующей странице */}
        <div>
          <img
            src={stepleft}
            alt=''
            onClick={prevStepHandler} // Вызов обработчика перехода к предыдущей странице
            className={isLoading ? style.loading : ""}
          />
          <img
            src={stepright}
            alt=''
            onClick={nextStepHandler} // Вызов обработчика перехода к следующей странице
            className={isLoading ? style.loading : ""}
          />
        </div>
      </div>
    </div>
  );
}
