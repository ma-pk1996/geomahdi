import classes from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../../context";

export function Navbar() {
    const theme = useSelector(state => state.theme.lightTheme);
    const dispatch = useDispatch();
    function clickHandler() {
        dispatch(themeAction.toggle());
    }
    return (
        <header className={classes.header}>
            <h3 className={classes.logo}>GeoMahdi</h3>
            <button className={theme ? classes.themeBtnd : classes.themeBtn} onClick={clickHandler}><FontAwesomeIcon size="2x" icon={theme ? faMoon : faSun} /></button>
        </header>
    )
}