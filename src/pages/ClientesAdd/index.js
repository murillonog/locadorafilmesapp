import './clientesadd.css'
import Title from '../../components/Title';
import React, {useState} from 'react';
import api from '../../services/api';
import { FiUser, FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';

function ClientesAdd(){
    const[nome, setNome] = useState('');
    const[cpf, setCpf] = useState('');
    const[dataNascimento, setDataNascimento] = useState('');

    function handleAdd(e){
        e.preventDefault();
        if(nome !== '' && cpf !== '' && dataNascimento !== ''){
            api.post(`cliente`,{
                nome: nome,
                cpf: cpf,
                dataNascimento: dataNascimento
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
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
                        <input type="text" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} placeholder="Data de Nascimento"/>
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>            
        </div>
    )
}

export default ClientesAdd;