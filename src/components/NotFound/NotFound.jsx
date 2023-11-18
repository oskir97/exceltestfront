import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    function returnImportExcel() {
        navigate("/importexcel");
    }

    return (
        <>
            <MessageComponent content="This page not found, pages availables: importexcel and orders"></MessageComponent>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <ButtonComponent onClick={returnImportExcel}>Return to import excel</ButtonComponent>
            </div>
        </>
    );
}


export default NotFound;