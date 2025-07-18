  document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            const channelList = document.getElementById('channelList');
            const iframe = document.getElementById('iframe');
            const toggleSidebar = document.getElementById('toggleSidebar');
            let activeIndex = 0;

            // Lista de canales
            const channels = {
                  
            'Inicio': 'flipflapclock.html',  // si lo quitas el primer canal se reproducirá pausado,
            'TVN': 'miplayer.html?file=https://mdstrm.com/live-stream-playlist-v/5346f5f2c1e6f5810b5b9df0.m3u8',  
            'TV+': 'miplayer.html?file=https://jireh-6-hls-video-cl-movistar.dps.live/hls-video/ey6283je82983je9823je8jowowiekldk9838274/tvmas/tvmas.smil/playlist.m3u8',   
            'Mega': 'miplayer.html?file=https://unlimited1-cl-isp.dps.live/mega/mega.smil/playlist.m3u8',  
            ' 13': 'miplayer.html?file=https://unlimited1-cl-isp.dps.live/t13radio/t13radio.smil/playlist.m3u8', 
            'CHV': 'canales/chv.html',    
            'Canal 9': 'miplayer.html?file=https://unlimited6-cl.dps.live/c9/c9.smil/playlist.m3u8',   
            'TVU': 'canales/tvu.html', 
            'UCV': 'miplayer.html?file=https://unlimited2-cl-isp.dps.live/ucvtv2/ucvtv2.smil/ucvtv2/livestream2/chunks.m3u8',   
            'Tevex': 'miplayer.html?file=https://v2.tustreaming.cl/tevex/index.m3u8',   
            'Tevex YT': 'canales/tevexyt.html', 
            'Zona Latina YT': 'canales/zonalatina.html', 
            'Teletrece': 'canales/teletrece.html',   
            '24 Horas': 'canales/24horas.html',   
            'Meganoticias': 'canales/meganoticias.html',   
            'CHV Noticias': 'canales/chvnoticias.html',
            'DW': 'canales/dw.html',
            'TVE': 'miplayer.html?file=https://rtvelivestream-rtveplayplus.rtve.es/rtvesec/int/tvei_ame_main_dvr_576.m3u8',    
            'RTVE': 'canales/rtve.html',  
            //'Euronews': 'https://www.youtube.com/embed/live_stream?channel=UCyoGb3SMlTlB8CLGVH4c8Rw&autoplay=1&mute=0',
            'Euronews': 'canales/euronews.html',  
            'France 24': 'canales/france24.html',  
            'CBS News': 'miplayer.html?file=https://dai.google.com/linear/hls/event/EezGs5EpSjSr-sYjB2qysw/master.m3u8',
            'ABC News': 'miplayer.html?file=https://content.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be.m3u8', 
            '13C': 'miplayer.html?file=https://origin.dpsgo.com/ssai/event/GI-9cp_bT8KcerLpZwkuhw/master.m3u8',  
            'NTV': 'canales/ntv.html',  
            '13 pop': 'miplayer.html?file=https://origin.dpsgo.com/ssai/event/WKlE4m31TOijQS05TZmhqw/master.m3u8',  
            'TVN 3': 'miplayer.html?file=https://mdstrm.com/live-stream-playlist/5653641561b4eba30a7e4929.m3u8',
            '90 Hits': 'canales/90hits.html',    
            'Pauta TV': 'miplayer.html?file=https://jireh-1-hls-video-cl-movistar.dps.live/hls-video/ey6283je82983je9823je8jowowiekldk9838274/pautatv/pautatv.smil/pautatv/livestream3/chunks.m3u8',      
  
              
            ' * * * * * * * * * * *': 'flipflapclock.html', 
            'A24': 'canales/a24.html', 
           // 'America Notic*': 'canales/americanoticias.html',   
            'Azteca Notic': 'canales/aztecanoticias.html',    
            'Caracol': 'canales/caracol.html',
            'C5N': 'canales/c5n.html',   
            'CNN Chile': 'canales/cnnchile.html',  
            // 'Canal 26*': 'canales/canal26.html',   
            'Canal Sur': 'canales/canalsur.html', 
            'City TV': 'canales/citytv.html',       
            'El Doce': 'canales/eldoce.html',   
           // 'Milenio*': 'canales/milenio.html',    
            'N+': 'canales/nmas.html',                   
           // 'Noticias Uno*': 'canales/noticiasuno.html',   
            'NTN 24': 'canales/ntn24.html',   
           // 'Panorama*': 'canales/panorama.html',   
           // 'TC': 'canales/tc.html',   
            'Telediario': 'canales/telediariomx.html',    
            //'Telemundo Notic': 'canales/noticiastelemundo.html',    
            'Telefe Notic': 'canales/telefenoticias.html',   
            'Telesur': 'canales/telesur.html',   
            'TN': 'canales/tn.html',        
            'Univisión Notic*': 'canales/univisionnoticias.html', 
            'Zapping Ecuad*': 'canales/zappingecuador.html',               
' / / / / / / / / / / / / /': 'flipflapclock.html', 
'Azteca Inter': 'miplayer.html?file=https://dujft6o2exhah.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-0lvc4h1b07aou/mun.m3u8',
'Bein Sports Xtr': 'miplayer.html?file=https://amg01334-beinsportsllc-beinxtra-localnow-kcy6r.amagi.tv/playlist.m3u8',
'Bein Sports Xtr n': 'miplayer.html?file=https://d35j504z0x2vu2.cloudfront.net/v1/master/0bc8e8376bd8417a1b6761138aa41c26c7309312/bein-sports-xtra-en-espanol/playlist.m3u8',
'Billiard TV': 'miplayer.html?file=https://9769bd6405b245ea9adca1889a0b491b.mediatailor.us-east-1.amazonaws.com/v1/master/f4e8c53a8367a5b58e20ce054ea3ce25a3e904d3/Samsung-in_BilliardTV/playlist.m3u8',
'Bloopers': 'miplayer.html?file=https://30a-tv.com/feeds/720p/63.m3u8',
'BUM TV': 'miplayer.html?file=https://movil.ejeserver.com/live/visiondorada.m3u8',
'Buin Somos T': 'miplayer.html?file=https://bst.buin.cl/0.m3u8',
'Coco TV': 'miplayer.html?file=https://cloudflare.streamgato.us:3253/live/canalcocotvlive.m3u8',
'El Trece Arg': 'miplayer.html?file=https://live-01-02-eltrece.vodgc.net/eltrecetv/index.m3u8',
'Garage TV': 'miplayer.html?file=https://stream1.sersat.com/hls/garagetv.m3u8',
'Global fashion': 'miplayer.html?file=https://pubgfc.teleosmedia.com/linear/globalfashionchannel/globalfashionchannel/playlist.m3u8',
'Homeful': 'miplayer.html?file=https://aegis-cloudfront-1.tubi.video/36785f5f-4e63-4cca-a16a-c8b309af0287/playlist.m3u8',
'Infinita': 'miplayer.html?file=https://mdstrm.com/live-stream-playlist/63a066e54ed536087960b550.m3u8',
'Latina': 'miplayer.html?file=https://jireh-10-hls-video-cl-movistar.dps.live/hls-video/567ffde3fa319fadf3419efda25619456231dfea/latina/latina.smil/latina/livestream2/chunks.m3u8',
'Motorvision': 'miplayer.html?file=https://stream.ads.ottera.tv/playlist.m3u8?network_id=535',
'Outdoor': 'miplayer.html?file=https://amg00718-outdoorchannela-outdoortvnz-samsungnz-lylq4.amagi.tv/playlist/amg00718-outdoorchannela-outdoortvnz-samsungnz/playlist.m3u8',
'Property Broth': 'miplayer.html?file=https://apollo.production-public.tubi.io/live/ac-property-brothers.m3u8',
'Qwest Music': 'miplayer.html?file=https://amg00447-qwesttv-qwestjazz-cineverse-ve12d.amagi.tv/playlist/amg00447-qwesttv-qwestjazz-cineverse/playlist.m3u8',
'Red Bull': 'miplayer.html?file=https://linear-582.frequency.stream/mt/studio/582/hls/master/playlist.m3u8',
'Taste Made': 'miplayer.html?file=https://amg00047-tastemade-es16intl-canelatv-9t8xw.amagi.tv/playlist/amg00047-tastemade-es16intl-canelatv/playlist.m3u8',
'Telemundo': 'miplayer.html?file=https://nbculocallive.akamaized.net/hls/live/2037499/puertorico/stream1/master.m3u8',
'Wipeout': 'miplayer.html?file=https://apollo.production-public.tubi.io/live/ac-wipeout-xtra.m3u8',
  
            };

            // Función para mostrar los canales
            function displayChannels() {
                let index = 0;
                for (const [channelName, channelUrl] of Object.entries(channels)) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = channelName;
                    a.href = channelUrl;
                    
                    // Usar una IIFE para capturar el índice actual
                    (function(currentIndex) {
                        a.addEventListener('click', (e) => {
                            e.preventDefault();
                            selectChannel(currentIndex);
                            iframe.src = channelUrl;
                        });
                    })(index);
                    
                    li.appendChild(a);
                    channelList.appendChild(li);
                    index++;
                }

                // Seleccionar el primer canal por defecto
                selectChannel(0);
            }

            // Función para seleccionar un canal
            function selectChannel(index) {
                const items = channelList.children;
                if (index >= 0 && index < items.length) {
                    Array.from(items).forEach((item, i) => {
                        item.classList.toggle('active', i === index);
                        if (i === index) {
                            // Obtener el enlace del canal y establecerlo como src del iframe
                            const channelLink = item.querySelector('a').href;
                            iframe.src = channelLink;
                            // Hacer scroll para que el elemento seleccionado sea visible
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    });
                    activeIndex = index;
                }
            }

            // Función para mostrar/ocultar el sidebar
            function toggleSidebarVisibility() {
                sidebar.classList.toggle('hidden');
            }

            // Event listener para las teclas de flecha
            document.addEventListener('keydown', function(e) {
                switch(e.key) {
                    case 'ArrowUp':
                        selectChannel(activeIndex - 1);
                        break;
                    case 'ArrowDown':
                        selectChannel(activeIndex + 1);
                        break;
                    case 'ArrowLeft':
                    case 'ArrowRight':
                        toggleSidebarVisibility();
                        break;
                }
            });

            // Event listener para el botón de toggle
            toggleSidebar.addEventListener('click', toggleSidebarVisibility);

            // Iniciar la carga de canales
            displayChannels();
        });
