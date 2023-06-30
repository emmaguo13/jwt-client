import Layout from "../components/layout"
import * as jose from 'jose'
import {useState} from "react"
import axios from 'axios';

export default function IndexPage() {

  const [email, setEmail] = useState("");

  async function generateJWT () {
    const privateKey = await jose.importPKCS8(process.env.NEXT_PUBLIC_PRIVATE_KEY as string, "RS256")
    const jwt = await new jose.SignJWT({ 'email': email })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
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
      process.env.NEXT_PUBLIC_BASE_URL + 'api/receive',
      config
    ).then(console.log).catch(console.log);
  }
  return (
    <Layout>
      <h1>JWT generator</h1>
      <p>
        This site generates a JWT containing your email, and passes it to an endpoint to expose the JWT in network requests.
      </p>
      <h4>email</h4>
      <input onChange={(e) => setEmail(e.target.value)}></input>
      <button onClick={generateJWT}>click meeeeee</button>
    </Layout>
  )
}