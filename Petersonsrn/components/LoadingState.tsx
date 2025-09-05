import React, { useState, useEffect } from 'react';
import { PotIcon } from './icons/PotIcon';

const loadingMessages = [
    "Misturando os ingredientes...",
    "Pré-aquecendo o forno da criatividade...",
    "Consultando o grande livro de receitas do chef Gemini...",
    "Adicionando uma pitada de magia...",
    "Quase pronto! O cheirinho já está bom...",
    "Só mais um minutinho, estamos empratando sua receita!",
];

export const LoadingState: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 3000); // Change message every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center p-8 md:p-12 bg-white rounded-3xl shadow-lg flex flex-col items-center justify-center">
            <div className="relative mb-6">
                <PotIcon className="h-20 w-20 text-amber-500 animate-cook" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 flex justify-center items-end h-16 w-16">
                    <span className="absolute bottom-0 h-4 w-4 bg-gray-200 rounded-full opacity-70 animate-steam-1" style={{ left: '30%' }}></span>
                    <span className="absolute bottom-0 h-3 w-3 bg-gray-200 rounded-full opacity-70 animate-steam-2" style={{ left: '55%' }}></span>
                    <span className="absolute bottom-0 h-5 w-5 bg-gray-200 rounded-full opacity-70 animate-steam-3" style={{ left: '0%' }}></span>
                </div>
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-amber-800 mb-4">Gerando sua receita...</h3>
            <p className="text-lg text-gray-600 transition-opacity duration-500 ease-in-out">
                {loadingMessages[messageIndex]}
            </p>
        </div>
    );
};