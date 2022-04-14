import './home.css';
import React, {useState} from 'react';
import Title from '../../components/Title';
import { FiHome, FiUser, FiUpload } from 'react-icons/fi';

export default function Home() {
    return (
      <div>
        <div className="content">
            <Title name="Home">
                <FiHome color='#000' size={24}/>
            </Title>
            <div className='container'>
                <div className='welcome'>
                    <h1>Seja bem-vindo a locadora!</h1>
                </div>
            </div>
        </div>
      </div>
    );
  }