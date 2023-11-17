import { createSpinner, showSpinner  } from '@syncfusion/ej2-popups';
import React, { useEffect } from 'react';

const LoadingIndicator = () => {

    useEffect(() => {
        componentDidMount();
    });
    function componentDidMount(prevProps) {
        createSpinner({
            target: document.getElementById('container'),
        });
        showSpinner(document.getElementById('container'));
    }
    return (<div className="control-pane">
        <div id="container" className="control-section col-lg-12 spinner-target"></div>
    </div>);
}


export default LoadingIndicator;