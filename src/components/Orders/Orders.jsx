import React, { useEffect, useState, useRef } from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { useLazyGetOrdersQuery, useLazyGetCountriesQuery, usePostOrdersMutation, usePutOrderMutation, useRemoveOrderMutation } from '../../services/excelTestApi'
import ToastAlert from '../common/ToastAltert/ToastAlert';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const [getOrders, getOrdersStatus] = useLazyGetOrdersQuery();
    const [getCountries] = useLazyGetCountriesQuery();
    const [postOrdersMutation] = usePostOrdersMutation();
    const [putOrdersMutation] = usePutOrderMutation();
    const [removeOrdersMutation] = useRemoveOrderMutation();
    const [search, setSearch] = useState({ Page: 1, PageSize: 10000, customerid: undefined, country: undefined, all: true });
    const [countries, setCountries] = useState([]);

    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', showDeleteConfirmDialog: true };
    const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const pageOptions = {
        pageSize: 10, pageSizes: false
    };
    const orderIDRules = { required: true, number: true };
    const customerIDRules = { required: true, minLength: 3 };
    const freightIDRules = { required: true, number: true };
    const countryIDRules = { required: true };
    const toastRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getCountriesSearch() {
            const getCountriesResult = await getCountries();
            setCountries(getCountriesResult?.data?.data?.countries || []);
        }

        getCountriesSearch();
    }, [getCountries]);

    useEffect(() => {
        async function getOrdersSearch() {
            await getOrders(search);
        }

        getOrdersSearch();
    }, [search, getOrders]);

    const changeCustomerSearch = (e) => {
        setSearch({ Page: 1, PageSize: 10000, customerid: e.value, country: search.country, all: search.all });
    };

    const changeCountrySearch = (e) => {
        setSearch({ Page: 1, PageSize: 10000, customerid: search.customerid, country: e.value, all: search.all });
    };

    const changeAndOrSearch = (e) => {
        setSearch({ Page: 1, PageSize: 10000, customerid: search.customerid, country: search.country, all: e.value });
    };

    const actionBeginHandler = async (args) => {
        const { requestType, action, data } = args;

        switch (requestType) {
            case 'save':
                switch (action) {
                    case 'add':
                        args.cancel = true;
                        try {
                            const postOrdersRequest = {
                                Orders: [{ Id: data.Id, Customer: data.Customer, Freight: data.Freight, Country: data.Country }],
                            };
                            const postOrdersResult = await postOrdersMutation(postOrdersRequest);

                            if (postOrdersResult.error) {
                                handleToastMessage("Error creating the order");
                            }

                        } catch (error) {
                            handleToastMessage("Error creating the order");
                        }
                        break;

                    case 'edit':
                        try {
                            const putOrderRequest = { Id: data.Id, Customer: data.Customer, Freight: data.Freight, Country: data.Country };
                            const putOrderResult = await putOrdersMutation(putOrderRequest);
                            if (putOrderResult.error) {
                                args.cancel = true;
                                handleToastMessage("Error editing the order");
                            }
                        } catch (error) {
                            args.cancel = true;
                            handleToastMessage("Error editing the order");
                        }
                        break;
                    default:
                        break;
                }

                break;

            case 'delete':
                args.cancel = true;
                try {
                    const removeOrderRequest = { Id: data[0].id };
                    const removeOrderResult = await removeOrdersMutation(removeOrderRequest);
                    if (removeOrderResult.error) {
                        args.cancel = true;
                        handleToastMessage(`The order with id ${data[0].id} no longer exists`);
                    }
                } catch (error) {
                    args.cancel = true;
                    handleToastMessage("Error deleting the order");
                }
                break;

            default:
                break;
        }
    };

    const handleToastMessage = (content) => {

        if (!toastRef.current) {
            return;
        }

        let title = "";
        let cssClass = "";

        title = 'Error';
        cssClass = 'e-toast-danger';

        toastRef.current.showToast(title, content, cssClass);
    };

    function returnImportExcel() {
        navigate("/importexcel");
    }

    return <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <TextBoxComponent placeholder="Customer ID" floatLabelType="Auto" style={{ width: '50%' }} input={changeCustomerSearch} />
                <ComboBoxComponent id="comboelement" dataSource={countries} placeholder="Select a country" change={changeCountrySearch} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <RadioButtonComponent label="AND" name="andor" value={true} checked={true} change={changeAndOrSearch} />
                <RadioButtonComponent label="OR" name="andor" value={false} change={changeAndOrSearch} />
            </div>
        </div>
        <div style={{ marginTop: '20px' }}>
            <GridComponent dataSource={getOrdersStatus.data?.data?.orders} editSettings={editOptions} toolbar={toolbarOptions} actionBegin={actionBeginHandler} height={369} allowPaging={true} pageSettings={pageOptions}>
                <ColumnsDirective>
                    <ColumnDirective field='Id' headerText='Order ID' format="N0" editType='numericedit' validationRules={orderIDRules} width='100' textAlign="Right" isPrimaryKey={true} />
                    <ColumnDirective field='Customer' headerText='Customer ID' width='120' validationRules={customerIDRules} />
                    <ColumnDirective field='Freight' headerText='Freight' width='120' format="C2" editType='numericedit' textAlign="Right" validationRules={freightIDRules} />
                    <ColumnDirective field='Country' headerText='Ship Country' editType='dropdownedit' width='150' validationRules={countryIDRules} />
                </ColumnsDirective>
                <Inject services={[Edit, Toolbar, Page]} />
            </GridComponent>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <ButtonComponent onClick={returnImportExcel}>Return to import excel</ButtonComponent>
        </div>
        <ToastAlert ref={toastRef} />
    </>;
}


export default Orders;