<?php
// Base URL del servidor m3u8 (sin el archivo final)
$base_url = 'https://cl-a3-p-e-uy6.cdn.mdstrm.com/live-stream-gdai/linear/hls/pa/event/-4KOuBUDTUaXhzNVqMNjsQ/stream/c05bf331-928b-4344-b87a-f7b3be49fd48:MRN2/master.m3u8?aid=51c2f628b440bd797900051f&uid=xDBMZ2b5WmyhXhJttVUgrMq0XpB2gliK&sid=aNwHN7P3rswqYRr3GwOLM0k50P3Za0lV&pid=E5o1PKZ36t6cwhUJADNG3d2rLLtZxLiZ&pid_dvr=mfKzPV64C7bB3KVieq7OFyGdZjIlRx8X&ref=&without_cookies=false&listenerid=&dnt=true&access_token=t0rpjGfMISaVWK2DBNYU5SBMGy6Sewup9WFdkQAqqxxW2p9Y7iJOqwDbpmT0XACuNgJY4OwfolW&adInsertionGoogleStreamId=c05bf331-928b-4344-b87a-f7b3be49fd48%3AMRN2&es=cl-a3-p-e-uy6.cdn.mdstrm.com&ote=1753679953168&ot=CHeEZzRI4bpn4n6CnsxCPg&proto=https&pz=cl
';
$query_string = $_SERVER['QUERY_STRING'];

// Nombre del archivo solicitado (por ej. master.m3u8, chunklist_*.m3u8, segment.ts, etc.)
$requested_file = isset($_GET['file']) ? $_GET['file'] : 'master.m3u8';

// Construye la URL completa
$remote_url = $base_url . $requested_file;
if (!empty($query_string)) {
    $remote_url .= '?' . $query_string;
}

// Detectar tipo de archivo
$ext = pathinfo($requested_file, PATHINFO_EXTENSION);
$content_types = [
    'm3u8' => 'application/vnd.apple.mpegurl',
    'ts'   => 'video/mp2t'
];
$content_type = $content_types[$ext] ?? 'application/octet-stream';

// Configurar headers
header("Content-Type: $content_type");
header("Access-Control-Allow-Origin: *");

// Reenviar contenido
$ch = curl_init($remote_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpcode);
echo $response;
?>
