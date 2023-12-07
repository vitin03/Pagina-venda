function convertTelefone(telefone) {
    return telefone.replace(/[^\w]/gi, '');
}

function dropDownX(conteudo, enter = true, left = true) {
    (left) ? conteudo.css('animation-name', 'enterAnimateDropDownToRight') : conteudo.css('animation-name', 'exitAnimateDropDownToRight');
    (enter) ? conteudo.css('animation-name', 'enterAnimateDropDownToLeft') : conteudo.css('animation-name', 'exitAnimateDropDownToLeft');
    conteudo.css('animation-duration', '0.2s');
    conteudo.css('animation-fill-mode', 'forwards');
}

$(document).ready(function () {

    //Configuração dos graficos
    let circular_progress = document.getElementsByClassName("circular-progress");
    let progress_value = document.getElementsByClassName("progress-value");
    let progressStartValue = 0;
    let speed = 10;
    let progressEndValue = [];

    for (let i = 0; i < circular_progress.length; i++) {
        progressEndValue.push(Number(circular_progress[i].getAttribute('data-final')))
        let progress = setInterval(() => {
            progressStartValue++;
            circular_progress[i].style.background = `conic-gradient(#7d2ae8 ${3.6 * progressStartValue}deg, #ededed 0deg)`;
            progress_value[i].textContent = `${progressStartValue}%`;
            if (progressStartValue == progressEndValue[i]) {
                clearInterval(progress);
            }

            if (progressStartValue >= progressEndValue[i]) {
                progress_value[i].textContent = `${progressEndValue[i]}%`;
                clearInterval(progress);
            }

        }, speed);
    }

    //Exibir DropDownToLeft ao clicar na classe
    $(document).on('click', '.botaoDropDownToLeft', function () {
        dropDownX($(this).parent().find('.conteudo'), true, true);
    })

    //Ocultar DropDownToLeft ao sair da area
    $(document).on('mouseleave', '.dropDownToLeft', function () {
        dropDownX($(this).find('.conteudo'), false, true);
    })

    //Abrir whatsapp ao clicar no botão
    $(document).on('click', '#botaoWhatsapp', function () {
        let mensagem = 'Olá! Estou interessado no seu produto e gostaria de obter mais informações. Fico no aguardo!';
        let telefone = '+55 (37) 99826-4728';
        window.open(`https://api.whatsapp.com/send?phone=${convertTelefone(telefone)}&text=${mensagem}`);
    })
})
