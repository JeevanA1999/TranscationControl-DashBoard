import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./MainPage.css";
import SideBar from '../SideBar/SideBar';
// import { toggleSidebar, toggleRightBar } from '../../store/sidebarSlice';
import TranscationBar from '../ContentPage/TranscationBar';
import ContentPage from '../ContentPage/ContentPage';
 import RightBar from '../RightBar/RightBar';


function MainPage() {
    const isOpen = useSelector(state => state.sidebar.isOpen);
    const rightBar = useSelector(state => state.sidebar.rightBar);

    return (
        <div className='main-container'>
            <div className='sideBar-container'>
                <SideBar />
            </div>

            <div className={`content-container ${rightBar ? 'with-right-bar' : 'full-width'}`}>
                {isOpen && (
                    <div className='transaction-bar'>
                        {/* Transaction Bar
                        <button onClick={() => dispatch(toggleSidebar())}>Hide</button> */}
                        <TranscationBar/>
                    </div>
                )}
                <div className='content-bar'>
                    {/* Content Bar
                    <button onClick={() => dispatch(toggleSidebar())}>
                        {isOpen ? "Hide Transaction Bar" : "Show Transaction Bar"}
                    </button> */}
                    {/* <button onClick={() => dispatch(toggleRightBar())}>
                        {rightBar ? "Hide Right Bar" : "Show Right Bar"}
                    </button> */}
                    <ContentPage/>
                </div>
            </div>
            
            {/*  <div className='right-container'><RightBar/></div>} */}
        </div>
    );
}

export default MainPage;
