  document.addEventListener('DOMContentLoaded', function() {
            const sidebar = document.getElementById('sidebar');
            const channelList = document.getElementById('channelList');
            const iframe = document.getElementById('iframe');
            const toggleSidebar = document.getElementById('toggleSidebar');
            let activeIndex = 0;

            // Lista de canales
            const channels = {
                  
            'Inicio': 'flipflapclock.html',  // si lo quitas el primer canal se reproducirá pausado,
            'TVN': 'canales/tvn',  
            'CHV': 'canales/chv',   
            'TeleTrece*': 'canales/teletrece', // fallando en samsung
            '24 Horas*': 'canales/24horas',    // fallando en samsung
            'Meganoticias': 'canales/meganoticias',
            'CHV Noticias': 'canales/chvnoticias',
            'TVU': 'canales/tvu',
            'RTVE': 'canales/rtve',  
            'DW': 'canales/dw',   
            'Euronews': 'canales/euronews',  
            'France 24': 'canales/france24',  
            '90 Hits': 'canales/90hits',   
            'Bob esponja': 'canales/bobesponja', 
            'Mr.Bean': 'canales/mrbean',  

            'A24': 'canales/a24', 
            'Azteca Notic': 'canales/aztecanoticias',    
            'Caracol': 'canales/caracol',
            'C5N': 'canales/c5n',    
            'El Doce': 'canales/eldoce',   
            'N+': 'canales/nmas',                      
            'Canal 6': 'canales/canal6',       
            'Telefe Notic': 'canales/telefenoticias',   
            'Telesur': 'canales/telesur',   
            'TN': 'canales/tn',   
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
