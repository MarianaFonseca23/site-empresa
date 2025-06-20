setTimeout(function () {
    alert("bem vindo ao website");
}, 5000);

$.ajax({
    type: "GET",
    url: "noticias.xml",
    dataType: "xml",
    success: function (xml) {
        var rssContent = '';
        $(xml).find("item").each(function () {
            var title = $(this).find("title").text();
            var link = $(this).find("link").text();
            rssContent += `<li><a href="${link}" target="_blank">${title}</a></li>`;
        });
        $('#rssFeed').append(`<ul>${rssContent}</ul>`);
    },
    error: function () {
        $('#rssFeed').append('<p>Erro ao carregar notícias.</p>');
    }
});



$('.portfolio-img').click(function () {
    var projectName = $(this).data('project');
    var imgSrc = $(this).attr('src');
    var projectDetails = `
    <h1>${projectName}</h1>
    <img src="${imgSrc}" alt="${projectName}">
    <p>Descrição do projeto ${projectName}.</p>`;

    var newTab = window.open();
    newTab.document.write(projectDetails);

});

const lightbox = document.getElementById('lightbox-container');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.createElement('div');

lightboxCaption.id = 'lightbox-caption';
lightbox.appendChild(lightboxCaption);

const closeLightbox = document.getElementById('lightbox-close');

document.querySelectorAll('.lightbox').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const imgElement = this.querySelector('img');
        lightboxImage.src = this.href;
        lightboxCaption.textContent = imgElement.alt;
        lightbox.style.display = 'flex';
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImage && e.target !== lightboxCaption) {
        lightbox.style.display = 'none';
    }
});

function calcularOrcamento(){

    console.log("função calcularOrcamento chamada");

    var tipoPagina = parseInt(document.getElementById('tipoPagina').value);

    var prazoMeses = parseInt(document.getElementById('prazoMeses').value);

    var separadores = document.querySelectorAll('.separador-checkbox:checked');
    var totalSeparadores = separadores.length * 400;

    var desconto = Math.min(prazoMeses * 0.05, 0.20);

    var totalSemDesconto = tipoPagina + totalSeparadores;

    var totalFinal = totalSemDesconto * (1 - desconto);

    document.getElementById('orcamentoFinal').textContent = totalFinal.toFixed(2);

}

document.getElementById('tipoPagina').addEventListener('change',calcularOrcamento);
document.getElementById('prazoMeses').addEventListener('input',calcularOrcamento);
var checkboxes = document.querySelectorAll('.separador-checkbox');
checkboxes.forEach(function(checkbox){
    checkbox.addEventListener('change',calcularOrcamento);
});

const map = L.map('map').setView([41.1561659,-8.6091478],14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19,
attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const officeLocation = [41.1561659,-8.6091478];
        L.marker(officeLocation).addTo(map)
        .bindPopup('Escritório')
        .openPopup();

        function getClientLocation(){
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => { 
                    const clientLatLng = [position.coords.latitude, position.coords.longitude];
                    L.marker(clientLatLng).addTo(map)
                    .bindPopup('Você')
                    .openPopup();
                    map.setView(clientLatLng,14);
                },() => {
                    alert("Erro ao obter a localização");
                });

        }else{
            alert("Geolocalização não é suportada pelo Google");
        }
    }
    getClientLocation();

    const form = document.getElementById('contactForm');

form.addEventListener('submit',function(event){
event.preventDefault();

let nome = document.getElementById('nome').value;
let apelido = document.getElementById('apelido').value;
let telemovel = document.getElementById('telemovel').value;
let email = document.getElementById('email').value;
let data = document.getElementById('data').value;
let motivo = document.getElementById('motivo').value;

if ( nome === '' || apelido === '' || telemovel === '' || email === '' || data === '' || motivo === ''){
    alert('Preencha todos os campos');
    return;
}

if (!validateEmail(email)){
    alert('Por favor coloque um email válido');
    return;
}

if (!validatePhone(telemovel)){
    alert('Por favor coloque um telemóvel válido');
    return;
}

alert("Formulário enviado com sucesso");
form.submit();
});

function validateEmail(email){
const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
return re.test(String(email).toLowerCase());
}

function validatePhone(telemovel){
return /^[0-9]{9}$/.test(telemovel);
}

