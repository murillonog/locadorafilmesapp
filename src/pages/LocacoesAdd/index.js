import React, { Fragment } from 'react';
import './locacoesadd.css'
import "react-datepicker/dist/react-datepicker.css";
import Title from '../../components/Title';
import api from '../../services/api';
import DatePicker from "react-datepicker";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

function LocacoesAdd(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [loadClientes, setLoadClientes] = useState(true);
    const[clientes, setClientes] = useState([]);
    const [clienteSelected, setClienteSelected] = useState(0);

    const [loadFilmes, setLoadFilmes] = useState(true);
    const[filmes, setFilmes] = useState([]);
    const [filmeSelected, setFilmeSelected] = useState(0);

    const[dataLocacao, setDataLocacao] = useState(new Date());
    const[dataDevolucao, setDataDevolucao] = useState(new Date());

    useEffect(() => {        

        async function loadClientes(){
            await api.get('cliente')
            .then((snapshot)=> {             
                let listaClientes = []; 
                snapshot.data.forEach((doc) => {
                    listaClientes.push({
                        id: doc.id,
                        nome: doc.nome
                    })
                })
                SetaListaCliente(listaClientes);                

            })
            .catch((error) =>{
                console.log('Deu erro ao buscar clientes!');
                console.log(error);
                setLoadClientes(false);
                setClientes([{id: '0', nome: ''}]);
            })
        }

        async function loadFilmes(){
            await api.get('filme')
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
                setFilmes(listaFilmes);
                setLoadFilmes(false);                
            })
            .catch((error) =>{
                console.log('Ocorreu um erro ao buscar filmes!');
                console.log(error);
                setLoadFilmes(false);
                setFilmes([{id: '0', titulo: ''}]);
            })
        }        
        
        

        loadClientes();
        loadFilmes();   

        // if(id){
        //     loadInformations(listaClientes, listaFilmes);
        // }

    },[id])

    function SetaListaCliente(listaClientes){
        if(listaClientes.length === 0){
            console.log('Nenhum cliente encontrado!');
            setClientes([{id: '0', nome: ''}]);
            setLoadClientes(false);
            return;
        }

        setClientes(listaClientes);
        setLoadClientes(false);
    }
    

    async function loadInformations(listaClientes, listaFilmes) {
        await api.get(`locacao/${id}`)
        .then((snapshot) => {
            setDataLocacao(new Date(snapshot.data.dataLocacao));
            let indexCliente = listaClientes.findIndex(item => item.id === snapshot.data.id_Cliente);
            let indexFilmes = listaFilmes.findIndex(item => item.id === snapshot.data.id_Filme);
            debugger;
            setClienteSelected(indexCliente);
            setFilmeSelected(indexFilmes);
        })
        .catch((error) => {
            console.log('Erro: ' + error);
        });
    }

    function handleAdd(e){
        e.preventDefault();
        if(clienteSelected !== 0 && filmeSelected !== 0 && dataLocacao !== ''){
            if(id){
                api.put(`locacao?id=${id}`,{
                    id_Cliente: clientes[clienteSelected].id,
                    id_Filme: filmes[filmeSelected].id,
                    dataLocacao: dataLocacao,
                    dataDevolucao: dataDevolucao
                }).then(function (response) {
                    toast.success('Locação editada com sucesso!');
                    navigate('/locacoes');
                }).catch(function (error) {
                    console.log(error);
                    toast.error('Houve um erro ao editar a locação!');
                });
            }else{
                api.post(`locacao`,{
                    id_Cliente: clientes[clienteSelected].id,
                    id_Filme: filmes[filmeSelected].id,
                    dataLocacao: dataLocacao
                }).then(function (response) {
                    toast.success('Locação cadastrada com sucesso!');
                    navigate('/locacoes');
                }).catch(function (error) {
                    console.log(error);
                    toast.error('Houve um erro ao cadastrar a locação!');
                });
            }
            
        }
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
                        {loadClientes?(
                            <input type="text" disabled={true} value="Carregando clientes..."/>
                        ):(
                            <select value={clienteSelected} onChange={(e) => {setClienteSelected(e.target.value)}}>
                                <option key={0} value={0}>Selecione um cliente</option>
                                {clientes.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>{item.nome}</option>
                                    )
                                })}
                            </select>
                        )}                        
                        <label>Filme</label>
                        {loadFilmes?(
                            <input type="text" disabled={true} value="Carregando filmes..."/>
                        ):(
                            <select value={filmeSelected} onChange={(e) => {setFilmeSelected(e.target.value)}}>
                                <option key={0} value={0}>Selecione um filme</option>
                                {filmes.map((item, index) => {
                                    return(
                                        <option key={item.id} value={index}>{item.titulo}</option>
                                    )
                                })}
                            </select>
                        )

                        }
                        
                        <label>Data Locação</label>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={dataLocacao} onChange={(date) => setDataLocacao(date)} />
                        {id ? <label>Data Locação</label> : <Fragment></Fragment>}
                        {id ? <DatePicker dateFormat="dd/MM/yyyy" selected={dataDevolucao} onChange={(date) => setDataDevolucao(date)} />
                        : <Fragment></Fragment>}

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default LocacoesAdd;