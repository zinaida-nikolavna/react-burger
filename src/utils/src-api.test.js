import {
        registerUser, 
        fetchData, 
        postData, 
        emailExist, 
        resetPassword,
        authorization,
        getUserRequest,
        getNewToken,
        refreshUser,
        logoutRequest
    } from './src';

describe('check api functions', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(
                { result: 'OK'}
            ),
            ok: true
        })
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test('should be register succesful', async () => {
        const registerResults = await registerUser('email', '123');
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be fetchData succesful', async () => {
        const registerResults = await fetchData();
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be postData succesful', async () => {
        const registerResults = await postData(['1234543553']);
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be emailExist succesful', async () => {
        const registerResults = await emailExist('email');
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be resetPassword succesful', async () => {
        const registerResults = await resetPassword({password: '123', token: '1232323213'});
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be authorization succesful', async () => {
        const registerResults = await authorization({password: '123', email: 'email'});
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be getUserRequest succesful', async () => {
        const registerResults = await getUserRequest();
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be getNewToken succesful', async () => {
        const registerResults = await getNewToken();
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be refreshUser succesful', async () => {
        const registerResults = await refreshUser({password: '123', email: 'email'});
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })

    test('should be logoutRequest succesful', async () => {
        const registerResults = await logoutRequest();
        expect(registerResults).toEqual({ result: 'OK' });
        expect(fetch).toHaveBeenCalledTimes(1);
    })
})