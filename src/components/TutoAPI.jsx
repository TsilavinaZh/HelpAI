import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';


const OptionDevComps = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const [size, setSize] = useState('large');

    
const [activeSection, setActiveSection] = useState('');

useEffect(() => {
  const sections = ['apropos', 'contact', 'docs'];
  const options = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, options);

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
}, []);
    return (
        <>
            <header>
                <nav className="navbar navbar-light navbar-expand-md navigation-clean-button" style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}>
                    <div className="container"><a className="navbar-brand" href="#">Help IA</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item"><a className="nav-link active" href="/">Accueil</a></li>
                                <li className="nav-item"><a className="nav-link" href="/#docs">Guide d'utilisation</a></li>
                                <li className="nav-item"><a className="nav-link" href="/freeapi">API</a></li>

                                <li className="nav-item"><a className="nav-link" href="/#apropos">A Propos</a></li>
                                <li className="nav-item"><a className="nav-link" href="/#contact">Contact</a></li>


                            </ul>
                            <Flex gap="small" align="flex-start" vertical>
                                <Flex gap="small" wrap>
                                    <Button
                                        style={{
                                            backgroundColor: "#13955e",
                                            color: "white",
                                            border: "2px solid #13955e",
                                        }}
                                        shape="round"
                                        icon={!showPopup && <DownloadOutlined />}
                                        size={size}
                                        onClick={togglePopup} // Show or hide the pop-up
                                    >
                                        {showPopup ? "X" : "Télécharger"}
                                    </Button>

                                    {showPopup && (
                                        <div className="popup">
                                            <button
                                                type="button"
                                                className="popup-button"
                                                onClick={() => (window.location.href = "/")}
                                            >
                                                Application mobile
                                            </button>

                                            <button
                                                type="button"
                                                className="popup-button"
                                                onClick={() => (window.location.href = "/")}
                                            >
                                                Version ordinateur
                                            </button>
                                        </div>
                                    )}
                                </Flex>
                            </Flex>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="page-content">

                <Button
                    type="button"
                    className="back-btn"
                    onClick={() => (window.location.href = "/")}
                    shape="round"
                >
                    <ArrowLeftOutlined /> Retourner
                </Button>

                <h2>Documentation de l’API pour les développeurs</h2>

                <p>API de test simple utilisant
                    <pre>
                        <code>/api/:message</code>
                    </pre>
                </p>

                <section>
                    <h2>🔗 URL</h2>

                    <pre>
                        <code>GET http://localhost:3000/api/:message</code>
                    </pre>

                </section>

                <section>

                    <h2>📥 Exemple de requête</h2>

                    <pre><code>GET http://localhost:3000/api/bonjour</code></pre>

                </section>

                <section>

                    <h2>📤 Exemple de réponse</h2>

                    <pre>
                        <code>
                            {`{
 "message": "bonjour",
 "length": 7
 }`}
                        </code>
                    </pre>

                </section>

                <section>

                    <h2>Exemples d'utilisation dans différents langages de programmation</h2>

                    <details>

                        <summary>JavaScript (Node.js ou navigateur)</summary>

                        <pre>

                            <code>{`fetch("http://localhost:3000/api/bonjour")
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));`}
                            </code>

                        </pre>

                    </details>

                    <details>

                        <summary>Python (avec requests)</summary>

                        <pre>

                            <code>{`import requests
response = requests.get("http://localhost:3000/api/bonjour")
data = response.json()
print(data)`}
                            </code>

                        </pre>

                    </details>

                    <details>
                        <summary>Go</summary>
                        <pre>
                            <code>{`package main
 
import (
"encoding/json"
"fmt"
"io/ioutil"
 "net/http"
)
 
 func main() {
 resp, _ := http.Get("http://localhost:3000/api/bonjour")
 defer resp.Body.Close()
 body, _ := ioutil.ReadAll(resp.Body)
 
 var result map[string]interface{}
 json.Unmarshal(body, &result)
 fmt.Println(result)
 }`}</code>

                        </pre>

                    </details>

                    <details>
                        <summary>Java</summary>

                        <pre>

                            <code>{`
 import java.io.BufferedReader;
 import java.io.InputStreamReader;
 import java.net.HttpURLConnection;
 import java.net.URL;

 public class APIClient {
 public static void main(String[] args) throws Exception {
     URL url = new URL("http://localhost:3000/api/bonjour");
     HttpURLConnection con = (HttpURLConnection) url.openConnection();
     con.setRequestMethod("GET");
     BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
     String inputLine;
     StringBuilder content = new StringBuilder();
     while ((inputLine = in.readLine()) != null) {
         content.append(inputLine);
     }
     in.close();
     con.disconnect();
     System.out.println(content.toString());
 }
 }
 `}</code>

                        </pre>

                    </details>

                    <details>

                        <summary>C#</summary>

                        <pre>

                            <code>{`
 using System;
 using System.Net.Http;
 using System.Threading.Tasks;

 class Program {
 static async Task Main() {
     HttpClient client = new HttpClient();
     string result = await client.GetStringAsync("http://localhost:3000/api/bonjour");
     Console.WriteLine(result);
 }
 }
 `}</code>

                        </pre>

                    </details>

                    <details>

                        <summary>Ruby</summary>

                        <pre>
                            <code>{`
 require 'net/http'
 require 'json'

 uri = URI('http://localhost:3000/api/bonjour')
 response = Net::HTTP.get(uri)
 data = JSON.parse(response)
 puts data
 `}</code>
                        </pre>

                    </details>

                    <details>

                        <summary>Rust</summary>

                        <pre>
                            <code>{`
 use reqwest;
 use serde_json::Value;

 #[tokio::main]
 async fn main() -> Result<(), Box<dyn std::error::Error>> {
 let resp = reqwest::get("http://localhost:3000/api/bonjour")
     .await?
     .text()
     .await?;

 let json: Value = serde_json::from_str(&resp)?;
 println!("{:#?}", json);
 Ok(())
 }
 `}</code>
                        </pre>

                    </details>

                    <details>
                        <summary>Swift</summary>
                        <pre>
                            <code>{`
 import Foundation
 let url = URL(string: "http://localhost:3000/api/bonjour")!

 let task = URLSession.shared.dataTask(with: url) { data, _, _ in
 if let data = data,
 let json = try? JSONSerialization.jsonObject(with: data) {
     print(json)
 }
 }
 task.resume()
 `}</code>
                        </pre>
                    </details>

                    <details>
                        <summary>Bash</summary>
                        <pre>
                            <code>{`curl -s http://localhost:3000/api/bonjour | jq`}</code>
                        </pre>
                    </details>

                </section>

            </div>

            <footer className="footer-clean">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-sm-4 col-md-3 item">

                            <h3>Nos Pages</h3>

                            <ul>

                                <li><a href="">Accueil</a></li>

                                <li><a href="">Documentations</a></li>

                            </ul>

                        </div>

                        <div className="col-sm-4 col-md-3 item">
                            <h3>Informations</h3>

                            <ul>

                                <li><a href="">Qui sommes-nous ?</a></li>

                                <li><a href="">Contactez-nous ?</a></li>

                            </ul>

                        </div>

                        <div className="col-lg-3 item social" style={{ textAlign: "center" }}>

                            <a href="#"><i className="icon ion-social-facebook"></i></a>

                            <p className="copyright">Octopus-Dev © 2025</p>

                        </div>

                    </div>

                </div>

            </footer>

        </>

    );
};

export default OptionDevComps;
