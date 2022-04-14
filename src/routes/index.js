import {Route, Routes} from 'react-router-dom';
import Home from '../pages/Home'
import Filmes from '../pages/Filmes'
import Clientes from '../pages/Clientes'
import Locacaoes from '../pages/Locacoes'
import Importar from '../pages/Importar'


export default function Router(){
    return(
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/filmes" element={<Filmes/>}/>
            <Route exact path="/clientes" element={<Clientes/>}/>
            <Route exact path="/locacoes" element={<Locacaoes/>}/>
            <Route exact path="/importar" element={<Importar/>}/>
        </Routes>
    )
}