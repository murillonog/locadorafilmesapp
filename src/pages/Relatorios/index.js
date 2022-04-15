import './relatorios.css'
import React, { useState } from 'react';
import Title from '../../components/Title';
import {HiOutlineDocumentReport} from 'react-icons/hi'
import api from '../../services/api';

export default function Relatorios() {    
    const[download, setDownload] = useState('');
    const [count, setCount] = useState(0);

    function handlerDownload(url){
        setDownload(`${api.defaults.baseURL}${url}`);
        setCount((old) => old + 1);
    }
    
    return (
        <div>
        <div className="content">
            <Title name="Relatórios">
                <HiOutlineDocumentReport color='#000' size={24}/>
            </Title>
            <div className='container'>
                <div className='report'>
                    <button className='download-report' onClick={() => {handlerDownload('relatorios/clientes-em-atraso')}}>
                        Clientes em Atraso
                    </button>
                    <button className='download-report' onClick={() => {handlerDownload('relatorios/filmes-nunca-alugados')}}>
                        Filmes nunca alugados
                    </button>
                    <button className='download-report' onClick={() => {handlerDownload('relatorios/filmes-top5-alugados')}}>
                        5 Filmes mais alugados no Ano
                    </button>
                    <button className='download-report' onClick={() => {handlerDownload('relatorios/filmes-top3-menos-alugados')}}>
                        3 Filmes menos alugados na Semana
                    </button>
                    <button className='download-report' onClick={() => {handlerDownload('relatorios/segundo-cliente-mais-alugou')}}>
                        2º Cliente que mais alugou
                    </button>
                    {download && (
                        <iframe
                        src={download + "?c=" + count}
                        style={{ display: "none" }}
                        ></iframe>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}