import './clientesadd.css'
import "react-datepicker/dist/react-datepicker.css";
import Title from '../../components/Title';
import { FiPlus } from 'react-icons/fi';
import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ClientesAdd(){
    const {id} = useParams();
    const navigate = useNavigate();
    const[nome, setNome] = useState('');
    const[cpf, setCpf] = useState('');
    const[dataNascimento, setDataNascimento] = useState(new Date());

    useEffect(() => {

        if(id){
            loadId();
        }
    },[id]);

    async function loadId() {
        await api.get(`cliente/${id}`)
        .then((snapshot) => {
            setNome(snapshot.data.nome);
            setCpf(snapshot.data.cpf);
            setDataNascimento(new Date(snapshot.data.dataNascimento));
        })
        .catch((error) => {
            console.log('Erro: ' + error);
        })
    }

    function handleAdd(e){
        e.preventDefault();
        if(nome !== '' && cpf !== '' && dataNascimento !== ''){
            if(id){            
                api.put(`cliente?id=${id}`,{
                    nome: nome,
                    cpf: cpf,
                    dataNascimento: dataNascimento
                }).then(function (response) {
                    toast.success('Cliente editado com sucesso!');
                    navigate("/clientes");
                }).catch(function (error) {
                    console.log(error);
                    toast.error('Houve um erro ao editar o cliente!');
                });            
            }else{
                api.post(`cliente`,{
                    nome: nome,
                    cpf: cpf,
                    dataNascimento: dataNascimento
                }).then(function (response) {
                    toast.success('Cliente cadastrado com sucesso!');
                    navigate("/clientes");
                }).catch(function (error) {
                    console.log(error);
                    toast.error('Houve um erro ao editar o cliente!');
                });            
            }
        }
    }

    return(
        <div>
            <div className='content'>
                <Title name="Novo Cliente">
                    <FiPlus size={25}/>
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleAdd}>
                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do Cliente"/>
                        <label>Cpf</label>
                        <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="Cpf do Cliente"/>
                        <label>Data Nascimento</label>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={dataNascimento} onChange={(date) => setDataNascimento(date)} />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default ClientesAdd;