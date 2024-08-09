import { styled } from 'styled-components';
import { useState } from 'react'
import { Bs1Circle, Bs2Circle, Bs3Circle } from "react-icons/bs";
import './Tabs.css';


export function Tabs() {

    const [activeTab, setActiveTab] = useState(-1);
    const selectTab = (index) => {
        setActiveTab(index);
    }

    return (
        <Container className='container' activeTab = {`${activeTab}00%`}>
            <ul className='tabs'>
                <li className={activeTab === -1 ? "active" : ""} onClick={() => selectTab(-1)}>
                    <Bs1Circle />
                </li>
                <li className={activeTab === 0 ? "active" : ""} onClick={() => selectTab(0)}>
                    <Bs2Circle />
                </li>
                <li className={activeTab === 1 ? "active" : ""} onClick={() => selectTab(1)}>
                    <Bs3Circle />
                </li>
                <span className='indicator'></span>
            </ul>
            <div className='tab-content'>
                {activeTab === -1 && <h1>Tab 1</h1>}
                {activeTab === 0 && <h1>Tab 2</h1>}
                {activeTab === 1 && <h1>Tab 3</h1>}
            </div>
        </Container>
    );
}

const Container = styled.div`
.tabs .indicator{
    transform: translateX(${(props)=>props.activeTab});
}
`;