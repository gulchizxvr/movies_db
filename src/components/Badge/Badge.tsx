import React, {FC} from 'react';
import {useAppSelector} from "../../hooks/redux.hook";


import css from "./Badge.module.css"
import {CBadge} from "@coreui/react";

interface IGenreProps {
    genre: string
}
const Badge: FC<IGenreProps> = ({genre}) => {

    const {theme} = useAppSelector(state => state.themeReducer)

    return (
        <div className={css.badges}>
            <CBadge color={theme === 'light' ? 'dark' : 'danger'} shape="rounded-pill">
                <span>{genre}</span>
            </CBadge>
        </div>
    );
};

export {Badge}

