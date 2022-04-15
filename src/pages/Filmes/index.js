import './filme.css';
import Title from '../../components/Title';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { BiCameraMovie } from 'react-icons/bi';
import {Link} from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import api from '../../services/api';

function Filmes() {
  const [listaFilmes, setListaFimes] = useState([1]);
  const [loadFilmes, setLoadFilmes] = useState(true);

  useEffect(() => {
    async function loadFilmes(){
        await api.get('filme')
        .then((snapshot)=> {
            
            let lista = [];
          
            snapshot.data.forEach((doc) => {
              lista.push({
                    id: doc.id,
                    titulo: doc.titulo,
                    classificacao: doc.classificacaoIndicativa,
                    lancamento: doc.lancamento
                })
            })

            if(lista.length === 0){
                console.log('Nenhum filme encontrado!');
                setLoadFilmes(false);
                return;
            }
            console.log(lista);
            setListaFimes(lista);
            setLoadFilmes(false);

        })
        .catch((error) =>{
            console.log('Deu erro ao buscar filmes!');
            console.log(error);
            setLoadFilmes(false);
        })
    }    
    
    loadFilmes();      
  },[])

    return (
      <div>
        <div className='content'>
          <Title name="Filmes">
            <BiCameraMovie color='#000' size={24}/>
          </Title>

          {listaFilmes.length === 0 ?(
            <div className='container dashboard'>
            <span>Nenhum filme cadastrado...</span>
            <Link to="/importar" className="new">
              <FiPlus size={25} color="#FFF"/>
              Importar Arquivo
            </Link>
          </div>
          ) : (
            <Fragment>
            <Link to="/importar" className="new">
              <FiPlus size={25} color="#FFF"/>
              Importar Arquivo
            </Link>
            <table>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Classificação</th>
                  <th scope="col">Lançamento</th>
                </tr>
              </thead>
              <tbody>
                {listaFilmes.map((item,index) => {
                    return (
                      <tr key={index}>
                      <td data-label="Id">{item.id}</td>
                      <td data-label="Titulo">{item.titulo}</td>
                      <td data-label="Classificacao">{item.classificacao}</td>
                      <td data-label="Lancamento">{item.lancamento}</td>
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
  
  export default Filmes;