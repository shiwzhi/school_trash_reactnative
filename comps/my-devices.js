import React, { useEffect, useState } from 'react';
import axios from '../js/axios'
import { withNavigation } from 'react-navigation';

import { Container, Content, Text, Button } from 'native-base'

import LoginPage from './login'

function DeviceTable(props) {
    let [loginState, setLoginState] = useState(false)
    let [devices, setDevices] = useState([])

    useEffect(() => {
        console.log("USEREFFECT")
        axios.get("/api/user/devices").then(res => {
            console.log("LOGINSUCCESS")
            console.log(res.data)
            setLoginState(true)
            // setDevices(res.data.devices)
        }).catch(error => {
            if (error.response.status === 401) {
                console.log("LOGINFAILED")
                setLoginState(false)
            }
        })
    }, [loginState])

    if (!loginState) {
        return (
            <LoginPage setLoginState={setLoginState} />
        )
    } else {
        
        return (
            <Container>
                <Content padder>

                </Content>
            </Container>
        )
    }

}

export default withNavigation(DeviceTable)