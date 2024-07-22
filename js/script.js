$(document).ready(function() {
    function updateFields() {
        const ramTotal = parseFloat($('#ram-total').val());
        const ramReserved = parseFloat($('#ram-reserved').val());
        const ramBuffer = parseFloat($('#ram-buffer').val());
        const processSize = parseFloat($('#process-size').val());

        const buffer = 1 - (ramBuffer / 100);
        const availableRam = Math.round(((ramTotal - ramReserved) * buffer) * 10) / 10;
        const availableRamMb = Math.round(availableRam * 1024);

        const maxChildren = Math.floor(availableRamMb / processSize);
        const startServers = Math.floor(maxChildren * 0.25);
        const minSpare = Math.floor(maxChildren * 0.25);
        const maxSpare = Math.floor(maxChildren * 0.75);

        $('#ram-available').val(availableRam);
        $('#ram-available-mb').val(availableRamMb);
        $('#max-children').val(maxChildren);
        $('#start-servers').val(startServers);
        $('#min-spare').val(minSpare);
        $('#max-spare').val(maxSpare);

        generateConfigCopy();
    }

    function generateConfigCopy() {
        const configText = `
pm.max_children = ${$('#max-children').val()}
pm.start_servers = ${$('#start-servers').val()}
pm.min_spare_servers = ${$('#min-spare').val()}
pm.max_spare_servers = ${$('#max-spare').val()}
`;
        $('#copyPasteArea').val(configText.trim());
    }

    function copyToClipboard() {
        const copyText = document.getElementById('copyPasteArea');
        copyText.select();
        document.execCommand('copy');
        alert('Copied to clipboard successfully.');
    }

    $('#ram-total, #ram-reserved, #ram-buffer, #process-size').on('input change', updateFields);
    $('#buttonCopy').click(copyToClipboard);

    updateFields();  // Initial calculation on page load
});