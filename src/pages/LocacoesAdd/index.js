import './locacoesadd.css'
import Title from '../../components/Title';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { FiPlus } from 'react-icons/fi';

function LocacoesAdd(){
    const [loadClientes, setLoadClientes] = useState(true);
    const[clientes, setClientes] = useState([]);
    const [clienteSelected, setClienteSelected] = useState(0);

    const [loadFilmes, setLoadFilmes] = useState(true);
    const[filmes, setFilmes] = useState('');
    const [filmeSelected, setFilmeSelected] = useState(0);

    const[dataLocacao, setDataLocacao] = useState('');

    useEffect(() => {
        function loadClientes(){
            api.get('cliente')
            .then((snapshot)=> {
                
                let listaClientes = [];
              
                snapshot.data.forEach((doc) => {
                    listaClientes.push({
                        id: doc.id,
                        nome: doc.nome
                    })
                })

                if(listaClientes.length === 0){
                    console.log('Nenhum cliente encontrado!');
                    setClientes([{id: '0', nome: ''}]);
                    setLoadClientes(false);
                    return;
                }

                setClientes(listaClientes);
                setLoadClientes(false);

            })
            .catch((error) =>{
                console.log('Deu erro ao buscar clientes!');
                console.log(error);
                setLoadClientes(false);
                setClientes([{id: '0', nome: ''}]);
            })
        }

        function loadFilmes(){
            api.get('filme')
            .then((snapshot)=>{
                
                let listaFilmes = [];
              
                snapshot.data.forEach((doc) => {
                    listaFilmes.push({
                        id: doc.id,
                        titulo: doc.titulo
                    })
                })

                if(listaFilmes.length === 0){
                    console.log('Nenhum filme encontrado!');
                    setFilmes([{id: '0', titulo: ''}]);
                    setLoadFilmes(false);
                    return;
                }
                console.log(listaFilmes);
                setFilmes(listaFilmes);
                setLoadFilmes(false);
                return;
            })
            .catch((error) =>{
                console.log('Deu erro ao buscar filmes!');
                console.log(error);
                setLoadFilmes(false);
                setFilmes([{id: '0', titulo: ''}]);
            })
        }        
        
        loadClientes();
        loadFilmes();        
    },[])

    function handleAdd(e){
        e.preventDefault();        
            const response = api.post(`locacao`,{
                id_Cliente: clientes[clienteSelected].id,
                id_Filme: filmes[filmeSelected].id,
                dataLocacao: dataLocacao,
                dataDevolucao: null
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });        
    }

    function handleChangeCliente(e){
        setFilmeSelected(e.target.value);
    }

    function handleChangeFilme(e){
        setClienteSelected(e.target.value);
    }

    return(
        <div>
            <div className='content'>
                <Title name="Nova Locação">
                    <FiPlus size={25}/>
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleAdd}>
                        <label>Cliente</label>
                        <select value={clienteSelected} onChange={handleChangeCliente}>
                            {clientes.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>{item.nome}</option>
                                )
                            })}
                        </select>
                        <label>Filme</label>
                        <select value={filmeSelected} onChange={handleChangeFilme}>
                            {filmes.map((item, index) => {
                                return(
                                    <option key={item.id} value={index}>{item.titulo}</option>
                                )
                            })}
                        </select>
                        <label>Data Locação</label>
                        <input type="text" value={dataLocacao} onChange={(e) => setDataLocacao(e.target.value)} placeholder="Data de Nascimento"/>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default LocacoesAdd;