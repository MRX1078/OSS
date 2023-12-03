import React, { useState } from 'react';
import axios from 'axios';
import {
    Button,
    Container,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import economy from '/home/he0982/WebstormProjects/untitled/src/logo/economy-svgrepo-com.svg'
import bulb from '/home/he0982/WebstormProjects/untitled/src/logo/light-bulb-idea-svgrepo-com.svg'
import business from '/home/he0982/WebstormProjects/untitled/src/logo/presentation-business-and-finance-svgrepo-com.svg'
import pres from '/home/he0982/WebstormProjects/untitled/src/logo/presentation-svgrepo-com.svg'
import pyramid from '/home/he0982/WebstormProjects/untitled/src/logo/pyramid-svgrepo-com.svg'
import sett from '/home/he0982/WebstormProjects/untitled/src/logo/settings-gear-svgrepo-com.svg'
// Тут иконочки
const TabIcons = [
    <img src={economy} width="45px" alt="React Logo" />,
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
// делаем ивенты для юзеримпиута
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };



    const handleRequest = async () => {
        try {
            // делоем запросик по апи или хуй знает как{
            const response = await axios.post('http://87.242.91.128/api/v1/ml/',{description: userInput});
            // Assuming the API response contains an array of 6 strings
            const responsesArray = response.data;

            // Update state with the response data
         setResponses(responsesArray);
        } catch (error) {
            console.error('Error making POST request:', error.message);
        }
    };
    // наши табы задаем
    const handleTabChange = (_, newTab) => {
        setCurrentTab(newTab);
    };
    const TabNames = ['Экономика', 'Бизнес модель', 'Конкуренты', 'План развития', 'команда', 'ценностное предложение'];

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Веб-сервис для проработки идей проектов
            </Typography>
            <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    О решения
                </Typography>
                <Typography>
                    Этот веб-сервис позволяет вводить идеи проектов с помощью текстовой области, расположенной ниже. После отправки он генерирует и прорабатывает ключевые параметры проекта основе ваших данных. Старайтесь максимально подробно описывать вашу идею, но не используйте дополнительные описания относительно того, что хотите получить на выходе. Будьте креативны в том, что пишите и не бойтесь перегенерить, если ответ вам не понравился.
                </Typography>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <TextField
                    label="Напишите вашу идею"
                    multiline
                    fullWidth
                    value={userInput}
                    onChange={handleInputChange}
                    variant="outlined"
                    style={{ marginBottom: '20px' }}
                />
                <Button variant="contained" color="primary" onClick={handleRequest}>
                    Отправить
                </Button>
            </Paper>

            <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
                <Tabs orientation="vertical" value={currentTab} onChange={handleTabChange}>
                    {TabNames.map((tabName, index) => (
                        <Tab key={index} label={TabNames[index]} icon={TabIcons[index]} />
                    ))}
                </Tabs>
            </Paper>

            <Paper elevation={10} style={{ marginLeft: '0px', padding: '20px', flex: '1', marginTop: '20px' }}>
                <div>
                    <h3>Ответ по разделу: {TabNames[currentTab]}</h3>
                    {responses[TabNames[currentTab]] && (
                        <p>{responses[TabNames[currentTab]]}</p>
                    )}
                </div>
            </Paper>
        </Container>
    );
};

export default App;





//   const [data, setData] = useState({});
//   const [selectedTab, setSelectedTab] = useState(0);
//
//   useEffect(() => {
//     // берем данные с сервера
//     fetch('')
//       .then((response) => response.json())
//       .then((jsonData) => setData(jsonData))
//       .catch((error) => console.error('Ошибка обработки данных:', error));
//   }, []);
//
//   const handleChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };
//
//   return (
//     <div>
//       <Tabs value={selectedTab} onChange={handleChange} centered>
//         {Object.keys(data).map((key, index) => (
//           <Tab key={index} label={key} />
//         ))}
//       </Tabs>
//       {Object.keys(data).map((key, index) => (
//         <TabPanel key={index} value={selectedTab} index={index}>
//           <Typography variant="h5">{data[key]}</Typography>
//         </TabPanel>
//       ))}
//     </div>
//   );
// };
//
// const TabPanel = ({ children, value, index }) => (
//   <div role="tabpanel" hidden={value !== index}>
//     {value === index && <Box p={3}>{children}</Box>}
//   </div>
// );