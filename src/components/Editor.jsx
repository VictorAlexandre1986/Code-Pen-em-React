import { useEffect, useState } from "react"
import useLocalStorage from "../storage"

import './Editor.css'

const Editor = () =>{
    const [html, setHtml] = useLocalStorage("html","")
    const [css, setCss] = useLocalStorage("css","")
    const [js, setJs] = useLocalStorage("js","")
    const [codepenCode, setCodepenCode] = useState("");

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setCodepenCode(`
                <html>
                    <head>
                        <style>${css}</style>
                        <script defer>${js}</script>
                    </head>
                    <body>${html}</body>
                    <script>${js}</script>
                </html>
            `);
        },200);

        return () => clearTimeout(timeout)
    },[html, css, js])

    return(
        <div className="wrapper">
            <div className="header"><h1>Editor Web</h1></div>
            <div className="input-cover">
                <textarea value={html} type='text' placeholder="Insira o código html..." onChange={(e) => { setHtml(e.target.value)}} />
                <div className="separador"></div>
                <textarea value={css} type='text' placeholder="Insira o código css..." onChange={(e) => { setCss(e.target.value)}} />
                <div className="separador"></div>
                <textarea value={js} type='text' placeholder="Insira o código javascript..." onChange={(e) => { setJs(e.target.value)}} />
            </div>
            <div className="output">
                <iframe srcDoc={codepenCode}
                            allow
                             title="output"
                             sandbox="allow-scripts allow-forms allow-popups allow-same-origin allow-top-navigation allow-pointer-lock" 
                             seamless="seamless"
                             width="100%"
                             height="100%"
                ></iframe>
            </div>
        </div>
    )

}

export default Editor