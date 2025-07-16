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
            'Zona Latina': 'canales/zonalatina.html', 
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
            'TVN3': 'miplayer.html?file=https://mdstrm.com/live-stream-playlist/5653641561b4eba30a7e4929.m3u8',
            '90 Hits': 'canales/90hits.html',  
            'Pauta TV': 'miplayer.html?file=https://jireh-1-hls-video-cl-movistar.dps.live/hls-video/ey6283je82983je9823je8jowowiekldk9838274/pautatv/pautatv.smil/pautatv/livestream3/chunks.m3u8',      

            ' - - - - - -': '  ', 
            'A24': 'canales/a24.html', 
            'Caracol': 'canales/caracol.html',
           // 'America Notic*': 'canales/americanoticias.html',   
            'Azteca Notic': 'canales/aztecanoticias.html',    
            'C5N': 'canales/c5n.html',   
            // 'Canal 26*': 'canales/canal26.html',   
            'Canal Sur': 'canales/canalsur.html', 
            'City TV': 'canales/citytv.html',       
            'El Doce': 'canales/eldoce.html',   
           // 'Milenio*': 'canales/milenio.html',    
            'N+': 'canales/nmas.html',                   
           // 'Noticias Uno*': 'canales/noticiasuno.html',   
            'NTN 24': 'canales/ntn24.html',   
           // 'Panorama*': 'canales/panorama.html',   
            'TC': 'canales/tc.html',   
            'Telediario': 'canales/telediariomx.html',    
            'Telemundo Notic': 'canales/noticiastelemundo.html',    
            'Telefe Notic': 'canales/telefenoticias.html',   
            'Telesur': 'canales/telesur.html',   
            'TN': 'canales/todonoticias.html',   
           // 'Univisión Notic*': 'canales/univisionnoticias.html', 
           // 'Zapping Ecuad*': 'canales/zappingecuador.html',       
              
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
