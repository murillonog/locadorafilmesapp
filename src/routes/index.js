import {Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Filmes from '../pages/Filmes';
import Clientes from '../pages/Clientes';
import ClientesAdd from '../pages/ClientesAdd';
import Locacaoes from '../pages/Locacoes';
import LocacoesAdd from '../pages/LocacoesAdd';
import Importar from '../pages/Importar';


export default function Router(){
    return(
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/filmes" element={<Filmes/>}/>
            <Route exact path="/clientes" element={<Clientes/>}/>
            <Route exact path="/locacoes" element={<Locacaoes/>}/>
            <Route exact path="/importar" element={<Importar/>}/>
            <Route exact path="/cliente-add" element={<ClientesAdd/>}/>
            <Route exact path="/cliente-add/:id" element={<ClientesAdd/>}/>
            <Route exact path="/locacoes-add" element={<LocacoesAdd/>}/>
            <Route exact path="/locacoes-add/:id" element={<LocacoesAdd/>}/>
        </Routes>
    )
}