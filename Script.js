const webhookSelect = document.getElementById('webhook-select');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

const quickButtons = document.querySelectorAll('.quick-btn');
const mentionButtons = document.querySelectorAll('.mention-btn');

const everyoneBtn = document.getElementById('everyone-btn');


// ===============================
// WEBHOOKS
// ===============================
const webhooks = {
    ProlapsosAnal:
        'https://discord.com/api/webhooks/1504973376819691710/DMxmG63D8Bm4np1Eyit2INcjKesYzh8yIFqtDa5Ssy1MNB22ulLh_TAVpZnBXgy4ISGj'
};


// ===============================
// CARGOS
// ===============================
const cargos = {

    bombados:
        '<@&1266413526046609559>',

    clarisword:
        '<@&1370552729344147476>',

    piratas:
        '<@&1294862599376343132>',

    ProlapsosAnal:
        '<@&1504972247343960124>'
};


// ===============================
// Atualizar botão @everyone
// ===============================
function atualizarCargo() {

    const servidor = webhookSelect.value;

    everyoneBtn.dataset.value = cargos[servidor];

}

webhookSelect.addEventListener('change', atualizarCargo);

atualizarCargo();


// ===============================
// Enviar mensagem
// ===============================
async function sendMessage(webhookUrl, message) {

    if (!message.trim()) {

        alert('Digite uma mensagem!');
        return;

    }

    try {

        const response = await fetch(webhookUrl, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                content: message
            })

        });

        if (response.ok) {

            alert('Mensagem enviada!');
            messageInput.value = '';

        } else {

            alert('Erro ao enviar: ' + response.status);

        }

    } catch (error) {

        alert('Erro: ' + error.message);

    }

}


// ===============================
// Botão enviar
// ===============================
sendBtn.addEventListener('click', () => {

    const servidor = webhookSelect.value;

    const webhook = webhooks[servidor];

    const message = messageInput.value;

    sendMessage(webhook, message);

});


// ===============================
// Mensagens rápidas
// ===============================
quickButtons.forEach(button => {

    button.addEventListener('click', () => {

        let text = button.dataset.message;

        const servidor = webhookSelect.value;

        const everyone = cargos[servidor];

        text = text.replace('{everyone}', everyone);

        if (messageInput.value.trim() !== '') {

            messageInput.value += '\n';

        }

        messageInput.value += text;

    });

});


// ===============================
// Botões de menção
// ===============================
mentionButtons.forEach(button => {

    button.addEventListener('click', () => {

        const mention = button.dataset.value;

        if (messageInput.value.length > 0) {

            messageInput.value += ' ';

        }

        messageInput.value += mention;

        messageInput.focus();

    });

});