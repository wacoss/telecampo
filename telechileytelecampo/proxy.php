<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Base URL del servidor remoto (sin el archivo final)
$base_url = 'https://cl-a3-p-e-uy6.cdn.mdstrm.com/live-stream-gdai/linear/hls/pa/event/-4KOuBUDTUaXhzNVqMNjsQ/stream/c05bf331-928b-4344-b87a-f7b3be49fd48:MRN2/';

// Obtiene el archivo solicitado, por defecto master.m3u8
$requested_file = isset($_GET['file']) ? $_GET['file'] : 'master.m3u8';

// Construye la URL completa al recurso remoto
$remote_url = $base_url . $requested_file;

// Detecta extensión para el Content-Type
$ext = pathinfo($requested_file, PATHINFO_EXTENSION);
$content_types = [
    'm3u8' => 'application/vnd.apple.mpegurl',
    'ts'   => 'video/mp2t'
];
$content_type = $content_types[$ext] ?? 'application/octet-stream';

// Configura headers
header("Content-Type: $content_type");
header("Access-Control-Allow-Origin: *");

// Inicializa cURL
$ch = curl_init($remote_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Si es un archivo m3u8, reescribe las rutas internas para apuntar al proxy
if ($ext === 'm3u8' && $httpcode == 200) {
    $lines = explode("\n", $response);
    foreach ($lines as &$line) {
        $line = trim($line);
        // Solo modifica líneas que no son comentarios (#)
        if ($line !== '' && !str_starts_with($line, '#')) {
            // Cambia la ruta para que pase por el proxy con ?file=
            $line = $_SERVER['PHP_SELF'] . '?file=' . urlencode($line);
        }
    }
    $response = implode("\n", $lines);
}

curl_close($ch);

http_response_code($httpcode);
echo $response;
