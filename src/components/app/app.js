import React from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';
import { withBookstoreService } from '../hoc'
import './app.css';

const App  = ({ bookstoreService }) =>{
    
    console.log(bookstoreService.getBooks())

    return(
        <div>
            <ErrorIndicator/>
            <Spinner/>
        </div>
    )
}

export default withBookstoreService()(App);