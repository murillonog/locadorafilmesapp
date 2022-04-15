import './locacoes.css';
import Title from '../../components/Title';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { FaExchangeAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import React from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';


function Locacoes() {
  const [listaLocacoes, setListaLocacoes] = useState([]);
  const [loadLocacoes, setLoadLocacoes] = useState(true);

  function toggleDeleteItem(idItem){
    api.delete(`locacao?id=${idItem}`)
    .then(function (response) {
      toast.success("Locação deletado com sucesso!");
      window.location.reload();
    }).catch(function (error) {
      toast.success("Não foi possivel deletar a locação!");
    });
  }

  useEffect(() => {
    async function loadInfoLocacoes(){
        await api.get('locacao')
        .then((snapshot)=> {
            
            let lista = [];
          
            snapshot.data.forEach((doc) => {
              lista.push({
                    id: doc.id,
                    id_Cliente: doc.id_Cliente,
                    id_Filme: doc.id_Filme,
                    nomeCliente: doc.nomeCliente,
                    tituloFilme: doc.tituloFilme,
                    dataLocacao: doc.dataLocacao,
                    dataDevolucao: doc.dataDevolucao
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
    
    loadInfoLocacoes();      
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
            <Fragment>
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
                {listaLocacoes.map((item,index) => {
                  return (
                    <tr>
                      <td data-label="Id">{item.id}</td>
                      <td data-label="Cliente">{item.nomeCliente}</td>
                      <td data-label="Filme">{item.tituloFilme}</td>
                      <td data-label="Locacao">{item.dataLocacao}</td>
                      <td data-label="Devolucao">{item.dataDevolucao}</td>
                      <td data-label="#">
                        <button className="action" style={{backgroundColor: '#3583F6'}} 
                            onClick={() => toggleDeleteItem(item.id)}>
                              <FiTrash color="#FFF" size={17}/>
                        </button>
                        <Link className="action" style={{backgroundColor: '#F6A935'}} to={`/locacoes-add/${item.id}`}>
                              <FiEdit2 color="#FFF" size={17}/>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                
              </tbody>
            </table>
            </Fragment>
          )}

          
        </div>
      </div>
    );
  }
  
  export default Locacoes;