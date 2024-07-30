import {useCallback, useContext, useEffect} from 'react';
import {Form, Modal} from 'antd';
import FormBuilder from 'antd-form-builder';
import NiceModal, {useModal, antdModal} from '@ebay/nice-modal-react';
import {UpdateTokens} from "../../API/UpdateTokens";
import {AuthContext, ReportServiceContext} from "../../context";
import {useFetching} from "../../Hooks/useFetching";
import React from "react";
import {useNavigate} from "react-router-dom";


export default NiceModal.create(() => {
    const reportService = useContext(ReportServiceContext)
    const navigate=useNavigate();
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const modal = useModal();
    const [form] = Form.useForm();
    const meta = {
        fields: [
            {key: 'name', label: "Report's name", required: true},
            {key: 'description', label: "Report's description", required: true},
        ],
    };
    const [createReport, isReportCreating, createError] = useFetching(async (newReport) => {
        const userId = localStorage.getItem("userId");
        const response = await reportService.CreateReport(newReport.name, newReport.description, userId);
        if (response.code === "ERR_BAD_REQUEST") {
            await UpdateTokens(setIsAuth, navigate, handleSubmit, reportService)
        } else {
            modal.resolve(response.data.data);
            await modal.hide();
        }
    })

    useEffect(() => {
        if (createError) {
            alert(`An error occurred while creating the report: ${createError}.\nPlease try again later`);
        }
    }, [createError]);

    const handleSubmit = useCallback(() => {
        form.validateFields().then(async () => {
            const newReport = {...form.getFieldsValue()};
            await createReport(newReport);
            modal.resolve(newReport);
            await modal.hide();
        }).catch(() => {
        });
    }, [form, modal]);
    
    
    return (
        <Modal
            {...antdModal(modal)}
            title={'New User'}
            okText={'Create'}
            onOk={handleSubmit}
            confirmLoading={isReportCreating}
        >
            <Form form={form}>
                <FormBuilder meta={meta} form={form}/>
            </Form>
        </Modal>
    );
})

 