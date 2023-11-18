import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import { usePostOrdersMutation } from '../../services/excelTestApi'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import ToastAlert from '../common/ToastAltert/ToastAlert';

const ImportExcel = () => {
    const [postOrdersMutation] = usePostOrdersMutation();

    const navigate = useNavigate();
    const spreadsheetRef = useRef(null);
    const toastRef = useRef(null);

    const created = () => {
        spreadsheetRef.current?.hideFileMenuItems(['Save As']);
        spreadsheetRef.current?.addFileMenuItems(
            [{
                text: 'Save to DDBB', iconCss: 'e-save e-icons', tooltipText: 'Save to DDBB',
                click: (args) => {
                    alert("hola");
                }
            }],
            'Save As',
            false
        );
    };

    const fileMenuItemSelect = (args) => {
        if (args.item.text === "Save to DDBB") {
            handleBeforeSave();
        }
    };

    const handleBeforeSave = () => {
        let spreadsheet = spreadsheetRef.current;

        if (!spreadsheet) {
            return;
        }

        let sheets = spreadsheet.sheets;
        let valid = true;
        let items;
        let orders = [];

        for (let index = 0; index < sheets.length; index++) {
            const rows = spreadsheet.sheets[index].rows;

            if (!rows) {
                break;
            }

            items = rows.slice(1);

            if (items.length === 0) {
                break;
            }

            for (let i = 0; i < items.length; i++) {
                const row = items[i];
                var order = { Id: undefined, Customer: undefined, Freight: undefined, Country: undefined };

                if (!validateRow(row.cells, order)) {
                    valid = false;
                    break;
                } else {
                    if (!!order.Id && !!order.Customer && !!order.Freight && !!order.Country)
                        orders.push(order);
                }
            }

            if (!valid) {
                break;
            }
        }

        if (valid && orders.length > 0) {
            saveOrders(orders);
        } else if (items && items.length === 0) {
            handleToastMessage(false);
        } else {
            handleToastMessage(true);
        }
    };

    const validateRow = (cells, order) => {
        if(cells.length < 4)
            return false;
        
        if (!cells[0].value && !cells[1].value && !cells[2].value && !cells[3].value)
            return true;

        if (!cells[0].value || !cells[1].value || !cells[2].value || !cells[3].value)
            return false;

        if (isNaN(parseInt(cells[0].value, 10)))
            return false;
        else
            order.Id = parseInt(cells[0].value, 10);

        if (typeof cells[1].value != 'string')
            return false;
        else
            order.Customer = cells[1].value;

        if (isNaN(parseFloat(cells[2].value)))
            return false;
        else
            order.Freight = parseFloat(cells[2].value);

        if (typeof cells[3].value != 'string')
            return false;
        else
            order.Country = cells[3].value;

        return true;
    }

    async function saveOrders(orders) {
        try {
            const result = await postOrdersMutation({ Orders: orders });

            if (!!result.data && result.data.data.correct) {
                navigate("/orders");
            } else {
                handleToastMessage(true);
            }

        } catch (error) {
            handleToastMessage(true);
        }
    }

    const handleToastMessage = (error) => {

        if (!toastRef.current) {
            return;
        }

        let title = "";
        let content = "";
        let cssClass = "";

        if (error) {
            title = 'Error';
            content = 'An error occurred while saving the data. Please validate that they follow the order [Order id, Customer, Freight, Country].';
            cssClass = 'e-toast-danger';
        } else {
            title = 'Warning';
            content = 'Not data has introduced.';
            cssClass = 'e-toast-warning';
        }

        toastRef.current.showToast(title, content, cssClass);
    };

    const calculateHeight = () => {
        const screenHeight = window.innerHeight;
        const calculatedHeight = screenHeight * 0.75;
        return calculatedHeight;
    };

    function goToOrders() {
        navigate("/orders");
    }

    return (
        <>
            <SpreadsheetComponent ref={spreadsheetRef} height={calculateHeight()} allowOpen={true} openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' allowSave={true} saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' created={created} fileMenuItemSelect={fileMenuItemSelect} />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <ButtonComponent onClick={goToOrders}>Go to orders</ButtonComponent>
            </div>
            <ToastAlert ref={toastRef} />
        </>
    );
}


export default ImportExcel;