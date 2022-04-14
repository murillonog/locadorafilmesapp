import './header.css';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiUpload } from 'react-icons/fi';
import { BiCameraMovie } from 'react-icons/bi';
import { FaExchangeAlt } from 'react-icons/fa';

export default function Header(){
    return(
        <div className="sidebar">
            <div>
                
            </div>
            <Link to="/">
                <FiHome color='#FFF' size={24} />
                    Home
            </Link>
            <Link to="/filmes">
                <BiCameraMovie color='#FFF' size={24} />
                    Filmes
            </Link>
            <Link to="/clientes">
                <FiUser color='#FFF' size={24} />
                    Clientes
            </Link>
            <Link to="/locacoes">
                <FaExchangeAlt color='#FFF' size={24} />
                    Locações
            </Link>
            <Link to="/importar">
                <FiUpload color='#FFF' size={24} />
                    Importar
            </Link>
        </div>
    );
}