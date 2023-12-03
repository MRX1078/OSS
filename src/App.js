import React, { useState, useEffect } from 'react';
import axios from 'axios';
import economy from './logo/economy.png'
import bulb from './logo/idea.png'
import business from './logo/business.png'
import pres from './logo/planing.png'
import pyramid from './logo/konkyrent.png'
import sett from './logo/team.png'

// Тут иконочки
const TabIcons = [
    <img src={economy} width="45px" alt="React Logo" fill="white" />,
    <img src={business} width="45px" alt="React Logo" />,
    <img src={pyramid} width="45px" alt="React Logo" />,
    <img src={pres} width="45px" alt="React Logo" />,
    <img src={sett} width="45px" alt="React Logo" />,
    <img src={bulb} width="45px" alt="React Logo" />,

];


// тут состояния указываем

const App = () => {
    const [userInput, setUserInput] = useState('');
    const [responses, setResponses] = useState(Array(6).fill(''));
    const [currentTab, setCurrentTab] = useState(0);
    const [ideasHistory, setIdeasHistory] = useState([]);
// делаем ивенты для юзеримпиута
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };
    const handleRequest = async () => {
        try {
            // делоем запросик по апи
            const response = await axios.post('https://89.232.167.211.sslip.io/api/v1/ml/',{description: userInput});
            // помещаем наш ответик
            const responsesArray = response.data;

            // обновляем состояния
         setResponses(responsesArray);
         setIdeasHistory((prevHistory) => [...prevHistory, responsesArray[currentTab]]);
        } catch (error) {
            console.error('Error making POST request:', error.message);
        }
    };
    // наши табы задаем
    const handleTabChange = (index) => {
        setCurrentTab(index);
    };
    const TabNames = ['Экономика', 'Бизнес модель', 'Конкуренты', 'План развития', 'команда', 'ценностное предложение'];
   const createNewIdea = () => {
       setResponses(Array(6).fill(''));
       setUserInput(" ")
       setCurrentTab(0)
   }
    return (
    <div className="app">
        <section className="side-bar">
            <button onClick={createNewIdea}> New idea</button>
            <ul className="Tabs" onChange={handleTabChange}>
                {TabNames.map((tabName, index) => (
                    <li key={index} onClick={() => handleTabChange(index)} className={currentTab === index ? 'active' : ''}>
                        {TabIcons[index]}
                        {tabName}
                    </li>
                ))}
            </ul>
            <nav>
                <p> OSS IDEA</p>
                <div className="ideas-history">
                    <p>История идей:</p>
                    <ul>
                        {ideasHistory.map((idea, index) => (
                            <li key={index}>{idea}</li>
                        ))}
                    </ul>
                </div>
            </nav>
        </section>
        <section className="main">
            <h1> OSS Business-GPT</h1>
            <ul className="feed">
                {responses[TabNames[currentTab]] && (
                    <p>{responses[TabNames[currentTab]]}</p>
                )}
            </ul>
            <div className="bottom-section">
                <div className="input-container">
                    <input value={userInput} onChange={handleInputChange}/>
                    <div id="submit" onClick={handleRequest}> SUBMIT </div>
                </div>
                <p className="info">
                    Base on GigaChat. Free Research Preview.
                    Our goal is to make AI systems more humanity.
                    Your feedback will help us improve.
                </p>
            </div>
        </section>
    </div>);
};

export default App;





