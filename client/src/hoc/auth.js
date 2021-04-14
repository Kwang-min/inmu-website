import React, { useEffect } from 'react';
import Axios from 'axios';

export default function Auth(SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {

        useEffect(() => {
            Axios.get('/api/users/auth')
            .then(response => {
                if (!response.data.isAuth) {
                    if (option) {
                        props.history.push('/login');
                    }
                } else {
                    if (adminRoute && !response.data.isAdmin) {
                        props.history.push('/');
                    } else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

                
        
        }, [props])

        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}
