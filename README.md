<h1>Rev Academy CTF</h1>
<p>My attempt at reverse engineering the CTFs a few days ago, I didn't post them since I was a bit busy personally.</p>

<ol>
    <li>JS
        <ol>
            <li>
                Unsolved. Rather deobfuscated and traced the entire challenge. I would assume my decoder is off and the flag is correct. I believe the issue may lie in me not handling a part of "EncodeVarint" though I'm not sure. I'm able to decode encoded strings from the challenge itself, but decoding the flag rather seems impossible. Might be due to lack of experience. Had fun bruteforcing the 'Maybe...'
            </li>
        </ol>
    </li>
    <li>WASM
        <details>
            <summary>Click to reveal flags</summary>
            <ol>
                <li>FLAG{nice_you_found_me_in_the_wasm}</li>
                <li>RevAcademy{64e2a969119bd4aa9b8f5ee8134a2}</li>
                <li>picoCTF{ef9a7459f2a80ed93d5a7004a6ffc155}</li>
            </ol>
        </details>
    </li>
    <li>
        <details>
            <summary>Click to reveal Decrypt data</summary>
            <p>
                {"code":"decryptable","url":"https://whop.com/reverser-academy/","discount":50,"message":"Congratulations! Want to learn more about Reverse Engineering both Mobile apps and Web apps? Check out our academy, and get 50% off!","weTeach":["JS Reversal","Writing Custom Deobfuscators","WASM Reversal","JSVM Reversal","TikTok Reversal","Captcha & Antibot Reversal","SO MUCH MORE"]}
            </p>
        </details>
    </li>
</ol>
