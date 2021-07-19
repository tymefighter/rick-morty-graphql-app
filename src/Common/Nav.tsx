import { Link } from "react-router-dom";

import "../styles/Nav.scss";

interface NavProps {
    nameToLink: {
        name: string; 
        link: string;
    }[]
};

function Nav({nameToLink}: NavProps) {
    return (
        <nav className="nav">
            {nameToLink.map(({name, link}) => 
                <Link key={name}
                    className="nav__link" to={link}>{name}</Link>
            )}
        </nav>
    );
};

export default Nav;