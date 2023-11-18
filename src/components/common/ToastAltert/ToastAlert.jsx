import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import * as React from "react";

const ToastAlert = React.forwardRef((props, ref) => {
    const toastInstanceRef = React.useRef(null);

    React.useEffect(() => {
        if (ref) {
            ref.current = {
                showToast: (title, content, cssClass) => {
                    toastInstanceRef.current.setProperties({
                        title: title,
                        content: content,
                        cssClass: cssClass,
                    });
                    
                    toastInstanceRef.current.show();
                },
            };
        }
    }, [ref]);

    return (
        <div>
            <div id='#toast_target' />
            <ToastComponent
                id='toast_target'
                ref={(toast) => (toastInstanceRef.current = toast)}
                title="Default Title"
                content="Default Content"
                cssClass="e-toast-success"
                showCloseButton={true}
            />
        </div>
    );
});

export default ToastAlert;