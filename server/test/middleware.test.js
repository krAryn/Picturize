import {afterEach, describe, it} from "mocha"
import sinon from "sinon"
import { authUser } from "../middlewares/user.auth.js"
import {expect} from "chai"
import jwt from "jsonwebtoken"

describe("Authentication Middleware:", () =>  {

    afterEach(() => {
        sinon.restore()
    })

    it("should call next(), if token is set in the cookies and is valid", () => {
        const req = {
            cookies: {token: "a#test#token"},
            headers: {}
        }
        const res = {
            json: sinon.spy()
        }
        const next = sinon.spy()
        sinon.stub(jwt, "verify").returns({id: "test#id"})
        authUser(req, res, next)
        expect(next.calledOnce).to.equal(true)
        expect(req.headers.user_id).to.equal("test#id")
        jwt.verify.restore()
    })

    it("should return 'Token not Found!', if token is not set", () => {

        const req = {
            cookies: {},
        }
        const res = {
            json: obj => obj 
        }
        expect(authUser(req, res, () => {}).message).to.equal("Token not Found!")
    })
})