import Layout from "../components/layout"
import * as jose from 'jose'
import {privkey} from "../secretkey"
import {useState} from "react"
import axios from 'axios';



export default function IndexPage() {

  const [email, setEmail] = useState("");

  async function generateJWT () {
    const privateKey = await jose.importPKCS8(privkey, "RS256")
    const jwt = await new jose.SignJWT({ 'email': email })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(privateKey)

    console.log(jwt)

    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    };

  
    axios.get( 
      'http://localhost:3000/api/receive',
      config
    ).then(console.log).catch(console.log);
  }
  return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
      <h4>email</h4>
      <input onChange={(e) => setEmail(e.target.value)}></input>
      <button onClick={generateJWT}>click meeeeee</button>
    </Layout>
  )
}