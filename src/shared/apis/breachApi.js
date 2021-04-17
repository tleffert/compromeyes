import axios from 'axios';

/**
 * Fetches list of breaches based on given email
 * @param  {string} email [description]
 * @return {[Breach]}       [description]
 */
export const listBreaches = (email) => {
    return axios.get(
        `http://localhost:4200/api/breaches?email=${email}`
    );
}
