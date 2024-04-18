    document.addEventListener('DOMContentLoaded', function() {
        var data = JSON.parse(localStorage.getItem('tabelaPronta')) || [];
        var tabelaPronta = document.getElementById('tabelaPronta');

        data.forEach(function(colunaData) {
            var row = tabelaPronta.insertRow(-1);
            colunaData.forEach(function(cellData) {
                var cell = row.insertCell();
                cell.textContent = cellData;
            });

            var linhaAcao = row.insertCell();
            var botaoDelete = document.createElement('button');
            botaoDelete.textContent = 'Apagar';
            botaoDelete.className = 'botao-apagar';
            botaoDelete.onclick = function() {
                tabelaPronta.deleteRow(row.rowIndex);
                salvarTabela();
            };
            // outro btn do apagar (nao mexer oreia curioso)
            linhaAcao.appendChild(botaoDelete);
        }); 

        valor_salario = parseFloat(localStorage.getItem('valor_salario')) || 0;
        document.getElementById('valorReceber').value = "R$ " + valor_salario.toFixed(2);
        valor_total_viagem = parseFloat(localStorage.getItem('valor_total_viagem')) || 0;
        document.getElementById('totalViagem').value = "R$ " + valor_total_viagem.toFixed(2);

        val_adiantamento_soma = parseFloat(localStorage.getItem('val_adiantamento_soma')) || 0;
        document.getElementById('valorAdiantamento').value = "R$ " + val_adiantamento_soma.toFixed(2);

        });

    var valor_salario=0;
    var valor_total_viagem=0;
    var val_adiantamento_soma=0;

    function addColuna() {
        var dataInput = document.getElementById('data').value;
        var data = moment(dataInput, 'YYYY-MM-DD').format('DD/MM/YYYY');
        var origem = document.getElementById('origem').value;
        var destino = document.getElementById('destino').value;
        var frete = document.getElementById('frete').value;
        var material = document.getElementById('material').value;
        var peso = document.getElementById('peso').value;
        var motorista = document.getElementById('motorista').value;
        var transportadora = document.getElementById('transportadora').value;

        var dataInputAdi = document.getElementById('dataAdiantamento').value;
        var dataAdi = moment(dataInputAdi, 'YYYY-MM-DD').format('DD/MM/YYYY');

        
        var val_adiantamento = document.getElementById('adiantamento').value;
        if(isNaN(parseFloat(val_adiantamento))==true)
            val_adiantamento=0.0;
    
        val_adiantamento_soma = parseFloat(val_adiantamento_soma) + parseFloat(val_adiantamento);
        document.getElementById('valorAdiantamento').value = "R$ " + val_adiantamento_soma.toFixed(2);
        

        var valor = frete * peso;
        var comissao = valor * 8 / 100;
        valor_total_viagem = valor + valor_total_viagem;
        var valor_formatado = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        var comissao_formatado = comissao.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        var val_adiantamento_formatado = val_adiantamento.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        valor_salario = comissao + valor_salario;

        document.getElementById('valorReceber').value = "R$ " + valor_salario.toFixed(2);
        document.getElementById('totalViagem').value = "R$ " + valor_total_viagem.toFixed(2);

        var tabelaPronta = document.getElementById('tabelaPronta');
        var row = tabelaPronta.insertRow(-1);
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        var cell7 = row.insertCell();
        var cell8 = row.insertCell();
        var cell9 = row.insertCell();
        var cell10 = row.insertCell();
        var cell11 = row.insertCell();
        var cell12 = row.insertCell();
        
        if(isNaN(parseFloat(data)) == true)
            cell1.textContent = " ";
        else
            cell1.textContent = data;

        cell2.textContent = origem;
        cell3.textContent = destino;
        cell4.textContent = frete;
        cell5.textContent = material;
        cell6.textContent = peso;
        cell7.textContent = motorista;
        cell8.textContent = valor_formatado;
        cell9.textContent = comissao_formatado;
        cell10.textContent = transportadora;
        
        if(isNaN(parseFloat(dataAdi)) == true)
            cell11.textContent = " ";
        else
            cell11.textContent = dataAdi;

        if(isNaN(parseFloat(val_adiantamento)) == true)
            cell12.textContent = " ";
        else
            cell12.textContent = val_adiantamento_formatado;
            
        // funcao do botao para apagar linha por linha (retirei pq eu quis)

        var linhaAcao = row.insertCell();
        var botaoDelete = document.createElement('button');
        botaoDelete.textContent = 'Apagar';
        botaoDelete.className = 'botao-apagar';
        botaoDelete.onclick = function() {
            tabelaPronta.deleteRow(row.rowIndex);
            salvarTabela();
        };
        linhaAcao.appendChild(botaoDelete);

        salvarTabela();

        botaoDelete.className = 'botao-apagar';
    }

    function calcular_salario ()
    {
        var comissao_novo = valor_salario;
        var salario = document.getElementById('salario').value;
        var adiantamento_novo = val_adiantamento_soma;
        var salario_liquido;
        salario_liquido=parseFloat(salario_liquido);
        salario_liquido=(parseFloat(salario)+parseFloat(comissao_novo))-parseFloat(val_adiantamento_soma);
        
    
        var salario_real = salario_liquido.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        document.getElementById('val').value=salario_real;

        
    }

    function salvarTabela() {
        var tabelaPronta = document.getElementById('tabelaPronta');
        var data = [];
        for (var i = 0; i < tabelaPronta.rows.length; i++) {
            var colunaData = [];
            for (var j = 0; j < tabelaPronta.rows[i].cells.length - 1; j++) {
                colunaData.push(tabelaPronta.rows[i].cells[j].textContent);
            }
            data.push(colunaData);
        }
        localStorage.setItem('tabelaPronta', JSON.stringify(data));
        localStorage.setItem('valor_salario', valor_salario);
        localStorage.setItem('valor_total_viagem', valor_total_viagem);
        localStorage.setItem('val_adiantamento_soma', val_adiantamento_soma);
    }

    function clearTable() {
        var tabelaPronta = document.getElementById('tabelaPronta');
        var verificacao_limpar_tabela;

        verificacao_limpar_tabela = prompt ("Tem certeza que deseja limpar a planilha? Dados serão perdidos! (s/n)");

        if(verificacao_limpar_tabela == 's' || verificacao_limpar_tabela == 'S')
        {
            while (tabelaPronta.firstChild) {
                tabelaPronta.removeChild(tabelaPronta.firstChild);
            }
            localStorage.removeItem('tabelaPronta');
            valor_salario=0;
            valor_total_viagem=0;
            val_adiantamento_soma=0;
            salario_real=0;
            document.getElementById('valorReceber').value = "R$ " + valor_salario.toFixed(2);
            document.getElementById('totalViagem').value = "R$ " + valor_total_viagem.toFixed(2);
            document.getElementById('valorAdiantamento').value = "R$ " + val_adiantamento_soma.toFixed(2);
        }
    }

    function exportToExcel() {
        var nome = document.getElementById('nomeArquivo').value;
        var table = document.getElementById('tabelaForm');
        var rows = table.rows;
        var data = [];
        for (var i = 0; i < rows.length; i++) {
            var colunaData = [];
            var cells = rows[i].cells;
            for (var j = 0; j < cells.length - 1; j++) {
                colunaData.push(cells[j].textContent);
            }
            data.push(colunaData);
        }

        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Tabela');

        var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        var blob = new Blob([s2ab(wbout)],{type:"application/octet-stream"});
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        if(nome=='')
            a.download = "planilha.xlsx";
        else
            a.download = nome+".xlsx";
        a.click();
        setTimeout(function() { URL.revokeObjectURL(url); }, 0);
    }