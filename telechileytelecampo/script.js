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
            '13': 'miplayer.html?file=https://unlimited1-cl-isp.dps.live/t13radio/t13radio.smil/playlist.m3u8', 
            'CHV': 'canales/chv.html',    
            'Canal 9': 'miplayer.html?file=https://unlimited6-cl.dps.live/c9/c9.smil/playlist.m3u8',   
            'TVU**': 'canales/tvu.html', 
            'UCV': 'miplayer.html?file=https://unlimited2-cl-isp.dps.live/ucvtv2/ucvtv2.smil/ucvtv2/livestream2/chunks.m3u8',   
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
