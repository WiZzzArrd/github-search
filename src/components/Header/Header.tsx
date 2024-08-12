import { Button } from "@mui/material";
import style from "./header.module.scss";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setQuery } from "../../store/slices/repoSlice";

export default function Header() {
  // Локальное состояние для хранения значения введенного поискового запроса
  let [value, setValue] = useState("");

  let dispatch = useAppDispatch(); // Хук для получения функции dispatch из Redux

  // Функция для обновления поискового запроса в Redux
  function changeQuery() {
    dispatch(setQuery(value));
  }

  return (
    <header className={style.header}>
      {/* Поле ввода для поискового запроса */}
      <input
        className={style.input}
        placeholder='Введите поисковый запрос'
        value={value}
        onChange={(e) => setValue(e.target.value)} // Обновление локального состояния при изменении значения в поле ввода
      ></input>

      {/* Кнопка для отправки поискового запроса */}
      <Button
        size='large'
        color='primary'
        variant='contained'
        style={{ background: "#2196F3" }}
        onClick={changeQuery} // Вызов функции для обновления поискового запроса в Redux
      >
        Искать
      </Button>
    </header>
  );
}
