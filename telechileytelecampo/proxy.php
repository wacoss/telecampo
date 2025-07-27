<?php
// URL real del stream m3u8 (capturada desde el navegador)
$stream_url = 'https://cl-a3-p-e-uy6.cdn.mdstrm.com/live-stream-gdai/linear/hls/pa/event/-4KOuBUDTUaXhzNVqMNjsQ/stream/c05bf331-928b-4344-b87a-f7b3be49fd48:MRN2/master.m3u8?aid=51c2f628b440bd797900051f&uid=xDBMZ2b5WmyhXhJttVUgrMq0XpB2gliK&sid=aNwHN7P3rswqYRr3GwOLM0k50P3Za0lV&pid=E5o1PKZ36t6cwhUJADNG3d2rLLtZxLiZ&pid_dvr=mfKzPV64C7bB3KVieq7OFyGdZjIlRx8X&ref=&without_cookies=false&listenerid=&dnt=true&access_token=t0rpjGfMISaVWK2DBNYU5SBMGy6Sewup9WFdkQAqqxxW2p9Y7iJOqwDbpmT0XACuNgJY4OwfolW&adInsertionGoogleStreamId=c05bf331-928b-4344-b87a-f7b3be49fd48%3AMRN2&es=cl-a3-p-e-uy6.cdn.mdstrm.com&ote=1753679953168&ot=CHeEZzRI4bpn4n6CnsxCPg&proto=https&pz=cl'; // reemplaza aquí

// Configura encabezados para reenviar correctamente
header('Content-Type: application/vnd.apple.mpegurl'); // o application/x-mpegURL
header('Access-Control-Allow-Origin: *'); // para permitir CORS si lo usas en web

// Reenvía la señal
$ch = curl_init($stream_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // simula navegador

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Devuelve la respuesta del stream original
http_response_code($httpcode);
echo $response;
?>
