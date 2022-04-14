import './locacoes.css';
import Title from '../../components/Title';
import { FiUser, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { FaExchangeAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';

function Locacoes() {
  const [listaLocacoes, setListaLocacoes] = useState([]);
  const [loadLocacoes, setLoadLocacoes] = useState(true);

  function toggleDeleteItem(){

  }

  function toggleEditModal(){

  }

  useEffect(() => {
    async function loadLocacoes(){
        await api.get('locacao')
        .then((snapshot)=> {
            
            let lista = [];
          
            snapshot.data.forEach((doc) => {
              lista.push({
                    id: doc.id,
                    nome: doc.nome
                })
            })

            if(lista.length === 0){
                console.log('Nenhuma locacao encontrada!');
                setLoadLocacoes(false);
                return;
            }

            setListaLocacoes(lista);
            setLoadLocacoes(false);

        })
        .catch((error) =>{
            console.log('Deu erro ao buscar locações!');
            console.log(error);
            setLoadLocacoes(false);
        })
    }    
    
    loadLocacoes();      
},[])

    return (
      <div>
        <div className='content'>
          <Title name="Locações">
            <FaExchangeAlt color='#000' size={24}/>
          </Title>

          {listaLocacoes.length === 0 ?(
            <div className='container dashboard'>
            <span>Nenhuma locação cadastrada...</span>
            <Link to="/locacoes-add" className="new">
              <FiPlus size={25} color="#FFF"/>
              Nova Locação
            </Link>
          </div>
          ) : (
            <>
            <Link to="/locacoes-add" className="new">
              <FiPlus size={25} color="#FFF"/>
              Nova Locação
            </Link>
            <table>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Filme</th>
                  <th scope="col">Data Locação</th>
                  <th scope="col">Data Devolução</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Id">1</td>
                  <td data-label="Cliente">Murillo</td>
                  <td data-label="Filme">Piratas do Caribe</td>
                  <td data-label="Locacao">13/04/2022</td>
                  <td data-label="Devolucao">16/04/2022</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583F6'}} 
                        onClick={() => toggleDeleteItem()}>
                          <FiTrash color="#FFF" size={17}/>
                    </button>
                    <button className="action" style={{backgroundColor: '#F6A935'}} 
                        onClick={() => toggleEditModal()}>
                          <FiEdit2 color="#FFF" size={17}/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            </>
          )}

          
        </div>
      </div>
    );
  }
  
  export default Locacoes;