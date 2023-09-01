import { useState } from 'react';

interface User {
    uid: string;
    name: string;
}

export const Usuario = () => {

    const [user, setUser] = useState<User>();

    const login = () => {
       setUser({
        uid: 'ADC123',
        name: 'Elizabeth Arroyo Esacandon'

    });

}


    return (
        <div className="mt-5">
            <h3>Usuario: useState</h3>

            <button
              onClick={ login }
              className="btn btn-outline-primary">
              Login
            </button>

            <pre> { JSON.stringify( user ) }</pre>
        </div>
    )
}