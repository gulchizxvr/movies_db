
import React, {FC} from 'react';

import {useAppSelector} from "../../hooks";

import '@coreui/coreui/dist/css/coreui.min.css'
import {CBadge} from "@coreui/react";
import './badgeSpan.style.scss'



interface IGenreProps {
    genre: string
}
const BadgeSpan: FC<IGenreProps> = ({genre}) => {

    const {theme} = useAppSelector(state => state.themeReducer)

    return (
        <div className='badgeSpan'>
            <CBadge color={theme === 'light' ? 'dark' : 'danger'} shape="rounded-pill">
                <span>{genre}</span>
            </CBadge>
        </div>
    );
};

export {BadgeSpan}

