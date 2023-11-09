import { expect } from "chai";
import supertest from "supertest";
import { dropUser } from "./setup.test.js";

const request = supertest('http://localhost:8040')
describe('Test Case Session',()=>{

    it('Test 1',async()=>{
        //console.log("Test")
        const result = await request.get('/api/sessions/failedRegister')
       // console.log(result)
        expect('valor')
        expect(result.statusCode).to.be.eql(200)
    })

    it('Test 2 [POST]  /api/sessions/ ',async()=>{

        //dropUser();

        const mock={
            first_name: ' prueba',
            last_name: 'prueba',
            email: '123@123',
            password: '1234'
        }

        const result = await request.post('/api/sessions/register').send(mock)
        expect(result.statusCode).to.be.eql(500)
        console.log(result)
        expect('valor')

    })
    it('Test 3',async()=>{

        console.log("Test")
        expect('valor')

    })
})