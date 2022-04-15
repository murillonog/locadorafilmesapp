import './clientes.css';
import React from 'react';
import Title from '../../components/Title';
import { FiUser, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import {Link} from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Clientes() {
  const [listaClientes, setListaClientes] = useState([]);
  const [loadClientes, setLoadClientes] = useState(true);

  function toggleDeleteItem(idItem){
    api.delete(`cliente?id=${idItem}`)
    .then(function (response) {
      console.log(response);
      toast.success("Cliente deletado com sucesso!");
      window.location.reload();
    }).catch(function (error) {
        console.log(error);
    });
  }

  useEffect(() => {
    async function loadClientes(){
        await api.get('cliente')
        .then((snapshot)=> {
            
            let lista = [];
          
            snapshot.data.forEach((doc) => {
              lista.push({
                    id: doc.id,
                    nome: doc.nome,
                    cpf: doc.cpf,
                    dataNascimento: doc.dataNascimento
                })
            })

            if(lista.length === 0){
                console.log('Nenhum cliente encontrado!');
                setLoadClientes(false);
                return;
            }
            console.log(lista);
            setListaClientes(lista);
            setLoadClientes(false);
        })
        .catch((error) =>{
            console.log('Deu erro ao buscar clientes!');
            console.log(error);
            setLoadClientes(false);
        })
    }    
    
    loadClientes();      
  },[])

    return (
      <div>
        <div className='content'>
          <Title name="Clientes">
            <FiUser color='#000' size={24}/>
          </Title>

          {listaClientes.length === 0 ?(
            <div className='container dashboard'>
            <span>Nenhum cliente cadastrado...</span>
            <Link to="/cliente-add" className="new">
              <FiPlus size={25} color="#FFF"/>
              Adicionar Cliente
            </Link>
          </div>
          ) : (
            <Fragment>
            <Link to="/cliente-add" className="new">
              <FiPlus size={25} color="#FFF"/>
              Adicionar Cliente
            </Link>
            <table>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Cpf</th>
                  <th scope="col">Nascimento</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                  {listaClientes.map((item, index) => {
                                return(
                    <tr key={index}>
                      <td data-label="Id">{item.id}</td>
                      <td data-label="Nome">{item.nome}</td>
                      <td data-label="Cpf">{item.cpf}</td>
                      <td data-label="Nascimento">{item.dataNascimento}</td>
                      <td data-label="#">
                        <button className="action" style={{backgroundColor: '#3583F6'}} 
                            onClick={() => toggleDeleteItem(item.id)}>
                              <FiTrash color="#FFF" size={17}/>
                        </button>
                        <Link className="action" style={{backgroundColor: '#F6A935'}} to={`/cliente-add/${item.id}`}>
                          <FiEdit2 color="#FFF" size={17}/>
                        </Link>
                      </td>
                    </tr>
                                )
                  
                              })
                  }
                
              </tbody>
            </table>
            </Fragment>
          )}

          
        </div>
      </div>
    );
  }
  
  export default Clientes;