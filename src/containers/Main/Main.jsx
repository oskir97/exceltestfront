import { Outlet } from 'react-router-dom';
import './Main.css';

const Main = () => {
    return(
        <div className='mainContainter'>
            <Outlet />
        </div>
    );
}


export default Main;