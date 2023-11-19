

$(document).ready(function () {
    const socket = io();

    function toggleTypingIndicator(isTyping) {
        const typingIndicator = $('#typing-indicator');
        isTyping ? typingIndicator.removeClass('is-hidden') : typingIndicator.addClass('is-hidden');
    }

    function appendMessage(message, sender) {
        const messageElement = $('<div class="message">');
        messageElement.text(`${sender}: ${message}`);
        $('#chat-messages').append(messageElement);
        $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
    }

    $('#send-button').click(function () {
        const message = $('#message-input').val();
        if (message.trim() !== '') {
            socket.emit('chat message', message);
            $('#message-input').val('');
        }
    });

    $('#message-input').on('input', function () {
        const message = $(this).val();
        if (message.trim() !== '') {
            socket.emit('typing', true);
        } else {
            socket.emit('typing', false);
        }
    });

    socket.on('chat message', function (data) {
        toggleTypingIndicator(false);
        appendMessage(data.message, 'User');
    });

    socket.on('typing', function (isTyping) {
        toggleTypingIndicator(isTyping);
    });
});
